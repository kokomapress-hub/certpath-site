// Cross-device storage for the private to-do page at /columns.
// Needs, in the Cloudflare Pages project settings, a KV namespace bound as TODO_KV.
// Passcode: if a TODO_KEY secret is set it is used; otherwise the first passcode
// entered on the page (6+ characters) becomes the passcode, stored only as a hash.
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

async function hash(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('certpath-todo:' + text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function passOk(env, given) {
  if (env.TODO_KEY) return sameKey(given, env.TODO_KEY);
  const saved = await env.TODO_KV.get('passhash');
  if (!saved) {
    if (given.length < 6) return 'short';
    await env.TODO_KV.put('passhash', await hash(given));   // first passcode becomes the passcode
    return true;
  }
  return sameKey(await hash(given), saved);
}

export async function onRequest({ request, env }) {
  if (!env.TODO_KV) return reply({ error: 'not-configured' }, 503);
  const ok = await passOk(env, request.headers.get('x-todo-key') || '');
  if (ok === 'short') return reply({ error: 'too-short' }, 400);
  if (ok !== true) {
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
