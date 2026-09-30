// Cross-device storage for the private to-do page at /columns.
// Needs, in the Cloudflare Pages project settings:
//   - a KV namespace bound as TODO_KV
//   - a secret environment variable TODO_KEY (the passcode typed once on each device)
// GET  /api/lists            -> { data, updated }   (data is null if nothing saved yet)
// PUT  /api/lists  {data, updated} -> { ok, updated }
// Every request must send the passcode in the X-Todo-Key header.

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex'
};
const MAX_BYTES = 900 * 1024;

function reply(obj, status) {
  return new Response(JSON.stringify(obj), { status: status || 200, headers: JSON_HEADERS });
}

function sameKey(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function onRequest({ request, env }) {
  if (!env.TODO_KV || !env.TODO_KEY) return reply({ error: 'not-configured' }, 503);
  if (!sameKey(request.headers.get('x-todo-key') || '', env.TODO_KEY)) {
    await new Promise(r => setTimeout(r, 400));
    return reply({ error: 'wrong-passcode' }, 401);
  }

  if (request.method === 'GET') {
    const stored = await env.TODO_KV.get('lists', 'json');
    return reply(stored || { data: null, updated: 0 });
  }

  if (request.method === 'PUT') {
    const text = await request.text();
    if (text.length > MAX_BYTES) return reply({ error: 'too-large' }, 413);
    let body;
    try { body = JSON.parse(text); } catch (e) { return reply({ error: 'bad-json' }, 400); }
    if (!body || !body.data || !Array.isArray(body.data.lists)) return reply({ error: 'bad-data' }, 400);
    const stored = await env.TODO_KV.get('lists', 'json');
    // Refuse to overwrite a newer copy saved from another device; the page merges and retries
    if (stored && stored.updated && Number(body.base) !== stored.updated) {
      return reply({ error: 'conflict', data: stored.data, updated: stored.updated }, 409);
    }
    let updated = Number(body.updated) || Date.now();
    if (stored && updated <= stored.updated) updated = stored.updated + 1;
    await env.TODO_KV.put('lists', JSON.stringify({ data: body.data, updated }));
    return reply({ ok: true, updated });
  }

  return reply({ error: 'method' }, 405);
}
