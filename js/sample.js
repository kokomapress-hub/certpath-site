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
        '<a href="/#books" class="btn btn-lg">See All Study Guides</a>' +
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
    // 10% of one full test, floor of 5 so small tests still feel substantial.
    var t1 = (data.tests || []).find(function (t) { return t.testNum === 1; }) || (data.tests || [])[0];
    if (!t1 || !t1.questions || !t1.questions.length) { fail('This sample is not available yet.'); return; }
    var count = Math.max(5, Math.ceil(t1.questions.length * 0.1));
    var QUESTIONS = pickEvenly(t1.questions, count).map(function (q) {
      return { q: q.question, choices: q.choices, answer: q.answer, explanation: q.explanation };
    });

    var exam = book.shortName || book.title;
    var totalQ = (book.totalQuestions || 0).toLocaleString();
    var idx = 0, score = 0, answered = false;

    app.innerHTML =
      '<section class="lp-quiz-section">' +
        '<div class="lp-quiz-wrap">' +
          '<div class="lp-section-head" style="margin-bottom:2rem;">' +
            '<div class="eyebrow">Free Sample &middot; No Signup</div>' +
            '<h2>Try ' + QUESTIONS.length + ' Real ' + esc(exam) + ' Questions</h2>' +
            '<p>Straight from the ' + esc(book.title) + ' question bank. Answer each one and see the step-by-step explanation instantly.</p>' +
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
      if (i === correctIdx) { score++; } else { btn.classList.add('wrong'); }
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
          '<p>' + verdict + ' Want a free ' + esc(exam) + ' study plan and launch discounts? Drop your email below.</p>' +
          '<form class="lp-email-form" id="lpEmailForm">' +
            '<input type="email" id="lpEmail" required placeholder="you@example.com" autocomplete="email">' +
            '<button type="submit" class="btn">Send My Study Plan</button>' +
          '</form>' +
          '<div class="lp-email-msg" id="lpEmailMsg"></div>' +
          '<div class="or">— or —</div>' +
          '<a href="#" id="lpRetry" class="btn btn-outline btn-sm" style="color:var(--navy);border-color:var(--navy);">Retake the Sample</a>' +
        '</div>';
      document.getElementById('lpRetry').addEventListener('click', function (e) {
        e.preventDefault(); idx = 0; score = 0; render();
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
        ? '<a href="' + book.payhipEbookUrl + '" class="btn btn-outline" target="_blank" rel="noopener" style="color:var(--navy);border-color:var(--navy);">E-book $' + book.ebookPrice.toFixed(2) + ' <span style="opacity:.7;">(50% off)</span></a>'
        : '';
      cta.innerHTML =
        '<div class="lp-book-cta">' +
          '<a class="lp-book-cta-cover" href="' + (book.amazonUrl || '#') + '" target="_blank" rel="noopener">' +
            '<img src="' + book.cover + '" alt="' + esc(book.title) + '" loading="lazy">' +
          '</a>' +
          '<div class="lp-book-cta-body">' +
            '<div class="eyebrow">Ready for the full thing?</div>' +
            '<h2>' + esc(book.title) + '</h2>' +
            '<p>That was a quick taste. The book unlocks <strong>' + book.testCount + ' full timed online tests &middot; ' + totalQ + ' questions</strong> with step-by-step explanations — free with every copy, no subscription.</p>' +
            '<div class="lp-book-cta-row">' +
              '<a href="' + (book.amazonUrl || '#') + '" class="btn btn-lg" target="_blank" rel="noopener">Paperback $' + book.paperbackPrice.toFixed(2) + '</a>' +
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
    document.title = 'Free ' + (book.shortName || book.title) + ' Sample Quiz — CertPath Publishing';
    var dataSlug = book.dataSlug || book.slug;
    return fetch('/data/' + dataSlug + '.json').then(function (r) { return r.json(); }).then(function (data) {
      run(book, allBooks, data);
    });
  }).catch(function () { fail('We could not load that sample right now.'); });
})();
