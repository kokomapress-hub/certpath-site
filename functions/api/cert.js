// Course completion certificates (PMP video course).
// POST /api/cert          { course, name }       -> { ok, id, name, date }   (needs the course access cookie)
// POST /api/cert?verify=1 { id, name }           -> { ok, valid, course, date }
// Nothing is stored: the ID is "CP-<COURSE>-<YYMMDD>-<8 chars>", where the 8 chars are an HMAC of
// course + completion date + the learner's name, signed with VC_SESSION_SECRET. Verifying = recomputing it.
import { json, hasAccess } from '../_vc.js';

const CERT_COURSES = { pmp: 'PMP Exam Prep — Complete Video Course' };
const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32: no I, L, O, U
const enc = new TextEncoder();

const cleanName = (s) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, 60);
const nameKey = (s) => cleanName(s).toLowerCase();

async function code(secret, course, ymd, name) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode('cert|' + course + '|' + ymd + '|' + nameKey(name))));
  let bits = 0, val = 0, out = '';
  for (let i = 0; out.length < 8; i++) {
    val = (val << 8) | sig[i]; bits += 8;
    while (bits >= 5 && out.length < 8) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; }
  }
  return out;
}

const dateOf = (ymd) => '20' + ymd.slice(0, 2) + '-' + ymd.slice(2, 4) + '-' + ymd.slice(4, 6);

export async function onRequestPost({ request, env }) {
  if (!env.VC_SESSION_SECRET) return json({ ok: false, error: 'Certificates are not set up yet.' }, 503);
  let body = {};
  try { body = await request.json(); } catch (e) {}

  if (new URL(request.url).searchParams.get('verify')) {
    const m = String(body.id || '').toUpperCase().replace(/\s+/g, '').match(/^CP-([A-Z]+)-(\d{6})-([0-9A-Z]{8})$/);
    const name = cleanName(body.name);
    if (!m || !name) return json({ ok: true, valid: false });
    const course = m[1].toLowerCase();
    if (!CERT_COURSES[course]) return json({ ok: true, valid: false });
    const valid = (await code(env.VC_SESSION_SECRET, course, m[2], name)) === m[3];
    return json(valid ? { ok: true, valid, course: CERT_COURSES[course], date: dateOf(m[2]) } : { ok: true, valid: false });
  }

  const course = String(body.course || '');
  const name = cleanName(body.name);
  if (!CERT_COURSES[course]) return json({ ok: false, error: 'No certificate for this course.' }, 400);
  if (name.length < 2) return json({ ok: false, error: 'Enter your full name as it should appear on the certificate.' }, 400);
  if (!(await hasAccess(request, env, course))) return json({ ok: false, error: 'Open the course on this device first, then try again.' }, 403);
  const d = new Date();
  const ymd = String(d.getUTCFullYear()).slice(2) + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0');
  const id = 'CP-' + course.toUpperCase() + '-' + ymd + '-' + (await code(env.VC_SESSION_SECRET, course, ymd, name));
  return json({ ok: true, id, name, date: dateOf(ymd), course: CERT_COURSES[course] });
}
