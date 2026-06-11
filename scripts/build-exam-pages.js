// Generate static per-exam landing pages (sat.html, ged.html, tabe.html,
// ccrn.html, cast.html) with a baked-in 10-question sample quiz.
// Run after changing books.json or question banks: node scripts/build-exam-pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://certpathpublishing.store';
const books = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/books.json'), 'utf8')).books;

const PAGES = [
  {
    file: 'sat.html',
    exam: 'Digital SAT Math',
    headline: 'Pass the <span class="gold">Digital SAT Math</span> Section',
    sub: 'Blueprint-aligned prep for the Digital SAT Math section — 44 questions, two adaptive modules, on-screen Desmos calculator. Try 10 real practice questions below, free.',
    quizSource: 'sat-math',
    relatedSlugs: ['sat-math', 'sat-math-workbook', 'sat-math-tests'],
    metaTitle: 'Digital SAT Math Prep — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Prepare for the Digital SAT Math section with blueprint-aligned study guides, 4,500+ practice questions, and free timed online tests. Try 10 free sample questions.',
    disclaimer: 'SAT® is a registered trademark of College Board, which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['How many questions are on the Digital SAT Math section?', 'The Digital SAT Math section has 44 questions across two 22-question adaptive modules, with 70 minutes total. The built-in Desmos calculator is available on every question.'],
      ['What topics does Digital SAT Math cover?', 'Four domains: Algebra (about 35%), Advanced Math (about 35%), Problem-Solving & Data Analysis (about 15%), and Geometry & Trigonometry (about 15%). Our books mirror this exact weighting.'],
      ['What is included with the CertPath SAT Math books?', 'Three SKUs: the complete study guide (lessons + 700+ questions), the workbook (700+ fresh drill problems), and 10 full-length practice tests. Every book unlocks 1,500+ additional timed online questions — and no question repeats across the three books.'],
      ['Are the online practice tests really free?', 'Yes. Every CertPath book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access to unlock timed, auto-scored practice tests on any device — no subscription.'],
      ['How do these questions compare to the real exam?', 'Questions follow the official College Board skill blueprint in format, difficulty range, and domain weighting, including multiple-choice and student-produced response formats.'],
    ],
  },
  {
    file: 'ged.html',
    exam: 'GED Math',
    headline: 'Pass the <span class="gold">GED Math</span> Test — No Math Background Needed',
    sub: 'Plain-language prep for GED Mathematical Reasoning, built from the ground up for adult learners. Try 10 real practice questions below, free.',
    quizSource: 'ged-math',
    relatedSlugs: ['ged-math', 'ged-math-workbook', 'ged-math-tests'],
    metaTitle: 'GED Math Prep — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Pass the GED Mathematical Reasoning test with plain-language study guides, 4,500+ practice questions, and free timed online tests. Try 10 free sample questions.',
    disclaimer: 'GED® is a registered trademark of the American Council on Education and GED Testing Service LLC, which are not affiliated with and do not endorse this publication.',
    faqs: [
      ['How hard is the GED math test?', 'GED Mathematical Reasoning is a 115-minute test with about 46 questions. Most test-takers find it manageable with focused practice — the key is steady work on the four content areas rather than cramming.'],
      ['What math is on the GED?', 'Four areas: quantitative problem solving with rational numbers, quantitative problem solving with measurement, algebraic problem solving with expressions and equations, and algebraic problem solving with graphs and functions.'],
      ['Can I use a calculator on the GED math test?', 'Yes — the on-screen TI-30XS calculator is available for most of the test. Our study guide includes a strategy chapter on using it efficiently.'],
      ['What is included with the CertPath GED Math books?', 'Three SKUs: the complete study guide, a 600+ problem workbook, and 10 full-length practice tests. Each book unlocks 1,500+ additional timed online questions, with no repeats across books.'],
      ['Are the online practice tests really free?', 'Yes. Every book has a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
    ],
  },
  {
    file: 'tabe.html',
    exam: 'TABE 11 & 12 Math',
    headline: 'Master <span class="gold">TABE 11 &amp; 12 Math</span> — Every Level, A to E',
    sub: 'The only TABE math workbook series with a book for each level — E, M, D, and A — written in plain language for adult learners. Try 10 real practice questions below, free.',
    quizSource: 'tabe-a',
    relatedSlugs: ['tabe-a', 'tabe-d', 'tabe-m', 'tabe-e'],
    metaTitle: 'TABE 11 & 12 Math Workbooks (Levels A, D, M, E) — Free Practice | CertPath Publishing',
    metaDesc: 'TABE 11 & 12 math prep for adult learners at every level — A, D, M, and E. Step-by-step workbooks with free timed online practice tests. Try 10 free sample questions.',
    disclaimer: 'TABE® is a registered trademark of Data Recognition Corporation (DRC), which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['What are the TABE levels and which book do I need?', 'TABE 11 & 12 has four levels: E (foundational), M (upper elementary), D (pre-high-school), and A (high-school equivalent). If you are unsure, start with the level your program assigned, or take the diagnostic pretest in any of our books — each one tells you whether to move up or down a level.'],
      ['What is on the TABE math test?', 'TABE 11 & 12 math covers numbers and quantity, algebra and functions, geometry, and statistics and probability, weighted by level. Our workbooks mirror the official domain weighting at each level.'],
      ['How is the CertPath TABE series different?', 'One dedicated book per level instead of a single generic book. Every concept is taught from the ground up in plain language, with 500-1,200+ problems per book and full-length timed practice tests matching the real format.'],
      ['Are the online practice tests really free?', 'Yes. Every book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
      ['Will these books help me get into a trade or training program?', 'TABE scores are widely used for workforce program placement and adult education. Higher placement means skipping remedial coursework — most readers prep for two to four weeks per level.'],
    ],
  },
  {
    file: 'ccrn.html',
    exam: 'Adult CCRN',
    headline: 'Pass the <span class="gold">Adult CCRN</span> on Your First Attempt',
    sub: 'Updated for the revised AACN test plan — complete critical-care review with detailed rationales, Synergy Model coverage, and 750+ online questions. Try 10 real practice questions below, free.',
    quizSource: 'ccrn',
    relatedSlugs: ['ccrn'],
    metaTitle: 'Adult CCRN Exam Prep (Revised AACN Test Plan) — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Adult CCRN exam prep updated for the revised AACN test plan. 3 full-length practice exams, 750+ online questions, detailed rationales. Try 10 free sample questions.',
    disclaimer: 'CCRN® is a registered trademark of the AACN Certification Corporation, which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['How many questions are on the Adult CCRN exam?', 'The Adult CCRN is a 150-question exam (125 scored, 25 unscored pilot items) with a 3-hour time limit. Roughly 80% covers clinical judgment and 20% covers professional caring and ethical practice.'],
      ['What changed in the revised AACN test plan?', 'The AACN periodically rebalances domain weightings and clinical content. Our book is mapped one-to-one to the current revised test plan — chapter weighting matches the exam blueprint, so you study in the same proportions you will be tested.'],
      ['Do I meet the requirements to sit for the CCRN?', 'AACN requires either 1,750 hours of direct care of acutely/critically ill adult patients in the last 2 years (875 in the most recent year), or 2,000 hours in the last 5 years (144 in the most recent year). Check aacn.org for current eligibility.'],
      ['What is included with the CertPath CCRN book?', 'A complete blueprint-aligned review with detailed rationales, Synergy Model coverage woven through every chapter, 3 full-length 150-question practice exams, and 750+ additional timed online questions via the free Exam Simulator.'],
      ['Are the online practice tests really free?', 'Yes. The book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored exams on any device.'],
    ],
  },
  {
    file: 'cast.html',
    exam: 'CAST',
    headline: 'Pass the <span class="gold">CAST Exam</span> on the First Try',
    sub: 'All-in-one prep for the EEI Construction and Skilled Trades test — graphic arithmetic, mechanical concepts, and reading comprehension. Try 10 real practice questions below, free.',
    quizSource: 'cast',
    relatedSlugs: ['cast', 'mech-apt', 'poss'],
    metaTitle: 'CAST Exam Study Guide (EEI Construction & Skilled Trades) — Free Practice | CertPath Publishing',
    metaDesc: 'CAST test prep for utility and skilled trades jobs. 3 full-length practice tests, 500+ questions, free timed online tests. Try 10 free sample questions.',
    disclaimer: 'CAST and the Construction and Skilled Trades Selection System are trademarks of their respective owners, who are not affiliated with and do not endorse this publication.',
    faqs: [
      ['What is the CAST test?', 'CAST (Construction and Skilled Trades) is the EEI selection test used by utilities and energy companies for trades roles — line worker, substation, meter, gas, and similar positions. It has four parts: graphic arithmetic, mechanical concepts, reading comprehension, and mathematical usage.'],
      ['What score do I need to pass the CAST?', 'Each employer sets its own cutoff, reported on a 1-10 index. Most utilities look for a minimum index around 4-6 for trades positions. Higher scores improve your ranking against other applicants.'],
      ['How should I prepare for the CAST?', 'Practice under timed conditions. The math is not advanced, but the pacing is aggressive — graphic arithmetic gives you about 30 problems in 30 minutes reading values off drawings. Our book includes 3 full-length timed tests that mirror the real pacing.'],
      ['What is included with the CertPath CAST book?', 'A complete review of all four test parts, 500+ practice questions with detailed answer explanations, 3 full-length practice tests, and free timed online practice tests (330 questions) via the access code in the book.'],
      ['Are the online practice tests really free?', 'Yes. The book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
    ],
  },
];

