// Lesson comments for the video course player (learn.html).
// GET    /api/vc/comments?course=pmp&lesson=4          -> { ok, comments: [...] }   (course holders only; approved only)
// POST   /api/vc/comments  { course, lesson, name, text, replyTo? }               (course holders only; held for approval)
// Admin (header X-Admin-Key = env.VC_ADMIN_KEY):
// GET    /api/vc/comments?course=pmp&queue=1           -> { ok, queue: [{ lesson, ...comment }] }  every comment awaiting approval
// PATCH  /api/vc/comments?course=pmp&lesson=4&id=...   approve
// DELETE /api/vc/comments?course=pmp&lesson=4&id=...   delete (and its replies)
// Comments from learners are saved with pending: true and are hidden from everyone but the admin
// until approved. A per-course index "q:<course>" lists the lessons that have pending comments.
// Stored in KV (binding VC_COMMENTS) as one JSON list per lesson: key "c:<course>:<lesson>".
// With the admin key, a POST is shown as "CertPath team".
import { COURSES, json, hasAccess } from '../../_vc.js';

const MAX_TEXT = 1500, MAX_NAME = 40, MAX_PER_LESSON = 500;
const keyFor = (c, l) => 'c:' + c + ':' + l;
const clean = (s, n) => String(s || '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, n);

function isAdmin(request, env) {
  const k = request.headers.get('X-Admin-Key') || '';
  return !!env.VC_ADMIN_KEY && k.length > 0 && k === env.VC_ADMIN_KEY;
}

async function args(request, env, body, noLesson) {
  const u = new URL(request.url);
  const course = String((body && body.course) || u.searchParams.get('course') || '');
  const lesson = parseInt((body && body.lesson) || u.searchParams.get('lesson'), 10);
  if (!env.VC_COMMENTS) return { err: json({ ok: false, error: 'Comments are not switched on yet.' }, 503) };
  if (!COURSES.includes(course) || !(noLesson || (lesson > 0 && lesson < 1000))) return { err: json({ ok: false, error: 'Unknown lesson.' }, 400) };
  const admin = isAdmin(request, env);
  if (!admin && !(await hasAccess(request, env, course))) return { err: json({ ok: false, error: 'Unlock the course to see and post comments.' }, 403) };
  return { course, lesson, admin };
}

async function load(env, course, lesson) {
  return (await env.VC_COMMENTS.get(keyFor(course, lesson), 'json')) || [];
}
// Keep the queue index in step with the lesson's list.
async function syncQueue(env, course, lesson, list) {
  const qk = 'q:' + course;
  const q = new Set((await env.VC_COMMENTS.get(qk, 'json')) || []);
  if (list.some((c) => c.pending)) q.add(lesson); else q.delete(lesson);
  await env.VC_COMMENTS.put(qk, JSON.stringify([...q].sort((x, y) => x - y)));
}

export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  if (u.searchParams.get('queue')) {
    const a = await args(request, env, null, true);
    if (a.err) return a.err;
    if (!a.admin) return json({ ok: false, error: 'Not allowed.' }, 403);
    const lessons = (await env.VC_COMMENTS.get('q:' + a.course, 'json')) || [];
    const queue = [];
    for (const l of lessons) {
      const list = await load(env, a.course, l);
      list.forEach((c) => {
        if (!c.pending) return;
        const parent = c.replyTo ? list.find((p) => p.id === c.replyTo) : null;
        queue.push({ lesson: l, ...c, parentText: parent ? parent.text : undefined, parentName: parent ? parent.name : undefined });
      });
    }
    queue.sort((x, y) => x.at - y.at);
    return json({ ok: true, queue });
  }
  const a = await args(request, env);
  if (a.err) return a.err;
  const list = await load(env, a.course, a.lesson);
  return json({ ok: true, admin: a.admin, comments: a.admin ? list : list.filter((c) => !c.pending) });
}

export async function onRequestPatch({ request, env }) {
  const a = await args(request, env);
  if (a.err) return a.err;
  if (!a.admin) return json({ ok: false, error: 'Not allowed.' }, 403);
  const id = new URL(request.url).searchParams.get('id');
  const list = await load(env, a.course, a.lesson);
  const c = list.find((x) => x.id === id);
  if (!c) return json({ ok: false, error: 'Comment not found.' }, 404);
  delete c.pending;
  await env.VC_COMMENTS.put(keyFor(a.course, a.lesson), JSON.stringify(list));
  await syncQueue(env, a.course, a.lesson, list);
  return json({ ok: true });
}

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const a = await args(request, env, body);
  if (a.err) return a.err;
  const text = clean(body.text, MAX_TEXT);
  const name = a.admin ? 'CertPath team' : clean(body.name, MAX_NAME);
  if (!text) return json({ ok: false, error: 'Write a comment first.' }, 400);
  if (!name) return json({ ok: false, error: 'Add a display name.' }, 400);

  // One post per browser address per minute keeps out accidental double posts and floods.
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const rl = 'rl:' + ip;
  if (!a.admin && (await env.VC_COMMENTS.get(rl))) return json({ ok: false, error: 'Please wait a minute before posting again.' }, 429);

  const list = await load(env, a.course, a.lesson);
  if (list.length >= MAX_PER_LESSON) return json({ ok: false, error: 'This lesson has reached its comment limit.' }, 400);
  const replyTo = body.replyTo && list.some((c) => c.id === body.replyTo && !c.replyTo) ? body.replyTo : undefined;
  const c = { id: crypto.randomUUID().slice(0, 12), name, text, at: Date.now(), team: a.admin || undefined, pending: a.admin ? undefined : true, replyTo };
  list.push(c);
  await env.VC_COMMENTS.put(keyFor(a.course, a.lesson), JSON.stringify(list));
  if (c.pending) await syncQueue(env, a.course, a.lesson, list);
  if (!a.admin) await env.VC_COMMENTS.put(rl, '1', { expirationTtl: 60 });
  return json({ ok: true, comment: c });
}

export async function onRequestDelete({ request, env }) {
  const a = await args(request, env);
  if (a.err) return a.err;
  if (!a.admin) return json({ ok: false, error: 'Not allowed.' }, 403);
  const id = new URL(request.url).searchParams.get('id');
  const list = (await load(env, a.course, a.lesson)).filter((c) => c.id !== id && c.replyTo !== id);
  await env.VC_COMMENTS.put(keyFor(a.course, a.lesson), JSON.stringify(list));
  await syncQueue(env, a.course, a.lesson, list);
  return json({ ok: true });
}
