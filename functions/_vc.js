// Shared helpers for the $9.99 video courses (functions/api/vc/*). Not a route: no onRequest exports.
//
// Bindings (Cloudflare Pages -> Settings):
//   VC_BUCKET          R2 bucket "certpath-video-courses"; videos live at vc/<slug>/<NNN>.mp4
//   VC_PAYHIP_SECRETS  JSON {slug: "prod_sk_..."}: Payhip product secret keys (licence API v2)
//   VC_SESSION_SECRET  signs the per-course access cookie
//   SUPER_ACCESS_CODE  optional owner code that unlocks every course

export const COURSES = ['pmp', 'sat-math', 'tabe-a', 'tabe-d', 'tabe-e'];
export const COOKIE_DAYS = 30;

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });
}

const enc = new TextEncoder();
const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));
}

// Cookie value: "<slug>.<expiry seconds>.<signature>"
export async function makeToken(env, slug) {
  const exp = Math.floor(Date.now() / 1000) + COOKIE_DAYS * 86400;
  return slug + '.' + exp + '.' + (await hmac(env.VC_SESSION_SECRET, slug + '.' + exp));
}

export async function hasAccess(request, env, slug) {
  if (!env.VC_SESSION_SECRET) return false;
  const m = (request.headers.get('Cookie') || '').match(new RegExp('(?:^|;\\s*)vc_' + slug.replace('-', '_') + '=([^;]+)'));
  if (!m) return false;
  const [s, exp, sig] = decodeURIComponent(m[1]).split('.');
  if (s !== slug || !(Number(exp) > Date.now() / 1000)) return false;
  const good = await hmac(env.VC_SESSION_SECRET, s + '.' + exp);
  // constant-time compare
  if (good.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < good.length; i++) diff |= good.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

export function cookieFor(slug, token) {
  return 'vc_' + slug.replace('-', '_') + '=' + encodeURIComponent(token)
    + '; Path=/; Max-Age=' + COOKIE_DAYS * 86400 + '; HttpOnly; Secure; SameSite=Lax';
}

// Payhip licence API v2. Returns {ok, email} or {ok:false}.
export async function verifyLicence(env, slug, key) {
  let secrets = {};
  try { secrets = JSON.parse(env.VC_PAYHIP_SECRETS || '{}'); } catch (e) {}
  const sk = secrets[slug];
  if (!sk) return { ok: false, error: 'not_configured' };
  const r = await fetch('https://payhip.com/api/v2/license/verify?license_key=' + encodeURIComponent(key), {
    headers: { 'product-secret-key': sk },
  });
  if (!r.ok) return { ok: false };
  let d = null;
  try { d = await r.json(); } catch (e) { return { ok: false }; }
  const data = d && d.data;
  if (!data || data.enabled !== true) return { ok: false };
  return { ok: true, email: String(data.buyer_email || '').trim().toLowerCase() };
}
