// POST /api/vc/unlock  { course, email, key }  (key = Payhip key for the $19.99 video + practice-test pack, or the code printed in the book)
// Checks the Payhip access key for that course (and that the email matches the buyer),
// then sets a signed cookie that lets the browser stream the course videos for 30 days.
// GET /api/vc/unlock?course=slug  -> { ok } whether this browser already has access.
import { COURSES, BOOKS_FOR_COURSE, json, makeToken, hasAccess, cookieFor, verifyLicence, isBookCode } from '../../_vc.js';

const norm = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  let slug = String(body.course || '');
  const key = String(body.key || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  if (!key) return json({ ok: false, error: 'Enter your access key.' }, 400);
  // course "auto": a book page with one code box; find the course this book code belongs to.
  if (slug === 'auto' || (slug.startsWith('auto:'))) {
    const pool = slug === 'auto' ? COURSES : slug.slice(5).split(',').filter((c) => COURSES.includes(c));
    let found = '';
    for (const c of pool) { if (await isBookCode(request, env, c, key)) { found = c; break; } }
    // Not a book code: try it as a Payhip key for each course (the $19.99 video + tests pack).
    if (!found) {
      for (const c of pool) {
        const v = await verifyLicence(env, c, key);
        if (v.ok) {
          if (v.email && email !== v.email) return json({ ok: false, error: 'Use the same email address you bought the course with.' });
          const token = await makeToken(env, c);
          return json({ ok: true, via: 'payhip', course: c, books: BOOKS_FOR_COURSE[c] || [] }, 200, { 'Set-Cookie': cookieFor(c, token) });
        }
      }
    }
    if (!found) return json({ ok: false, error: 'That code was not recognised. Check it against the last page of your book.' });
    slug = found;
  }
  if (!COURSES.includes(slug)) return json({ ok: false, error: 'Unknown course' }, 400);
  if (!env.VC_SESSION_SECRET) return json({ ok: false, error: 'Course access is not set up yet.' }, 503);

  const superCode = norm(env.SUPER_ACCESS_CODE);
  let ok = !!superCode && norm(key) === superCode;
  let via = ok ? 'super' : '';
  if (!ok && (await isBookCode(request, env, slug, key))) { ok = true; via = 'book'; }
  if (!ok) {
    via = 'payhip';
    const v = await verifyLicence(env, slug, key);
    // Book-only courses (no Payhip product) only take the printed book code.
    if (v.error === 'not_configured') return json({ ok: false, error: 'That code was not recognised. Check it against the last page of your book.' });
    if (!v.ok) return json({ ok: false, error: 'That key or book code is not valid for this course.' });
    // The key must be used with the email it was bought with, so a shared key alone is not enough.
    if (v.email && email !== v.email) return json({ ok: false, error: 'Use the same email address you bought the course with.' });
    ok = true;
  }
  const token = await makeToken(env, slug);
  // `books`: the practice-test banks this purchase opens (the pack includes the online tests).
  return json({ ok: true, via, course: slug, books: BOOKS_FOR_COURSE[slug] || [] }, 200, { 'Set-Cookie': cookieFor(slug, token) });
}

export async function onRequestGet({ request, env }) {
  const slug = new URL(request.url).searchParams.get('course') || '';
  if (!COURSES.includes(slug)) return json({ ok: false }, 400);
  const ok = await hasAccess(request, env, slug);
  return json(ok ? { ok, books: BOOKS_FOR_COURSE[slug] || [] } : { ok });
}
