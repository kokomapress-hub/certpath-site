// Complete Prep directory (/complete-prep): search box + category list built from
// window.CP_EXAMS. Each category links to /complete-prep?cat=<key>, which shows that
// category's exams as cards (cover, what's included, price) with a rail to switch.
(function () {
  var CATS = [
    { key: 'pm', name: 'Project Management', exams: ['pmp', 'capm', 'pmi-acp'], icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
    { key: 'biz', name: 'Business & Administration', exams: ['cap'], icon: '<path d="M3 8h18v12H3zM8 8V5h8v3M3 13h18"/>' },
    { key: 'trades', name: 'Construction & Skilled Trades', exams: ['cast', 'journeyman'], icon: '<path d="M2 20h20M5 20V9l7-5 7 5v11M9 20v-6h6v6"/>' },
    { key: 'mech', name: 'Plant & Mechanical Aptitude', exams: ['poss', 'mech-apt'], icon: '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>' },
    { key: 'safety', name: 'Safety & Health', exams: ['csp', 'chst'], icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4"/>' },
    { key: 'nursing', name: 'Nursing', exams: ['ccrn', 'cnor', 'cmsrn'], icon: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11zM12 9v5M9.5 11.5h5"/>' },
    { key: 'college', name: 'College Admissions', exams: ['sat', 'psat', 'act'], icon: '<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6"/>' },
    { key: 'adult', name: 'Adult Education', exams: ['ged', 'tabe-a', 'tabe-d', 'tabe-m', 'tabe-e'], icon: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-5a3 3 0 0 0-3 3"/>' },
    { key: 'military', name: 'Military', exams: ['asvab'], icon: '<path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9 9.1 8z"/>' }
  ];

  var BY = { pmp: 'PMI', capm: 'PMI', 'pmi-acp': 'PMI', cap: 'IAAP', cast: 'Edison Electric Institute', journeyman: 'State licensing boards · NEC 2026',
    poss: 'Edison Electric Institute', 'mech-apt': 'BMCT · Wiesen · Ramsay', csp: 'BCSP', chst: 'BCSP', ccrn: 'AACN', cnor: 'CCI', cmsrn: 'MSNCB',
    sat: 'College Board', psat: 'College Board', act: 'ACT', ged: 'GED Testing Service', 'tabe-a': 'DRC', 'tabe-d': 'DRC', 'tabe-m': 'DRC', 'tabe-e': 'DRC', asvab: 'U.S. Department of Defense' };

  // Same page script drives /free-practice (main[data-mode=free]): only exams with free practice.
  var FREE_MODE = (document.getElementById('main') || {}).dataset && document.getElementById('main').dataset.mode === 'free';
  var BASE = FREE_MODE ? '/free-practice' : '/complete-prep';
  var FREE = ['pmp', 'capm', 'pmi-acp', 'cap', 'cast', 'mech-apt', 'journeyman', 'csp', 'chst', 'ccrn', 'cnor', 'cmsrn', 'sat', 'psat', 'act', 'ged', 'tabe-a', 'tabe-d', 'tabe-m', 'tabe-e', 'asvab']; // exams with a 25-question bank in data/free/
  var FULL = { pmp: { href: '/pmp#free', q: 180 }, capm: { href: '/capm#free', q: 150 } }; // free full-length exam (email gate)
  if (FREE_MODE) CATS = CATS.map(function (c) { return { key: c.key, name: c.name, icon: c.icon, exams: c.exams.filter(function (k) { return FREE.indexOf(k) > -1; }) }; })
    .filter(function (c) { return c.exams.length; });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function byKey(k) { for (var i = 0; i < CP_EXAMS.length; i++) if (CP_EXAMS[i].key === k) return CP_EXAMS[i]; return null; }

  function includes(e) {
    var li = [];
    if (e.pack && e.course) li.push('Video course on demand');
    else if (e.yt) li.push((e.ytLessons ? e.ytLessons + ' free video lessons' : 'Free video lessons') + ' on YouTube');
    li.push('Timed exam simulator, every answer explained');
    if (e.sheet) li.push('Printable cheatsheets');
    li.push('Study hub with progress tracking');
    return li;
  }
  function freeCard(e) {
    var cover = '/img/covers/' + e.books[0] + '.webp';
    var li = ['Every answer explained step by step', 'Works on phone, tablet or computer'];
    if (e.yt) li.push('<a href="' + esc(e.yt) + '" target="_blank" rel="noopener">' + (e.ytLessons ? e.ytLessons + ' free video lessons' : 'Free video lessons') + '</a> on YouTube');
    else if (e.course) li.push('<a href="/learn/' + e.course + '">Lesson 1 of the video course</a>, free to watch');
    // Two free options: 25 tough questions (no email) for every exam, plus a full-length exam (email sign-up) where one exists.
    var opts = '<a class="opt" href="/sample?book=' + e.books[0] + '"><b>25 tough questions →</b><small>No email, no credit card</small></a>';
    opts += FULL[e.key]
      ? '<a class="opt full" href="' + FULL[e.key].href + '"><b>1 full-length exam →</b><small>' + FULL[e.key].q + ' questions, timed · free with email sign-up</small></a>'
      : '<span class="opt off" aria-disabled="true"><b>1 full-length exam</b><small>Coming soon</small></span>';
    return '<div class="pd-card free">' +
      '<img src="' + cover + '" alt="" width="170" height="220" loading="lazy" decoding="async" onerror="this.style.visibility=\'hidden\'">' +
      '<div class="pd-info"><b>' + esc(e.short) + '</b><span class="nm">' + esc(e.name) + '</span>' + (BY[e.key] ? '<span class="by">' + esc(BY[e.key]) + '</span>' : '') + '</div>' +
      '<ul>' + li.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
      '<div class="pd-act pd-opts"><span class="pr">Free</span>' + opts + '</div></div>';
  }
  function card(e) {
    if (FREE_MODE) return freeCard(e);
    var cover = '/img/covers/' + e.books[0] + '.webp';
    // Complete Prep ($19.99: simulator + video course) or Exam Simulator ($9.99: timed tests only); the rest show a disabled button.
    var tier = e.pack ? { rib: 'Complete Prep', pr: '$19.99' } : e.sim ? { rib: 'Exam Simulator', pr: '$9.99' } : null;
    var tag = tier ? 'a' : 'div';
    return '<' + tag + ' class="pd-card' + (tier ? ' pack' + (e.pack ? '' : ' sim') : ' off') + '"' + (tier ? ' href="' + esc(e.page) + '"' : ' aria-disabled="true"') + '>' +
      (tier ? '<span class="pd-rib">' + tier.rib + '</span>' : '') +
      '<img src="' + cover + '" alt="" width="170" height="220" loading="lazy" decoding="async" onerror="this.style.visibility=\'hidden\'">' +
      '<div class="pd-info"><b>' + esc(e.short) + '</b><span class="nm">' + esc(e.name) + '</span>' + (BY[e.key] ? '<span class="by">' + esc(BY[e.key]) + '</span>' : '') + '</div>' +
      '<ul>' + includes(e).map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
      '<div class="pd-act">' + (tier ? '<span class="pr">' + tier.pr + '</span><span class="pn">' + (e.pack ? 'Complete Prep' : 'Exam Simulator') + ' · or free with the CertPath book</span>' : '<span class="pr">Free</span><span class="pn">with the CertPath book</span>') +
      (tier ? '<span class="go">See the prep →</span>' : '<span class="go">Coming soon</span>') + '</div></' + tag + '>';
  }
  function catHref(c) { return c.href || BASE + '?cat=' + c.key; }

  function renderCat(c) {
    var list = c.exams.map(byKey).filter(Boolean);
    var packs = list.filter(function (e) { return e.pack; }).length, sims = list.filter(function (e) { return e.sim; }).length;
    document.title = c.name + (FREE_MODE ? ' — Free Practice' : ' — Complete Prep') + ' | CertPath Publishing';
    var v = document.getElementById('pdCatView');
    v.innerHTML = '<nav class="pd-crumb" aria-label="Breadcrumb"><a href="' + BASE + '">' + (FREE_MODE ? 'Free Practice' : 'Complete Prep') + '</a> › ' + esc(c.name) + '</nav>' +
      '<header class="pd-band"><svg viewBox="0 0 24 24" aria-hidden="true">' + c.icon + '</svg><div><h1>' + esc(c.name) + '</h1>' +
      '<p>' + list.length + (list.length === 1 ? ' exam' : ' exams') + (FREE_MODE ? ' with free practice' : (packs ? ' · ' + packs + ' with Complete Prep ($19.99)' : '') + (sims ? ' · ' + sims + ' with the Exam Simulator ($9.99)' : '')) + ' · pick yours below</p></div></header>' +
      '<div class="pd-lay"><nav class="pd-rail" aria-label="Categories"><h2>Categories</h2>' +
      CATS.map(function (o) { return '<a href="' + catHref(o) + '"' + (o === c ? ' class="on" aria-current="page"' : '') + '>' + esc(o.name) + (o.exams ? '<small>' + o.exams.length + '</small>' : '') + '</a>'; }).join('') +
      '</nav><div class="pd-cards">' + list.map(card).join('') + '</div></div>';
    document.getElementById('pdDir').hidden = true;
    document.getElementById('main').classList.add('is-cat');
    v.hidden = false;
  }

  function init() {
    var grid = document.getElementById('pdGrid');
    if (!grid || !window.CP_EXAMS) return;
    grid.innerHTML = CATS.map(function (c) {
      var n = c.exams ? c.exams.length : 0;
      return '<a class="pd-cat" href="' + catHref(c) + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + c.icon +
        '</svg><span>' + esc(c.name) + '</span>' + (n ? '<small>' + n + (n === 1 ? ' exam' : ' exams') + '</small>' : '') + '</a>';
    }).join('');
    var want = new URLSearchParams(location.search).get('cat');
    for (var i = 0; i < CATS.length; i++) if (CATS[i].key === want && CATS[i].exams) renderCat(CATS[i]);

    // Search: match on short name, full name and field.
    var q = document.getElementById('pdQ'), res = document.getElementById('pdRes'), form = document.getElementById('pdFind'), hits = [];
    function search() {
      var t = q.value.trim().toLowerCase();
      if (!t) { res.hidden = true; hits = []; return; }
      hits = CP_EXAMS.filter(function (e) { return (!FREE_MODE || FREE.indexOf(e.key) > -1) && (e.short + ' ' + e.name + ' ' + e.field + ' ' + e.key).toLowerCase().indexOf(t) > -1; });
      res.innerHTML = hits.length
        ? hits.slice(0, 8).map(function (e, k) { return '<li><a href="' + esc(FREE_MODE ? '/sample?book=' + e.books[0] : e.page) + '"' + (k ? '' : ' class="on"') + '><b>' + esc(e.short) + '</b><span>' + esc(e.name) + '</span></a></li>'; }).join('')
        : '<li class="none">No exam matches that yet. Email us and we\'ll help.</li>';
      res.hidden = false;
    }
    q.addEventListener('input', search);
    q.addEventListener('focus', search);
    document.addEventListener('click', function (ev) { if (!form.contains(ev.target)) res.hidden = true; });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (hits.length) location.href = FREE_MODE ? '/sample?book=' + hits[0].books[0] : hits[0].page;
      else if (!q.value.trim()) q.focus();
      else search();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
