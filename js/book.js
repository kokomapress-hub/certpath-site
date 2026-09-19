// CertPath Publishing — dedicated book page (/books/<slug>).
// Two states on one URL: visitor (free practice + access-code form) and owner
// (this book's practice tests). Code validation, storage keys and the MailerLite
// call are the ones js/app.js already uses on /access — nothing new is invented.

(function () {
  'use strict';
  var cfg = window.CP_BOOK;
  if (!cfg) return;
  var $ = function (s) { return document.querySelector(s); };

  function owns() {
    var u = getUnlocked();
    return !!u.isAdmin || (u.slugs || []).indexOf(cfg.slug) !== -1;
  }

  function renderTests() {
    var u = getUnlocked();
    var done = getCompleted()[cfg.slug] || [];
    var html = '';
    for (var n = 1; n <= cfg.tests; n++) {
      var locked = cfg.sequential && !u.isAdmin && n > 1 && done.indexOf(n - 1) === -1;
      html += locked
        ? '<span class="cp-test is-locked" aria-disabled="true" title="Finish Test ' + (n - 1) + ' first">Test ' + n + '</span>'
        : '<a class="cp-test' + (done.indexOf(n) !== -1 ? ' is-done' : '') + '" href="/quiz?book=' + encodeURIComponent(cfg.slug) + '&test=' + n + '">Test ' + n +
          (done.indexOf(n) !== -1 ? '<span class="cp-sr"> (completed)</span>' : '') + '</a>';
    }
    $('#testsGrid').innerHTML = html;
    $('#seqNote').hidden = !cfg.sequential;
  }

  function setState(owner) {
    document.body.dataset.bookState = owner ? 'owner' : 'visitor';
    document.querySelectorAll('[data-owner-only]').forEach(function (n) { n.hidden = !owner; });
    document.querySelectorAll('[data-visitor-only]').forEach(function (n) { n.hidden = owner; });
    if (owner) renderTests();
  }

  // ---- Free practice: capture the lead, then open the sample ----
  var FREE_KEY = 'certpath_free_leads';
  function hasLead() { try { return JSON.parse(localStorage.getItem(FREE_KEY) || '[]').indexOf(cfg.slug) !== -1; } catch (e) { return false; } }
  function showStart() { $('#freeForm').hidden = true; $('#freeStart').hidden = false; }

  if ($('#freeForm')) $('#freeForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var email = $('#freeEmail').value.trim();
    if (!email) return;
    fetch('/api/subscribe', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, accessCode: 'FREE-SAMPLE', book: cfg.short + ' (free sample)' }),
      keepalive: true
    }).catch(function () {});
    try {
      var leads = JSON.parse(localStorage.getItem(FREE_KEY) || '[]');
      if (leads.indexOf(cfg.slug) === -1) leads.push(cfg.slug);
      localStorage.setItem(FREE_KEY, JSON.stringify(leads));
      setEmail(email);
    } catch (e) {}
    location.href = $('#freeStart').getAttribute('href');
  });
  if ($('#freeForm') && hasLead()) showStart();

  // ---- Access code: unlock in place ----
  var form = $('#codeForm'), msg = $('#codeMsg');
  if (getEmail()) $('#ownerEmail').value = getEmail();
  if (getName() && $('#ownerName')) $('#ownerName').value = getName();

  form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    var code = $('#code').value, email = $('#ownerEmail').value.trim();
    var btn = form.querySelector('button'), label = btn.textContent;
    var fail = function (t) { msg.textContent = t; msg.classList.add('show'); };
    msg.classList.remove('show');
    if (!code.trim()) { fail('Enter the access code from the last page of your book.'); return; }

    btn.disabled = true; btn.textContent = 'Checking your code…';
    var result;
    try { result = await validateCode(code); }
    catch (e) { fail("We couldn't connect. Your entry is still here — please try again."); return; }
    finally { btn.disabled = false; btn.textContent = label; }

    if (!result.success) { fail(result.message); return; }
    if (!result.isAdmin && !email) { fail('Please enter your email address.'); return; }

    var slugs = result.books.map(function (b) { return b.slug; });
    var cur = getUnlocked();
    if (result.isAdmin) { cur.isAdmin = true; cur.slugs = slugs; }
    if (result.isAdmin) await grantOwnerCourses(code);
    else { cur.slugs = Array.from(new Set((cur.slugs || []).concat(slugs))); }
    setUnlocked(cur);
    if (email) setEmail(email);
    var firstName = ($('#ownerName') || {}).value || '';
    if (firstName.trim()) setName(firstName);
    if (!result.isAdmin) {
      fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, accessCode: code, book: result.books[0].shortName || result.books[0].slug, name: firstName.trim() })
      }).catch(function () {});
    }

    // A valid code for a different book: take them to that book's page.
    if (!result.isAdmin && slugs.indexOf(cfg.slug) === -1) {
      location.href = '/books/' + slugs[0];
      return;
    }
    setState(true);
    noteSiblings(result.books);
    if (window.cpRefreshAccount) window.cpRefreshAccount();
    window.scrollTo({ top: 0, behavior: 'auto' });
    $('.cp-tests h2').setAttribute('tabindex', '-1');
    $('.cp-tests h2').focus();
  });

  // Shared codes (e.g. the three SAT Math books) unlock siblings too — say so.
  function noteSiblings(list) {
    var others = (list || []).filter(function (b) { return b.slug !== cfg.slug && b.published; });
    if (!others.length || others.length > 4) return;
    $('#alsoUnlocked').innerHTML = '<b>Your code also unlocked:</b> ' + others.map(function (b) {
      return '<a href="/books/' + encodeURIComponent(b.slug) + '">' + String(b.title).replace(/</g, '&lt;') + '</a>';
    }).join(' · ');
  }

  setState(owns());
})();
