// CertPath Publishing — Free Sample Quiz
// Works for ANY published book. Reads ?book=SLUG, loads the book's question
// bank, serves 10% of one full test (min 5) as a free, no-login sample with
// instant explanations, then suggests the relevant book for purchase.

(function () {
  var LETTERS = ['A', 'B', 'C', 'D', 'E'];
  var app = document.getElementById('sampleApp');

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function fail(msg) {
    app.innerHTML =
      '<section class="lp-quiz-section"><div class="lp-quiz-wrap" style="text-align:center;padding:3rem 1rem;">' +
        '<h2 style="color:var(--navy);">' + esc(msg) + '</h2>' +
        '<p style="margin:1rem 0 1.5rem;color:var(--gray-500);">Browse our study guides and pick an exam to try.</p>' +
        '<a href="/exams" class="btn btn-lg">See All Study Guides</a>' +
      '</div></section>';
  }

  // Evenly spread `count` items across an array so the sample shows topic variety.
  function pickEvenly(arr, count) {
    if (count >= arr.length) return arr.slice();
    var step = arr.length / count;
    var out = [];
    for (var i = 0; i < count; i++) out.push(arr[Math.floor(i * step)]);
    return out;
  }

  function run(book, allBooks, data) {
    // Preferred: the curated free set — 25 original, tough questions written for this sample
    // (data/free/<bank>.json). They are not in the book or the owners' online tests.
    // Fallback (no free set yet): 10% of test 1, floor of 5.
    var isFreeSet = !!data.free;
    var t1 = (data.tests || []).find(function (t) { return t.testNum === 1; }) || (data.tests || [])[0];
    if (!t1 || !t1.questions || !t1.questions.length) { fail('This sample is not available yet.'); return; }
    var count = isFreeSet ? t1.questions.length : Math.max(5, Math.ceil(t1.questions.length * 0.1));
    var QUESTIONS = pickEvenly(t1.questions, count).map(function (q) {
      return { q: q.question, choices: q.choices, answer: q.answer, explanation: q.explanation, topic: q.topic || '', image: q.image || '', imageAlt: q.image_alt || 'Question figure' };
    });
    var missed = {};

    var exam = book.shortName || book.title;
    var totalQ = (book.totalQuestions || 0).toLocaleString();
    var idx = 0, score = 0, answered = false;

    app.innerHTML =
      '<section class="lp-quiz-section">' +
        '<div class="lp-quiz-wrap">' +
          '<div class="lp-section-head" style="margin-bottom:2rem;">' +
            '<div class="eyebrow">Free &middot; No email &middot; No signup</div>' +
            '<h2>' + QUESTIONS.length + (isFreeSet ? ' Tough ' : ' ') + esc(exam) + ' Questions</h2>' +
            '<p>' + (isFreeSet
              ? 'Written for this free sample at the hard end of the real exam — they are not in the book or in the owners&rsquo; online tests. Answer each one and see the full explanation straight away.'
              : 'Answer each one and see the step-by-step explanation instantly.') + '</p>' +
          '</div>' +
          '<div class="lp-quiz-frame">' +
            '<div class="lp-quiz-top">' +
              '<div class="crumb">' + esc(exam) + ' &middot; Free Sample</div>' +
              '<div class="crumb" id="lpCounter">1 / ' + QUESTIONS.length + '</div>' +
            '</div>' +
            '<div class="lp-quiz-progress"><div class="lp-quiz-progress-fill" id="lpProgress"></div></div>' +
            '<div class="lp-quiz-body" id="lpBody"></div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="lp-books"><div class="lp-books-inner" id="lpBookCta"></div></section>';

    var body = document.getElementById('lpBody');
    var counter = document.getElementById('lpCounter');
    var progress = document.getElementById('lpProgress');

    function render() {
      var q = QUESTIONS[idx];
      answered = false;
      counter.textContent = (idx + 1) + ' / ' + QUESTIONS.length;
      progress.style.width = (idx / QUESTIONS.length * 100) + '%';
      body.innerHTML = '<div class="lp-qnum">Question ' + (idx + 1) + ' of ' + QUESTIONS.length + '</div>' +
        '<div class="lp-question"></div><div id="lpChoices"></div><div id="lpAfter"></div>';
      body.querySelector('.lp-question').textContent = q.q;
      if (q.image) {
        var fig = document.createElement('figure');
        fig.style.cssText = 'margin:0 0 1.25rem;padding:.75rem;background:#fff;border:1px solid #DADFE5;border-radius:10px;text-align:center';
        var im = document.createElement('img');
        im.src = q.image; im.alt = q.imageAlt; im.style.cssText = 'max-width:100%;height:auto;max-height:340px';
        var zoom = document.createElement('a');   // small labels are hard to read on a phone
        zoom.href = q.image; zoom.target = '_blank'; zoom.rel = 'noopener';
        zoom.setAttribute('aria-label', 'Open the figure at full size');
        zoom.appendChild(im);
        fig.appendChild(zoom);
        var cap = document.createElement('figcaption');
        cap.textContent = 'Tap the figure to enlarge';
        cap.style.cssText = 'font-size:.75rem;color:#526176;margin-top:.4rem';
        fig.appendChild(cap);
        body.querySelector('.lp-question').insertAdjacentElement('afterend', fig);
      }
      var wrap = document.getElementById('lpChoices');
      q.choices.forEach(function (c, i) {
        var btn = document.createElement('button');
        btn.className = 'lp-choice';
        btn.innerHTML = '<span class="letter">' + LETTERS[i] + '</span><span></span>';
        btn.querySelector('span:last-child').textContent = c;
        btn.addEventListener('click', function () { pick(i, btn); });
        wrap.appendChild(btn);
      });
    }

    function pick(i, btn) {
      if (answered) return;
      answered = true;
      var q = QUESTIONS[idx];
      var correctIdx = LETTERS.indexOf(q.answer);
      var btns = body.querySelectorAll('.lp-choice');
      btns.forEach(function (b) { b.disabled = true; });
      if (correctIdx >= 0 && btns[correctIdx]) btns[correctIdx].classList.add('correct');
      if (i === correctIdx) { score++; } else { btn.classList.add('wrong'); if (q.topic) missed[q.topic] = (missed[q.topic] || 0) + 1; }
      var after = document.getElementById('lpAfter');
      var explain = document.createElement('div');
      explain.className = 'lp-explain';
      explain.innerHTML = '<strong>' + (i === correctIdx ? 'Correct. ' : 'Answer: ' + esc(q.answer) + '. ') + '</strong>';
      explain.appendChild(document.createTextNode(q.explanation || ''));
      after.appendChild(explain);
      var next = document.createElement('button');
      next.className = 'btn lp-next';
      next.textContent = idx === QUESTIONS.length - 1 ? 'See My Score' : 'Next Question';
      next.addEventListener('click', function () {
        idx++;
        if (idx < QUESTIONS.length) render(); else result();
      });
      after.appendChild(next);
    }

    function result() {
      counter.textContent = 'Done';
      progress.style.width = '100%';
      var pct = Math.round(score / QUESTIONS.length * 100);
      var verdict = pct >= 80 ? 'Strong start — close the last gaps and you are ready.' :
                    pct >= 50 ? 'Solid base — focused practice will close the gap fast.' :
                    'A structured study plan will make a big difference — exactly what the book is for.';
      body.innerHTML =
        '<div class="lp-result">' +
          '<div class="lp-score-ring">' + score + '<span class="of"> / ' + QUESTIONS.length + '</span></div>' +
          '<h3>You scored ' + pct + '%</h3>' +
          '<p>' + verdict + '</p>' +
          (Object.keys(missed).length ? '<p style="font-size:.95rem;color:var(--gray-500)"><strong style="color:var(--navy)">Review next:</strong> ' +
            Object.keys(missed).sort(function (a, b) { return missed[b] - missed[a]; }).slice(0, 3).map(function (t) { return esc(t) + ' (' + missed[t] + ' missed)'; }).join(' &middot; ') + '</p>' : '') +
          '<p style="font-size:.95rem">Optional: want occasional ' + esc(exam) + ' study tips by email? Leave your address — or skip it.</p>' +
          '<form class="lp-email-form" id="lpEmailForm">' +
            '<input type="email" id="lpEmail" required placeholder="you@example.com" autocomplete="email">' +
            '<button type="submit" class="btn">Send me study tips</button>' +
          '</form>' +
          '<div class="lp-email-msg" id="lpEmailMsg"></div>' +
          '<div class="or">— or —</div>' +
          '<a href="#" id="lpRetry" class="btn btn-outline btn-sm" style="color:var(--navy);border-color:var(--navy);">Retake the Sample</a>' +
        '</div>';
      document.getElementById('lpRetry').addEventListener('click', function (e) {
        e.preventDefault(); idx = 0; score = 0; missed = {}; render();
      });
      document.getElementById('lpEmailForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('lpEmail').value.trim();
        var msg = document.getElementById('lpEmailMsg');
        if (!email) return;
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, accessCode: 'FREE-SAMPLE', book: book.title + ' sample (' + score + '/' + QUESTIONS.length + ')' })
        }).then(function () {
          msg.className = 'lp-email-msg ok';
          msg.textContent = 'Done! Check your inbox in the next few minutes.';
        }).catch(function () {
          msg.className = 'lp-email-msg err';
          msg.textContent = 'Something went wrong — please try again.';
        });
      });
      showBookCta();
    }

    // The whole point: suggest the relevant book right on the test page.
    function showBookCta() {
      var cta = document.getElementById('lpBookCta');
      var ebook = book.payhipEbookUrl
        ? '<a href="' + book.payhipEbookUrl + '" class="btn btn-outline" target="_blank" rel="noopener" style="color:var(--navy);border-color:var(--navy);">Buy the e-book</a>'
        : '';
      cta.innerHTML =
        '<div class="lp-book-cta">' +
          '<a class="lp-book-cta-cover" href="' + (book.amazonUrl || '#') + '" target="_blank" rel="noopener">' +
            '<img src="' + book.cover + '" alt="' + esc(book.title) + '" loading="lazy">' +
          '</a>' +
          '<div class="lp-book-cta-body">' +
            '<div class="eyebrow">Ready for the full thing?</div>' +
            '<h2>' + esc(book.title) + '</h2>' +
            '<p>Those were the hard ones. The book unlocks <strong>' + book.testCount + ' full timed online tests &middot; ' + totalQ + ' questions</strong> with step-by-step explanations — free with every copy, no subscription.</p>' +
            '<div class="lp-book-cta-row">' +
              '<a href="' + (book.amazonUrl || '/books/' + book.slug) + '" class="btn btn-lg"' + (book.amazonUrl ? ' target="_blank" rel="noopener"' : '') + '>' + (book.amazonUrl ? 'Buy paperback on Amazon' : 'See the book') + '</a>' +
              ebook +
            '</div>' +
            '<p class="lp-book-cta-have">Already have the book? <a href="/access?book=' + book.slug + '">Enter your access code &rarr;</a></p>' +
          '</div>' +
        '</div>';
    }

    render();
  }

  // ---- boot ----
  var slug = new URLSearchParams(location.search).get('book');
  if (!slug) { fail('Pick an exam to try a free sample.'); return; }

  fetch('/data/books.json').then(function (r) { return r.json(); }).then(function (meta) {
    var allBooks = meta.books;
    var book = allBooks.find(function (b) { return b.slug === slug; });
    if (!book || !book.published) { fail('That sample is not available.'); return; }
    document.title = 'Free ' + (book.shortName || book.title) + ' Practice Questions — CertPath Publishing';
    var dataSlug = book.dataSlug || book.slug;
    var family = book.bank || book.slug;
    return fetch('/data/free/' + family + '.json').then(function (r) {
      if (!r.ok) throw new Error('no free set');
      return r.json();
    }).catch(function () {
      return fetch('/data/' + dataSlug + '.json').then(function (r) { return r.json(); });
    }).then(function (data) {
      if (data.free) document.title = '25 ' + document.title;
      run(book, allBooks, data);
    });
  }).catch(function () { fail('We could not load that sample right now.'); });
})();
