// POST /api/subscribe
// Body: { email, accessCode, book }
// Adds the subscriber to MailerLite with custom fields.
// Reads MAILERLITE_API_KEY and MAILERLITE_GROUP_ID from Cloudflare Pages env vars.

export async function onRequestPost({ request, env }) {
  const cors = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const { email, accessCode, book } = await request.json();

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'Missing email' }), { status: 400, headers: cors });
    }

    const apiKey = env.MAILERLITE_API_KEY;
    const groupId = env.MAILERLITE_GROUP_ID;

    // If env vars aren't set yet, don't break the unlock flow — just no-op.
    if (!apiKey || !groupId) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), { headers: cors });
    }

    const payload = {
      email: email.trim().toLowerCase(),
      groups: [groupId],
      fields: {
        access_code: (accessCode || '').toUpperCase(),
        book_unlocked: book || '',
        unlock_date: new Date().toISOString().slice(0, 10),
        source: 'certpathpublishing.store',
      },
    };

    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      return new Response(JSON.stringify({ ok: false, error: 'MailerLite error', status: r.status, detail: text }), { status: 502, headers: cors });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: cors });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: cors });
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
