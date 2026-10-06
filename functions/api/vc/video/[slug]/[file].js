// GET /api/vc/video/<slug>/<NNN>.mp4 : streams a course video from R2 for browsers holding that
// course's access cookie. Supports Range requests so the player can seek.
import { COURSES, hasAccess } from '../../../../_vc.js';

export async function onRequestGet({ request, env, params }) {
  const slug = params.slug;
  const file = params.file;
  if (!COURSES.includes(slug) || !/^\d{3}\.mp4$/.test(file)) return new Response('Not found', { status: 404 });
  // Lesson 1 of every course is a free preview; the rest need the course cookie.
  if (file !== '001.mp4' && !(await hasAccess(request, env, slug))) return new Response('Locked', { status: 403, headers: { 'Cache-Control': 'no-store' } });

  const key = 'vc/' + slug + '/' + file;
  const rangeHeader = request.headers.get('Range');
  let range;
  const m = rangeHeader && rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
  if (m) {
    if (m[1] === '' && m[2] !== '') range = { suffix: Number(m[2]) };
    else range = { offset: Number(m[1] || 0), ...(m[2] !== '' ? { length: Number(m[2]) - Number(m[1] || 0) + 1 } : {}) };
  }
  const obj = await env.VC_BUCKET.get(key, range ? { range } : {});
  if (!obj) return new Response('Not found', { status: 404 });

  const headers = new Headers({
    'Content-Type': 'video/mp4',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'private, max-age=3600',
    'X-Robots-Tag': 'noindex',
  });
  if (range && obj.range) {
    const size = obj.size;
    const start = obj.range.offset != null ? obj.range.offset : size - obj.range.suffix;
    const len = obj.range.length != null ? obj.range.length : size - start;
    headers.set('Content-Range', 'bytes ' + start + '-' + (start + len - 1) + '/' + size);
    headers.set('Content-Length', String(len));
    return new Response(obj.body, { status: 206, headers });
  }
  headers.set('Content-Length', String(obj.size));
  return new Response(obj.body, { status: 200, headers });
}
