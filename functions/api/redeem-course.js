// POST /api/redeem-course
// Body: { code }  -> validates a Payhip license key for the PMP Complete System.
// Returns { ok: true, tier: 'complete' } when the key is valid & enabled.
// Also honours the owner super code (SUPER_ACCESS_CODE secret) -> { ok, tier, super: true }.
// Reads PAYHIP_API_KEY from Cloudflare Pages env vars. The product permalink is DMyl1.

const PRODUCT_LINK = 'DMyl1';

function json(body, status, extra) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, extra || {}),
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const { code, superOnly } = await request.json();
    if (!code || typeof code !== 'string') return json({ ok: false, error: 'Missing code' }, 400);

    // Owner super code: compared with the SUPER_ACCESS_CODE secret (Cloudflare Pages ->
    // Settings -> Environment variables). Not set = feature off. The code itself never
    // appears in any file the browser can download.
    const norm = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const superCode = norm(env.SUPER_ACCESS_CODE);
    if (superCode && norm(code) === superCode) return json({ ok: true, tier: 'complete', super: true }, 200);
    // Callers that only want the super-code check (e.g. the CAPM pages) stop here, so a
    // licence key for one product can never unlock another.
    if (superOnly) return json({ ok: false }, 200);

    const apiKey = env.PAYHIP_API_KEY;
    // Fail closed if the key isn't configured yet — never unlock without verification.
    if (!apiKey) return json({ ok: false, error: 'not_configured' }, 503);

    const url = 'https://payhip.com/api/v1/license/verify'
      + '?product_link=' + encodeURIComponent(PRODUCT_LINK)
      + '&license_key=' + encodeURIComponent(code.trim());

    const r = await fetch(url, { headers: { 'payhip-api-key': apiKey } });
    if (!r.ok) return json({ ok: false }, 200);

    let d;
    try { d = await r.json(); } catch (e) { return json({ ok: false }, 200); }
    const enabled = d && d.data && d.data.enabled === true;
    return json({ ok: !!enabled, tier: enabled ? 'complete' : null }, 200);
  } catch (err) {
    return json({ ok: false, error: String(err) }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// redeploy 2026-09-16 to load PAYHIP_API_KEY
