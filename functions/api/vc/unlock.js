// POST /api/vc/unlock  { course, email, key }  (key = Payhip access key, or the code printed in the book)
// Checks the Payhip access key for that course (and that the email matches the buyer),
// then sets a signed cookie that lets the browser stream the course videos for 30 days.
// GET /api/vc/unlock?course=slug  -> { ok } whether this browser already has access.
import { COURSES, json, makeToken, hasAccess, cookieFor, verifyLicence, isBookCode } from '../../_vc.js';

const norm = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const slug = String(body.course || '');
  const key = String(body.key || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  if (!COURSES.includes(slug)) return json({ ok: false, error: 'Unknown course' }, 400);
  if (!key) return json({ ok: false, error: 'Enter your access key.' }, 400);
  if (!env.VC_SESSION_SECRET) return json({ ok: false, error: 'Course access is not set up yet.' }, 503);

  const superCode = norm(env.SUPER_ACCESS_CODE);
  let ok = !!superCode && norm(key) === superCode;
  let via = ok ? 'super' : '';
  if (!ok && (await isBookCode(request, env, slug, key))) { ok = true; via = 'book'; }
  if (!ok) {
    via = 'payhip';
    const v = await verifyLicence(env, slug, key);
    if (v.error === 'not_configured') return json({ ok: false, error: 'Course access is not set up yet.' }, 503);
    if (!v.ok) return json({ ok: false, error: 'That key or book code is not valid for this course.' });
    // The key must be used with the email it was bought with, so a shared key alone is not enough.
    if (v.email && email !== v.email) return json({ ok: false, error: 'Use the same email address you bought the course with.' });
    ok = true;
  }
  const token = await makeToken(env, slug);
  return json({ ok: true, via }, 200, { 'Set-Cookie': cookieFor(slug, token) });
}

export async function onRequestGet({ request, env }) {
  const slug = new URL(request.url).searchParams.get('course') || '';
  if (!COURSES.includes(slug)) return json({ ok: false }, 400);
  return json({ ok: await hasAccess(request, env, slug) });
}