// --- helpers ---------------------------------------------------------------

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function sampleQuestions(slug, count) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', slug + '.json'), 'utf8'));
  const all = data.tests.flatMap(t => t.questions);
  // Even spread across the bank so the sample shows topic variety.
  const step = Math.floor(all.length / count);
  const picked = [];
  for (let i = 0; i < count; i++) picked.push(all[i * step]);
  return picked.map(q => ({ q: q.question, choices: q.choices, answer: q.answer, explanation: q.explanation }));
}

function bookCard(b) {
  return `
        <div class="lp-book-card">
          <a href="${b.amazonUrl}" target="_blank" rel="noopener"><img src="${b.cover}" alt="${esc(b.title)}" loading="lazy"></a>
          <h3>${esc(b.title)}</h3>
          <div class="meta">${b.testCount} online tests &middot; ${b.totalQuestions.toLocaleString()} questions included</div>
          <div class="row">
            <a href="${b.amazonUrl}" class="btn btn-sm" target="_blank" rel="noopener">Paperback $${b.paperbackPrice.toFixed(2)}</a>
            ${b.payhipEbookUrl ? `<a href="${b.payhipEbookUrl}" class="btn btn-sm btn-outline" target="_blank" rel="noopener">E-book $${b.ebookPrice.toFixed(2)}</a>` : ''}
          </div>
        </div>`;
}

