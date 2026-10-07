// 12-month access for Exam Simulator and Complete Prep purchases.
// The store sells one access code per exam (books.json packCodeHash), so the clock runs
// per browser: it starts the first time that code is entered here and ends 365 days later.
// Printed book codes are not time-limited. Loaded (not deferred) before the page scripts,
// so expired tests are removed before anything reads certpath_unlocked.
(function () {
  var KEY = 'certpath_term', TERM = 365 * 864e5;
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function write(t) { try { localStorage.setItem(KEY, JSON.stringify(t)); } catch (e) {} }

  // hash = SHA-256 of the normalised code, data = books.json.
  // Book code -> {paid:false}. Store code -> {paid:true, expired, until}; starts the clock on first use.
  function check(hash, data) {
    var list = (data && data.books) || [], t = read(), now = Date.now();
    var paid = list.filter(function (b) { return b.packCodeHash === hash; }).map(function (b) { return b.slug; });
    if (paid.indexOf('sat-math') > -1) paid = paid.concat(['sat-math-workbook', 'sat-math-tests']); // the SAT pack opens all three SAT banks
    if (!paid.length) {
      var own = list.filter(function (b) { return [b.codeHash].concat(b.codeHashes || []).indexOf(hash) > -1; }).map(function (b) { return b.slug; });
      if (own.length) { t._book = (t._book || []).concat(own.filter(function (s) { return (t._book || []).indexOf(s) < 0; })); write(t); }
      return { paid: false };
    }
    if (!t[hash]) { t[hash] = { since: now, slugs: paid }; write(t); }
    var until = t[hash].since + TERM;
    return { paid: true, expired: now > until, until: until };
  }

  // Drop the tests (and saved video keys) of store codes whose 12 months are over,
  // unless a printed book code also unlocked that book in this browser.
  function prune() {
    var t = read(), now = Date.now(), book = t._book || [], gone = [];
    Object.keys(t).forEach(function (h) {
      if (h !== '_book' && t[h] && now > t[h].since + TERM) (t[h].slugs || []).forEach(function (s) { if (book.indexOf(s) < 0) gone.push(s); });
    });
    if (!gone.length) return;
    try {
      var u = JSON.parse(localStorage.getItem('certpath_unlocked') || 'null');
      if (u && Array.isArray(u.slugs) && !u.isAdmin) {
        u.slugs = u.slugs.filter(function (s) { return gone.indexOf(s) < 0; });
        localStorage.setItem('certpath_unlocked', JSON.stringify(u));
      }
      gone.forEach(function (s) { localStorage.removeItem('vc-key-' + s); });
    } catch (e) {}
  }

  window.CPTerm = {
    check: check,
    expiredMsg: 'This access code’s 12 months of access have ended. Email support@certpathpublishing.store if you need more time.'
  };
  prune();
})();
