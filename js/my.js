// CertPath Publishing — My Study Page (/my)
// A customer's own page on this browser: the books their access code opened, every test with its
// status (not started / in progress → resume / finished with best score), their video courses, and
// the free two-page cheat sheets. Everything is read from localStorage — there are no server accounts.
(function () {
  var root = document.getElementById('myApp');
  if (!root) return;

  function read(k, fallback) { try { return JSON.parse(localStorage.getItem(k) || 'null') || fallback; } catch (e) { return fallback; } }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  Promise.all([
    fetch('/data/books.json').then(function (r) { return r.json(); }),
    fetch('/cheatsheets/meta.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
    fetch('/data/book-pages.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
  ]).then(function (res) { render(res[0].books || [], res[1] || {}, res[2] || {}); })
    .catch(function () { root.innerHTML = '<p class="cp-lead">We could not load your page right now. Please refresh.</p>'; });

  function sheetFor(book, sheets) {
    var bank = book.bank || book.slug;
    return sheets[bank] && sheets[bank].ready ? { href: '/cheatsheets/' + bank + '.pdf', name: sheets[bank].short } : null;
  }

  function render(books, sheets, pages) {
    var unlocked = read('certpath_unlocked', { slugs: [], isAdmin: false });
    var pmp = read('certpath_pmp_access', null), capm = read('certpath_capm_access', null);
    var progress = read('certpath_progress', {}), scores = read('certpath_scores', {}), done = read('certpath_completed', {});
    var name = '';
    try { name = localStorage.getItem('certpath_name') || ''; } catch (e) {}

    var published = books.filter(function (b) { return b.published && !/-free$/.test(b.slug); });
    var mine = published.filter(function (b) { return unlocked.isAdmin || (unlocked.slugs || []).indexOf(b.slug) >= 0; });
    var signedIn = mine.length > 0 || !!pmp || !!capm;

    var h = '';
    h += '<header class="cp-my-head"><span class="cp-eyebrow">My study page</span>' +
         '<h1>' + (signedIn ? 'Welcome back' + (name ? ', ' + esc(name) : '') + '.' : 'Your study page') + '</h1>' +
         '<p class="cp-lead">' + (signedIn
           ? 'Everything your access code opened, saved on this browser. Leave a test any time — it will be waiting here.'
           : 'Enter the access code from your book once, and this page keeps your tests, scores and unfinished attempts ready for next time.') + '</p>' +
         (signedIn ? '' : '<p><a class="cp-btn cp-btn-primary" href="/access">Enter my access code <span class="cp-arrow" aria-hidden="true">→</span></a></p>') +
         '</header>';

    // ---- unfinished attempts ----
    var open = Object.keys(progress).map(function (id) {
      var p = progress[id], parts = id.split('#'), b = books.filter(function (x) { return x.slug === parts[0]; })[0];
      if (!b || !p || !p.answers) return null;
      return { b: b, n: parts[1], answered: Object.keys(p.answers).length, total: p.total || 0, left: Math.max(1, Math.round((p.timeLeft || 0) / 60)), at: p.at || '' };
    }).filter(Boolean).sort(function (a, c) { return a.at < c.at ? 1 : -1; });
    if (open.length) {
      h += '<section class="cp-my-sec"><h2>Pick up where you left off</h2><div class="cp-my-resume">' + open.map(function (o) {
        return '<a class="cp-my-resume-card" href="/quiz?book=' + encodeURIComponent(o.b.slug) + '&test=' + encodeURIComponent(o.n) + '">' +
          '<b>' + esc(o.b.shortName || o.b.title) + ' · Practice Test ' + esc(o.n) + '</b>' +
          '<span>' + o.answered + (o.total ? ' of ' + o.total : '') + ' answered · ' + o.left + ' min left</span>' +
          '<span class="cp-my-go">Resume <span aria-hidden="true">→</span></span></a>';
      }).join('') + '</div></section>';
    }

    // ---- my books ----
    if (mine.length) {
      h += '<section class="cp-my-sec"><h2>My books</h2><div class="cp-my-books">' + mine.map(function (b) {
        var sc = scores[b.slug] || {}, fin = done[b.slug] || [], tests = '';
        for (var n = 1; n <= (b.testCount || 0); n++) {
          var inProg = progress[b.slug + '#' + n], s = sc[n], state, cls;
          if (inProg && inProg.answers && Object.keys(inProg.answers).length) { state = 'In progress — resume'; cls = 'is-open'; }
          else if (s) { state = 'Finished · ' + s.pct + '%'; cls = 'is-done'; }
          else if (fin.indexOf(n) >= 0) { state = 'Finished'; cls = 'is-done'; }
          else { state = 'Not started'; cls = ''; }
          tests += '<a class="cp-my-test ' + cls + '" href="/quiz?book=' + encodeURIComponent(b.slug) + '&test=' + n + '"><span>Practice Test ' + n + '</span><em>' + state + '</em></a>';
        }
        var sheet = sheetFor(b, sheets);
        return '<article class="cp-my-book">' +
          (b.cover ? '<img src="' + esc(b.cover) + '" alt="" width="96" height="124" loading="lazy">' : '') +
          '<div><h3>' + esc(b.title) + '</h3>' +
          '<div class="cp-my-tests">' + (tests || '<p class="cp-my-note">Print-only title — no online tests.</p>') + '</div>' +
          '<p class="cp-my-links">' +
            (sheet ? '<a href="' + sheet.href + '" download>Download the free 2-page cheat sheet (PDF)</a>' : '') +
            (pages[b.slug] ? '<a href="' + esc(pages[b.slug]) + '">Book page</a>' : '') +
          '</p></div></article>';
      }).join('') + '</div></section>';
    }

    // ---- courses ----
    if (pmp || capm) {
      h += '<section class="cp-my-sec"><h2>My video courses</h2><p class="cp-my-links">' +
        (pmp ? '<a class="cp-btn cp-btn-navy" href="/pmp-course">Open the PMP course</a> ' : '') +
        (capm ? '<a class="cp-btn cp-btn-navy" href="/capm-course">Open the CAPM course</a>' : '') + '</p></section>';
    }

    // ---- free cheat sheets (everyone) ----
    var seen = {}, all = published.map(function (b) {
      var bank = b.bank || b.slug; if (seen[bank] || !sheets[bank] || !sheets[bank].ready) return ''; seen[bank] = 1;
      return '<a class="cp-my-sheet" href="/cheatsheets/' + bank + '.pdf" download><b>' + esc(sheets[bank].short) + '</b><span>2 pages · PDF</span></a>';
    }).join('');
    if (all) {
      h += '<section class="cp-my-sec"><h2>Free cheat sheets</h2><p class="cp-my-note">Two printable pages per exam — the formulas, rules and exam facts worth memorising. Free to download, no email.</p>' +
           '<div class="cp-my-sheets">' + all + '</div></section>';
    }

    h += '<p class="cp-my-foot">Your progress is saved in this browser only. On another device, enter your access code again — your code keeps working.</p>';
    root.innerHTML = h;
  }
})();
