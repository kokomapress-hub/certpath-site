// Study hub — /study/<exam>. One page per exam that a book owner (access code) or a
// $19.99 pack buyer (Payhip key) lands on: video course, exam simulator, cheatsheets.
// Locked visitors see the code/key form; everyone else sees their three tiles.
(function () {
  'use strict';
  var EXAMS = window.CP_EXAMS || [];
  var app = document.getElementById('studyApp');
  var bg = document.getElementById('studyBg');
  if (!app) return;

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var read = function (k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  var unlocked = function () { var u = read('certpath_unlocked') || {}; return { slugs: Array.isArray(u.slugs) ? u.slugs : [], isAdmin: !!u.isAdmin }; };
  function grant(slugs, admin) {
    var u = unlocked();
    (slugs || []).forEach(function (s) { if (u.slugs.indexOf(s) < 0) u.slugs.push(s); });
    if (admin) u.isAdmin = true;
    try { localStorage.setItem('certpath_unlocked', JSON.stringify(u)); } catch (e) {}
  }
  function owns(exam) {
    var u = unlocked();
    if (u.isAdmin) return true;
    if (exam.key === 'pmp' && read('certpath_pmp_access')) return true;
    if (exam.key === 'capm' && read('certpath_capm_access')) return true;
    return exam.books.some(function (b) { return u.slugs.indexOf(b) > -1; });
  }
  var norm = function (s) { return (s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); };
  function sha(s) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function (h) {
      return Array.prototype.map.call(new Uint8Array(h), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }
  function post(body) {
    return fetch('/api/vc/unlock', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); }).catch(function () { return { ok: false }; });
  }

  // Book code first (checked in the browser against books.json), then a Payhip pack key
  // (checked on the server). A book code also opens that book's video course.
  async function redeem(code, email, exam) {
    var books = await (await fetch('/data/books.json', { cache: 'no-cache' })).json();
    var h = await sha(norm(code));
    if (h === books.adminCodeHash) { grant([], true); return { ok: true }; }
    // Older PMP Complete System buyers (code used to be redeemed on /pmp).
    if (h === '853cb5406b42b1422a53831ce38c9f5c39a9730206f2e3cb0f2e8e76cdc9ab54') {
      try { localStorage.setItem('certpath_pmp_access', JSON.stringify({ tier: 'complete', code: code.trim().toUpperCase(), ts: Date.now() })); } catch (e) {}
      grant(['pmp']); return { ok: true, books: ['pmp'] };
    }
    // Older CAPM Complete System buyers (code used to be redeemed on /capm).
    if (h === 'f95267986b16310d4dfddfcc92af15951c3579979cc3a938035a4f861848f1eb') {
      try { localStorage.setItem('certpath_capm_access', JSON.stringify({ tier: 'complete', code: code.trim().toUpperCase(), ts: Date.now() })); } catch (e) {}
      grant(['capm']); post({ course: 'capm', key: code, email: email }); return { ok: true, books: ['capm'] };
    }
    var hit = books.books.filter(function (b) { return [b.codeHash].concat(b.codeHashes || []).indexOf(h) > -1; }).map(function (b) { return b.slug; });
    var pool = exam && exam.course ? 'auto:' + exam.course : 'auto';
    if (hit.length) {
      grant(hit);
      post({ course: 'auto', key: code, email: email }); // sets the video cookie when this book has a course
      return { ok: true, books: hit };
    }
    var miss = 'That code was not recognised. Check the last page of your book' + (exam && exam.pack ? ', or the key in your Payhip email.' : '.');
    if (!exam || !(exam.pack || exam.course)) return { ok: false, error: miss };
    if (!/^\S+@\S+\.\S+$/.test(email || '')) return { ok: false, needEmail: true, error: 'We could not match that book code. If it is a pack key from Payhip, add the email you bought it with.' };
    var r = await post({ course: pool, key: code, email: email });
    if (r && r.ok) { grant(r.books || []); return { ok: true, books: r.books || [] }; }
    return { ok: false, error: (r && r.error) || miss };
  }

  var parts = location.pathname.replace(/\/+$/, '').split('/');
  var key = parts[1] === 'study' ? decodeURIComponent(parts[2] || '') : '';
  var exam = EXAMS.filter(function (e) { return e.key === key; })[0];
  var meta = { sheets: {}, courses: {} };

  function setBg(src) { if (bg && src) bg.style.backgroundImage = 'url("' + src + '")'; }

  var ICON = {
    video: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="15" height="14" rx="2.5"/><path d="M17.5 10l4-2.5v9l-4-2.5"/><path d="M8.5 9.5v5l4-2.5z" class="f"/></svg>',
    sim: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3.5" width="18" height="17" rx="2.5"/><path d="M7 9l1.6 1.6L11.5 7.6M7 15.5l1.6 1.6 2.9-3M14 9.5h3.5M14 16h3.5"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8.5L19 7v14.5H6z"/><path d="M14 2.5V7h5M9 12h7M9 15.5h7M9 9h3"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>'
  };
  function tile(kind, title, meta, href, cta, opts) {
    opts = opts || {};
    var tag = href ? 'a' : 'div';
    var attrs = href ? ' href="' + esc(href) + '"' + (opts.ext ? ' target="_blank" rel="noopener"' : '') + (opts.dl ? ' download' : '') : ' aria-disabled="true"';
    return '<' + tag + ' class="sh-tile' + (href ? '' : ' is-soon') + '"' + attrs + '>' +
      '<span class="sh-ico">' + ICON[kind] + '</span>' +
      '<span class="sh-tt">' + esc(title) + '</span>' +
      '<span class="sh-meta">' + meta + '</span>' +
      '<span class="sh-cta">' + esc(cta) + (href ? ' <span aria-hidden="true">→</span>' : '') + '</span>' +
      (opts.extra || '') + '</' + tag + '>';
  }

  // Where the learner stopped in the player (learn.html saves these keys).
  function resume(c) {
    var last = read('vc-progress-' + c.slug + '-last'); if (last == null) return null;
    var pos = (read('vc-progress-' + c.slug + '-pos') || {})[last] || 0, done = read('vc-progress-' + c.slug) || {};
    var l = null; c.sections.forEach(function (s) { s.lessons.forEach(function (x) { if (x.n === last) l = x; }); });
    if (!l) return null;
    var n = Object.keys(done).length, at = pos > 5 ? ' at ' + Math.floor(pos / 60) + ':' + ('0' + (pos % 60)).slice(-2) : '';
    return tile('video', 'Video course', 'Lesson ' + l.n + ': ' + esc(l.title) + '<br>' + n + ' of ' + c.count + ' lessons watched', '/learn/' + c.slug, 'Continue' + at,
      { extra: '<span class="sh-prog"><b style="width:' + Math.round(100 * n / c.count) + '%"></b></span>' });
  }
  function renderHub() {
    var u = unlocked();
    var mine = exam.books.filter(function (b) { return u.isAdmin || u.slugs.indexOf(b) > -1; });
    if (!mine.length) mine = exam.books.slice(0, 1);
    var c = exam.course && meta.courses[exam.course];
    var video = c
      ? (resume(c) || tile('video', 'Video course', c.count + ' lessons · ' + Math.round(c.seconds / 3600) + ' hours', '/learn/' + exam.course, 'Watch now'))
      : exam.yt
        ? tile('video', 'Video course', exam.ytLessons + ' free lessons on YouTube', exam.yt, 'Watch on YouTube', { ext: true })
        : tile('video', 'Video course', 'In production for ' + esc(exam.short), null, 'Coming soon');
    var extra = mine.length > 1 ? '<span class="sh-sub">' + mine.map(function (b) { return '<i data-href="/books/' + esc(b) + '">' + esc(b.replace(/-/g, ' ')) + '</i>'; }).join('') + '</span>' : '';
    var sim = tile('sim', 'Exam simulator', 'Timed, auto-scored practice exams', '/books/' + mine[0], 'Start practising', { extra: extra });
    var s = exam.sheet && meta.sheets[exam.sheet];
    var sheet = s && s.ready
      ? tile('sheet', 'Cheatsheets', 'Two-page exam summary · PDF', '/cheatsheets/' + exam.sheet + '.pdf', 'Download', { dl: true })
      : tile('sheet', 'Cheatsheets', 'Being finalised for ' + esc(exam.short), null, 'Coming soon');
    app.innerHTML =
      '<p class="sh-eyebrow">Your ' + esc(exam.short) + ' prep</p>' +
      '<h1 class="sh-h1">Everything for the ' + esc(exam.short) + ', <em>in one place.</em></h1>' +
      '<p class="sh-lead">' + esc(exam.name) + ' — unlocked on this browser. Pick up where you left off.</p>' +
      '<div class="sh-tiles">' + video + sim + sheet + '</div>' +
      '<p class="sh-foot"><a href="/my">My study page</a><span aria-hidden="true">·</span><a href="/access">Add another code</a><span aria-hidden="true">·</span><a href="mailto:support@certpathpublishing.store?subject=Help%20with%20my%20' + encodeURIComponent(exam.short) + '%20access">Need help?</a></p>';
    app.querySelectorAll('.sh-sub i').forEach(function (i) {
      i.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); location.href = i.dataset.href; });
    });
  }

  function renderLocked(prefill) {
    var hasPack = !!exam.pack;
    app.innerHTML =
      '<p class="sh-eyebrow">' + esc(exam.short) + ' · ' + esc(exam.name) + '</p>' +
      '<h1 class="sh-h1">Unlock your <em>' + esc(exam.short) + ' prep.</em></h1>' +
      '<p class="sh-lead">Enter the access code from the last page of your CertPath book' + (hasPack ? ', or the key from your $19.99 pack email' : '') + '.</p>' +
      '<form class="sh-form" id="shForm" autocomplete="off" novalidate>' +
        '<label class="sh-field"><span>' + (hasPack ? 'Book code or pack key' : 'Book access code') + '</span><input id="shCode" type="text" autocapitalize="characters" spellcheck="false" required placeholder="' + esc(exam.short.split(' ')[0].toUpperCase()) + '-XXXXX-XXXXX"></label>' +
        '<label class="sh-field"><span>Email</span><input id="shEmail" type="email" autocomplete="email" placeholder="you@example.com"></label>' +
        '<button class="sh-go" type="submit">' + ICON.lock + '<span>Unlock</span></button>' +
        '<p class="sh-err" id="shErr" role="alert" hidden></p>' +
      '</form>' +
      '<p class="sh-foot">No book yet? <a href="' + esc(exam.page) + '">See your ' + esc(exam.short) + ' options →</a></p>';
    var f = document.getElementById('shForm'), code = document.getElementById('shCode'), mail = document.getElementById('shEmail'), err = document.getElementById('shErr');
    try { mail.value = localStorage.getItem('certpath_email') || ''; } catch (e) {}
    if (prefill) { code.value = prefill.code || ''; if (prefill.email) mail.value = prefill.email; }
    f.addEventListener('submit', async function (e) {
      e.preventDefault(); err.hidden = true;
      if (!code.value.trim()) { code.focus(); return; }
      var btn = f.querySelector('button'); btn.disabled = true; btn.lastChild.textContent = 'Checking…';
      if (mail.value.trim()) try { localStorage.setItem('certpath_email', mail.value.trim()); } catch (x) {}
      var r = await redeem(code.value.trim(), mail.value.trim(), exam);
      btn.disabled = false; btn.lastChild.textContent = 'Unlock';
      if (!r.ok) { err.textContent = r.error; err.hidden = false; (r.needEmail ? mail : code).focus(); return; }
      var other = r.books && r.books.length && !r.books.some(function (b) { return exam.books.indexOf(b) > -1; }) && window.CP_EXAM_FOR_BOOK(r.books[0]);
      if (other && other.key !== exam.key) { location.href = '/study/' + other.key; return; }
      renderHub();
    });
    if (prefill && prefill.code) f.requestSubmit();
  }

  function renderPicker() {
    var mine = EXAMS.filter(owns);
    if (!mine.length) { location.replace('/#features'); return; }
    if (mine.length === 1) { location.replace('/study/' + mine[0].key); return; }
    setBg('/img/photo/hero-study.webp');
    app.innerHTML = '<p class="sh-eyebrow">Your study hub</p><h1 class="sh-h1">Which exam <em>today?</em></h1>' +
      '<div class="sh-pick">' + mine.map(function (e) { return '<a href="/study/' + e.key + '"><b>' + esc(e.short) + '</b><span>' + esc(e.name) + '</span></a>'; }).join('') + '</div>';
  }

  async function start() {
    if (!exam) { renderPicker(); return; }
    document.title = 'Your ' + exam.short + ' prep — CertPath Publishing';
    setBg(exam.photo);
    var got = await Promise.all([
      fetch('/cheatsheets/meta.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      fetch('/data/video-courses.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ]);
    meta.sheets = got[0] || {};
    ((got[1] && got[1].courses) || []).forEach(function (c) { meta.courses[c.slug] = c; });
    var handoff = null;
    try { handoff = JSON.parse(sessionStorage.getItem('certpath_home_handoff') || 'null'); sessionStorage.removeItem('certpath_home_handoff'); } catch (e) {}
    var q = new URLSearchParams(location.search);
    if (q.get('key')) handoff = { code: q.get('key'), email: q.get('email') || '' };
    if (handoff && handoff.code && !owns(exam)) { renderLocked(handoff); return; }
    if (owns(exam)) { renderHub(); return; }
    if (exam.course) { // a pack buyer on a new tab: the video cookie still knows them
      var r = await fetch('/api/vc/unlock?course=' + encodeURIComponent(exam.course), { credentials: 'same-origin' }).then(function (x) { return x.json(); }).catch(function () { return {}; });
      if (r && r.ok) { grant(r.books || exam.books); renderHub(); return; }
    }
    renderLocked(null);
  }
  start();
})();