function renderPage(cfg) {
  const related = cfg.relatedSlugs.map(s => books.find(b => b.slug === s)).filter(b => b && b.published);
  const heroBook = related[0];
  const questions = sampleQuestions(cfg.quizSource, 10);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cfg.faqs.map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(cfg.metaTitle)}</title>
  <meta name="description" content="${esc(cfg.metaDesc)}">
  <link rel="icon" type="image/png" href="/img/logo-mark.png">
  <link rel="canonical" href="${SITE}/${cfg.file.replace('.html', '')}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CertPath Publishing">
  <meta property="og:title" content="${esc(cfg.metaTitle)}">
  <meta property="og:description" content="${esc(cfg.metaDesc)}">
  <meta property="og:url" content="${SITE}/${cfg.file.replace('.html', '')}">
  <meta property="og:image" content="${SITE}${heroBook.cover.replace(/\.webp$/, '.png')}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=10">
  <link rel="stylesheet" href="/css/landing.css?v=1">
  <script type="application/ld+json">${JSON.stringify(faqLd)}</script>
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo">
        <svg class="logo-shield" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true"><path fill="#1B2A4A" d="M6 4h22l6 6v20l-14 6L6 30V4z"/><rect x="12" y="14" width="16" height="3" fill="#fff"/><rect x="12" y="20" width="16" height="3" fill="#fff"/></svg>
        <span class="logo-text">CertPath <span class="gold">Publishing</span></span>
      </a>
      <nav class="nav">
        <a href="/">Home</a>
        <a href="/#books">Study Guides</a>
        <a href="/access" class="btn-nav">Access Tests</a>
      </nav>
    </div>
  </header>

  <section class="lp-hero">
    <div class="lp-hero-inner">
      <div>
        <h1>${cfg.headline}</h1>
        <p class="lp-sub">${cfg.sub}</p>
        <div class="lp-hero-cta">
          <a href="#sample-quiz" class="btn btn-lg">Try 10 Free Questions</a>
          <a href="${heroBook.amazonUrl}" class="btn btn-secondary btn-lg" target="_blank" rel="noopener">Get the Book — $${heroBook.paperbackPrice.toFixed(2)}</a>
        </div>
        <div class="lp-trust">
          <div><strong>${related.reduce((s, b) => s + b.totalQuestions, 0).toLocaleString()}+</strong> online questions</div>
          <div><strong>${related.reduce((s, b) => s + b.testCount, 0)}</strong> timed practice tests</div>
          <div><strong>FREE</strong> with every book</div>
        </div>
      </div>
      <div class="lp-hero-cover">
        <a href="${heroBook.amazonUrl}" target="_blank" rel="noopener"><img src="${heroBook.cover}" alt="${esc(heroBook.title)}" loading="eager"></a>
      </div>
    </div>
  </section>

  <section class="lp-quiz-section" id="sample-quiz">
    <div class="lp-quiz-wrap">
      <div class="lp-section-head" style="margin-bottom: 2rem;">
        <div class="eyebrow">Free Sample</div>
        <h2>Try 10 Real ${esc(cfg.exam)} Questions</h2>
        <p>Straight from our question bank — answer each one and see the step-by-step explanation instantly.</p>
      </div>
      <div class="lp-quiz-frame">
        <div class="lp-quiz-top">
          <div class="crumb">${esc(cfg.exam)} &middot; Free Sample Quiz</div>
          <div class="crumb" id="lpCounter">1 / 10</div>
        </div>
        <div class="lp-quiz-progress"><div class="lp-quiz-progress-fill" id="lpProgress"></div></div>
        <div class="lp-quiz-body" id="lpBody"></div>
      </div>
    </div>
  </section>

  <section class="lp-books">
    <div class="lp-books-inner">
      <div class="lp-section-head">
        <div class="eyebrow">The Books</div>
        <h2>Complete ${esc(cfg.exam)} Prep</h2>
        <p>Every book includes free timed online practice tests — no subscription, no repeats between books.</p>
      </div>
      <div class="lp-books-grid">${related.map(bookCard).join('')}</div>
    </div>
  </section>

  <section class="lp-faq">
    <div class="lp-faq-inner">
      <div class="lp-section-head" style="margin-bottom: 2rem;">
        <div class="eyebrow">FAQ</div>
        <h2>${esc(cfg.exam)} — Common Questions</h2>
      </div>
      ${cfg.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n      ')}
    </div>
  </section>

  <footer class="footer">
    <div class="footer-bottom" style="border: none; padding: 2rem; text-align: center;">
      <p>&copy; 2026 CertPath Publishing. All rights reserved.</p>
      <p style="margin-top: 0.5rem; font-size: 0.78rem; opacity: 0.7;">${esc(cfg.disclaimer)}</p>
    </div>
  </footer>

  <script>
  (function () {
    var QUESTIONS = ${JSON.stringify(questions)};
    var EXAM = ${JSON.stringify(cfg.exam)};
    var idx = 0, score = 0, answered = false;
    var body = document.getElementById('lpBody');
    var counter = document.getElementById('lpCounter');
    var progress = document.getElementById('lpProgress');
    var LETTERS = ['A', 'B', 'C', 'D', 'E'];

    function render() {
      var q = QUESTIONS[idx];
      answered = false;
      counter.textContent = (idx + 1) + ' / ' + QUESTIONS.length;
      progress.style.width = ((idx) / QUESTIONS.length * 100) + '%';
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
      btns[correctIdx].classList.add('correct');
      if (i === correctIdx) { score++; } else { btn.classList.add('wrong'); }
      var after = document.getElementById('lpAfter');
      var explain = document.createElement('div');
      explain.className = 'lp-explain';
      explain.innerHTML = '<strong>' + (i === correctIdx ? 'Correct. ' : 'Answer: ' + q.answer + '. ') + '</strong>';
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
      var verdict = pct >= 80 ? 'Strong start — polish the gaps and you are ready.' :
                    pct >= 50 ? 'Solid base — focused practice will close the gap fast.' :
                    'A structured study plan will make a big difference. That is exactly what the book is for.';
      body.innerHTML =
        '<div class="lp-result">' +
          '<div class="lp-score-ring">' + score + '<span class="of"> / ' + QUESTIONS.length + '</span></div>' +
          '<h3>You scored ' + pct + '%</h3>' +
          '<p>' + verdict + ' Want a free ' + EXAM + ' study plan and exclusive launch discounts? Drop your email below.</p>' +
          '<form class="lp-email-form" id="lpEmailForm">' +
            '<input type="email" id="lpEmail" required placeholder="you@example.com" autocomplete="email">' +
            '<button type="submit" class="btn">Send My Study Plan</button>' +
          '</form>' +
          '<div class="lp-email-msg" id="lpEmailMsg"></div>' +
          '<div class="or">— or —</div>' +
          '<a href="#" id="lpRetry" class="btn btn-outline btn-sm" style="color: var(--navy); border-color: var(--navy);">Retake the Quiz</a>' +
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
          body: JSON.stringify({ email: email, accessCode: 'FREE-SAMPLE', book: EXAM + ' sample quiz (' + score + '/' + QUESTIONS.length + ')' }),
        }).then(function () {
          msg.className = 'lp-email-msg ok';
          msg.textContent = 'Done! Check your inbox in the next few minutes.';
        }).catch(function () {
          msg.className = 'lp-email-msg err';
          msg.textContent = 'Something went wrong — please try again.';
        });
      });
    }

    render();
  })();
  </script>
  <script src="/js/floating-unlock.js"></script>
</body>
</html>
`;
}

// --- main -------------------------------------------------------------------

for (const cfg of PAGES) {
  const html = renderPage(cfg);
  fs.writeFileSync(path.join(ROOT, cfg.file), html);
  console.log(`✓ ${cfg.file} (${cfg.exam}) — 10 sample Qs from ${cfg.quizSource}.json`);
}
console.log('\nDone. Remember: node scripts/build-sitemap.js to refresh the sitemap.');
