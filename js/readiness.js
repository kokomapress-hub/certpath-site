// CertPath Publishing — Exam Readiness Diagnostic
// A free, no-login 15-question readiness check drawn from a domain-tagged master
// bank. Serves a balanced draw per attempt (see READINESS_CONFIG.serve), shows an
// instant domain-by-domain breakdown with a neutral readiness band (no pass/fail),
// recommends a next step, then optionally captures email for a detailed report.
// Explanations are shown only on the "Review my answers" page, not mid-quiz.

(function () {
  var LETTERS = ['A', 'B', 'C', 'D', 'E'];
  var CFG = window.READINESS_CONFIG || {};
  var app = document.getElementById('readyApp');
  if (!app) return;

  // Neutral score bands (0-15). Never PASS/FAIL, never a predicted exam result.
  var BANDS = [
    { min: 13, label: 'Strong Diagnostic Performance', color: '#1a7f4b', bg: '#e5f4ec' },
    { min: 10, label: 'Solid Foundation', color: '#0B1529', bg: '#e7edf7' },
    { min: 6, label: 'Building Your Knowledge', color: '#8a5a00', bg: '#fbf0d8' },
    { min: 0, label: 'Foundation Stage', color: '#7a3b12', bg: '#f7e6da' }
  ];
  function band(score) { for (var i = 0; i < BANDS.length; i++) if (score >= BANDS[i].min) return BANDS[i]; return BANDS[BANDS.length - 1]; }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function fail(msg) {
    app.innerHTML = '<div class="lp-quiz-wrap" style="text-align:center;padding:3rem 1rem;">' +
      '<h2 style="color:var(--navy);">' + esc(msg) + '</h2>' +
      '<p style="margin:1rem 0 1.5rem;color:var(--gray-500);">Try our free practice instead.</p>' +
      '<a href="/pmp" class="btn btn-lg">Explore PMP prep</a></div>';
  }

  // UTM params travel from the YouTube link / ad into the lead record for attribution.
  function utm() {
    var p = new URLSearchParams(location.search), o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
      var v = p.get(k); if (v) o[k] = v.slice(0, 80);
    });
    return o;
  }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // Pick n items from a domain pool while MAXIMIZING spread across ECO tasks, so a
  // single attempt cannot serve three items of the same task (e.g. three value items).
  function pickSpread(pool, n) {
    var byTask = {};
    shuffle(pool).forEach(function (q) { (byTask[q.task || q.topic || '_'] = byTask[q.task || q.topic || '_'] || []).push(q); });
    var tasks = shuffle(Object.keys(byTask));
    var out = [];
    while (out.length < n) {
      var progressed = false;
      for (var t = 0; t < tasks.length && out.length < n; t++) {
        var g = byTask[tasks[t]];
        if (g && g.length) { out.push(g.shift()); progressed = true; }
      }
      if (!progressed) break;
    }
    return out;
  }

  // Nudge the drawn set toward ~40% predictive (5-7 of 15), which the July-2026 ECO
  // specifies (~40% predictive, ~60% adaptive/hybrid). Swaps stay within a domain so
  // the balanced 5/6/4 domain mix is preserved.
  function balancePredictive(byDom, serve, picked) {
    var LOW = 5, HIGH = 7, guard = 0;
    function pc() { return picked.filter(function (q) { return q.approach === 'predictive'; }).length; }
    function remaining(dom) { var ids = {}; picked.forEach(function (q) { ids[q.id] = 1; }); return (byDom[dom] || []).filter(function (q) { return !ids[q.id]; }); }
    // Choose a replacement, preferring one whose ECO task is not already served this
    // attempt, so predictive-balancing swaps never introduce a duplicate task family.
    function chooseRepl(cands, replacingIdx) {
      var served = {}; picked.forEach(function (q, n) { if (n !== replacingIdx) served[q.domain + '|' + q.task] = 1; });
      var fresh = cands.filter(function (q) { return !served[q.domain + '|' + q.task]; });
      var pool = fresh.length ? fresh : cands;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    while (pc() < LOW && guard++ < 60) {
      var did = false;
      for (var d in serve) {
        var rem = remaining(d).filter(function (q) { return q.approach === 'predictive'; });
        var idx = -1; for (var k = 0; k < picked.length; k++) { if (picked[k].domain === d && picked[k].approach !== 'predictive') { idx = k; break; } }
        if (rem.length && idx >= 0) { picked[idx] = chooseRepl(rem, idx); did = true; break; }
      }
      if (!did) break;
    }
    while (pc() > HIGH && guard++ < 120) {
      var did2 = false;
      for (var d2 in serve) {
        var rem2 = remaining(d2).filter(function (q) { return q.approach !== 'predictive'; });
        var idx2 = -1; for (var k2 = 0; k2 < picked.length; k2++) { if (picked[k2].domain === d2 && picked[k2].approach === 'predictive') { idx2 = k2; break; } }
        if (rem2.length && idx2 >= 0) { picked[idx2] = chooseRepl(rem2, idx2); did2 = true; break; }
      }
      if (!did2) break;
    }
    return picked;
  }

  // Balanced, task-stratified draw: N per domain (serve), spread across ECO tasks,
  // nudged to ~40% predictive, then shuffled into presentation order.
  function drawQuestions(bank) {
    var serve = CFG.serve || { people: 5, process: 6, business: 4 };
    var byDom = {};
    bank.forEach(function (q) { (byDom[q.domain] = byDom[q.domain] || []).push(q); });
    var picked = [];
    Object.keys(serve).forEach(function (dom) {
      picked = picked.concat(pickSpread(byDom[dom] || [], serve[dom]));
    });
    picked = balancePredictive(byDom, serve, picked);
    return shuffle(picked);
  }

  function run(bank) {
    var exam = CFG.exam || 'Exam';
    var domLabel = CFG.domainLabel || {};
    var QUESTIONS = drawQuestions(bank);
    var TOTAL = QUESTIONS.length;
    var idx = 0;
    var answers = [];           // {q, chosenIdx, correctIdx, domain}
    var UTM = utm();

    startScreen();

    function startScreen() {
      app.innerHTML =
        '<div class="lp-quiz-wrap"><div class="rd-start">' +
          '<div class="eyebrow">Free · No account · No card</div>' +
          '<h2>' + esc(exam) + ' Readiness Check</h2>' +
          '<p style="max-width:560px;margin:.6rem auto 0;color:var(--gray-500)">How ready is your ' + esc(exam) +
            ' knowledge? Answer ' + TOTAL + ' exam-style questions and get an instant, domain-by-domain breakdown of where you stand.</p>' +
          '<div class="rd-facts"><span><b>' + TOTAL + '</b> questions</span><span><b>~10</b> minutes</span><span><b>Instant</b> domain breakdown</span></div>' +
          '<button class="btn btn-lg" id="rdStart">Start the free check →</button>' +
          '<p class="rd-disc">This short diagnostic is designed to identify areas for further study. It is not a prediction of your ' + esc(exam) + ' examination result.</p>' +
        '</div></div>';
      document.getElementById('rdStart').addEventListener('click', function () { idx = 0; answers = []; render(); });
    }

    function frame(bodyHTML) {
      app.innerHTML =
        '<div class="lp-quiz-wrap">' +
          '<div class="lp-quiz-frame">' +
            '<div class="lp-quiz-top">' +
              '<div class="crumb">' + esc(exam) + ' · Readiness Check</div>' +
              '<div class="crumb" id="rdCounter">' + Math.min(idx + 1, TOTAL) + ' / ' + TOTAL + '</div>' +
            '</div>' +
            '<div class="lp-quiz-progress"><div class="lp-quiz-progress-fill" id="rdProgress" style="width:' + (idx / TOTAL * 100) + '%"></div></div>' +
            '<div class="lp-quiz-body" id="rdBody">' + bodyHTML + '</div>' +
          '</div>' +
        '</div>';
    }

    // ---- Quiz (no mid-quiz explanation; Next enables once an option is chosen) ----
    function render() {
      var q = QUESTIONS[idx];
      var chosen = null;
      frame('<div class="lp-qnum">Question ' + (idx + 1) + ' of ' + TOTAL + '</div>' +
        '<div class="lp-question"></div><div id="rdChoices"></div>' +
        '<div id="rdAfter" style="margin-top:1.25rem"></div>');
      document.getElementById('rdBody').querySelector('.lp-question').textContent = q.question;
      var wrap = document.getElementById('rdChoices');
      q.choices.forEach(function (c, i) {
        var btn = document.createElement('button');
        btn.className = 'lp-choice';
        btn.type = 'button';
        btn.innerHTML = '<span class="letter">' + LETTERS[i] + '</span><span></span>';
        btn.querySelector('span:last-child').textContent = c;
        btn.addEventListener('click', function () {
          chosen = i;
          wrap.querySelectorAll('.lp-choice').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          nextBtn.disabled = false;
        });
        wrap.appendChild(btn);
      });
      var after = document.getElementById('rdAfter');
      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn lp-next';
      nextBtn.disabled = true;
      nextBtn.textContent = idx === TOTAL - 1 ? 'See my results' : 'Next question';
      nextBtn.addEventListener('click', function () {
        if (chosen === null) return;
        answers.push({ q: q, chosenIdx: chosen, correctIdx: LETTERS.indexOf(q.answer), domain: q.domain });
        idx++;
        if (idx < TOTAL) render(); else results();
      });
      after.appendChild(nextBtn);
    }

    // ---- Results: score + neutral band + domain breakdown + next step ----
    function domainStats() {
      var st = {};
      answers.forEach(function (a) {
        var d = st[a.domain] = st[a.domain] || { correct: 0, total: 0 };
        d.total++; if (a.chosenIdx === a.correctIdx) d.correct++;
      });
      return st;
    }

    function results() {
      var score = answers.filter(function (a) { return a.chosenIdx === a.correctIdx; }).length;
      var b = band(score);
      var st = domainStats();
      var doms = Object.keys(st);
      // strongest = highest %, priority = lowest %
      var ranked = doms.slice().sort(function (x, y) { return (st[y].correct / st[y].total) - (st[x].correct / st[x].total); });
      var strongest = ranked[0], priority = ranked[ranked.length - 1];

      var rows = doms.map(function (d) {
        var pct = Math.round(st[d].correct / st[d].total * 100);
        var tag = d === strongest ? '<span class="rd-tag strong">Strongest</span>' : d === priority ? '<span class="rd-tag priority">Focus here</span>' : '';
        return '<div class="rd-dom"><div class="rd-name">' + esc(domLabel[d] || d) + '</div>' +
          '<div class="rd-bar"><span style="width:' + pct + '%"></span></div>' +
          '<div class="rd-val">' + st[d].correct + '/' + st[d].total + '</div></div>' +
          (tag ? '<div style="margin:-.2rem 0 .5rem 172px">' + tag + '</div>' : '');
      }).join('');

      frame(
        '<div class="lp-result" style="text-align:center">' +
          '<div class="eyebrow">Your ' + esc(exam) + ' readiness snapshot</div>' +
          '<div class="lp-score-ring">' + score + '<span class="of"> / ' + TOTAL + '</span></div>' +
          '<div class="rd-band" style="color:' + b.color + ';background:' + b.bg + '">' + b.label + '</div>' +
          '<div style="max-width:600px;margin:1.4rem auto 0;text-align:left">' + rows + '</div>' +
          '<p style="margin:1.3rem auto .2rem;max-width:600px">Your strongest area is <strong>' + esc(domLabel[strongest] || strongest) +
            '</strong>. Put your next study hours into <strong>' + esc(domLabel[priority] || priority) + '</strong>.</p>' +
          '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:1.6rem 0 .4rem">' +
            '<a class="btn btn-lg" href="' + CFG.freeExamUrl + '">Take the free full-length exam →</a>' +
            '<a class="btn btn-outline" href="' + CFG.lessonsUrl + '" target="_blank" rel="noopener" style="color:var(--navy);border-color:var(--navy)">Watch free ' + esc(exam) + ' lessons</a>' +
          '</div>' +
          '<a href="#" id="rdReview" class="lp-textlink" style="display:inline-block;margin-top:.6rem">Review my answers &amp; explanations →</a>' +
          '<hr style="border:0;border-top:1px solid var(--line);margin:1.8rem 0">' +
          segmentHTML(score) +
          '<p class="rd-disc">This short diagnostic identifies areas for further study. It is not a prediction of your ' + esc(exam) + ' examination result.</p>' +
        '</div>');

      document.getElementById('rdCounter').textContent = 'Done';
      document.getElementById('rdProgress').style.width = '100%';
      document.getElementById('rdReview').addEventListener('click', function (e) { e.preventDefault(); review(); });
      wireSegment(score, st, priority);
    }

    // ---- Segmentation + email capture (shown AFTER the core result) ----
    function segmentHTML(score) {
      return '<div class="rd-seg" style="max-width:560px;margin:0 auto;text-align:left">' +
        '<h3 style="text-align:center">Get your detailed report + a study plan</h3>' +
        '<p style="text-align:center;color:var(--gray-500);font-size:.95rem">We’ll email your domain breakdown with recommended next steps. Two quick questions help us tailor it.</p>' +
        '<label for="rdTiming" style="border:0;padding:0;font-weight:600">When are you planning to take your ' + esc(exam) + ' exam?</label>' +
        '<select id="rdTiming"><option value="">Select…</option><option>Within 2 weeks</option><option>2–4 weeks</option><option>1–2 months</option><option>More than 2 months</option><option>Not scheduled yet</option></select>' +
        '<label for="rdPrep" style="border:0;padding:0;font-weight:600">What are you using to prepare?</label>' +
        '<select id="rdPrep"><option value="">Select…</option><option>CertPath book</option><option>Another study guide</option><option>A video course</option><option>Practice questions</option><option>PMI resources</option><option>Just starting</option></select>' +
        '<form class="lp-email-form" id="rdEmailForm" style="margin-top:.4rem">' +
          '<input type="email" id="rdEmail" required placeholder="you@example.com" autocomplete="email">' +
          '<button type="submit" class="btn">Email me my report</button>' +
        '</form>' +
        '<div class="lp-email-msg" id="rdEmailMsg"></div>' +
        '<div id="rdOwner"></div>' +
      '</div>';
    }

    function wireSegment(score, st, priority) {
      var prep = document.getElementById('rdPrep');
      // If they own a CertPath book, surface the book-owner path (unlock what they own),
      // not the full Complete System — a book owner already has the practice exams.
      prep.addEventListener('change', function () {
        var owner = document.getElementById('rdOwner');
        if (prep.value === 'CertPath book') {
          owner.innerHTML = '<div style="margin-top:1rem;padding:1rem;border:1.5px solid var(--navy);border-radius:12px;text-align:center">' +
            '<strong>You already own CertPath ' + esc(exam) + '.</strong><br>Your book code unlocks the full-length online practice exams — no need to buy them again.' +
            '<div style="margin-top:.7rem"><a class="btn" href="' + CFG.accessUrl + '">Enter my access code →</a></div></div>';
        } else { owner.innerHTML = ''; }
      });
      document.getElementById('rdEmailForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('rdEmail').value.trim();
        var msg = document.getElementById('rdEmailMsg');
        if (!email) return;
        var payload = {
          email: email,
          accessCode: 'READINESS',
          book: (CFG.subscribeBook || 'readiness') + ' (' + score + '/' + TOTAL + ', focus:' + priority + ')',
          diagnostic: {
            exam: exam, score: score, total: TOTAL,
            timing: document.getElementById('rdTiming').value || '',
            prep: prep.value || '', priority: priority
          },
          utm: UTM
        };
        fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
          .then(function () { msg.className = 'lp-email-msg ok'; msg.textContent = 'Done! Your detailed report is on its way — check your inbox shortly.'; })
          .catch(function () { msg.className = 'lp-email-msg err'; msg.textContent = 'Something went wrong — please try again.'; });
      });
    }

    // ---- Review page: learner answer, correct answer, explanation ----
    function review() {
      var html = '<div class="lp-qnum">Review — ' + TOTAL + ' questions</div>';
      answers.forEach(function (a, n) {
        var ok = a.chosenIdx === a.correctIdx;
        html += '<div style="text-align:left;margin:0 0 1.4rem;padding:1rem;border:1px solid var(--line);border-radius:12px">' +
          '<div style="font-weight:700;color:var(--navy);margin-bottom:.5rem">Q' + (n + 1) + ' · ' + esc(domLabel[a.domain] || a.domain) +
            ' <span style="float:right;color:' + (ok ? '#1a7f4b' : '#c0392b') + '">' + (ok ? '✓ Correct' : '✗ Incorrect') + '</span></div>' +
          '<div style="margin-bottom:.6rem">' + esc(a.q.question) + '</div>' +
          '<div style="font-size:.94rem;margin-bottom:.3rem"><strong>Your answer:</strong> ' + esc(a.q.choices[a.chosenIdx]) + '</div>' +
          (ok ? '' : '<div style="font-size:.94rem;margin-bottom:.3rem"><strong>Correct answer:</strong> ' + esc(a.q.choices[a.correctIdx]) + '</div>') +
          '<div style="font-size:.92rem;color:var(--gray-600, #3a4a5e)"><strong>Why:</strong> ' + esc(a.q.explanation) + '</div>' +
        '</div>';
      });
      html += '<div style="text-align:center;margin-top:1rem"><a class="btn btn-lg" href="' + CFG.freeExamUrl + '">Take the free full-length exam →</a>' +
        '<div style="margin-top:.7rem"><a href="#" id="rdRetake" class="lp-textlink">Retake the readiness check</a></div></div>';
      frame(html);
      document.getElementById('rdCounter').textContent = 'Review';
      document.getElementById('rdProgress').style.width = '100%';
      document.getElementById('rdRetake').addEventListener('click', function (e) { e.preventDefault(); QUESTIONS = drawQuestions(bank); idx = 0; answers = []; render(); });
    }
  }

  // ---- boot ----
  if (!CFG.bank) { fail('This readiness check is not configured.'); return; }
  fetch(CFG.bank).then(function (r) { if (!r.ok) throw new Error('bank'); return r.json(); })
    .then(function (data) {
      var bank = Array.isArray(data) ? data : (data.questions || []);
      var serve = CFG.serve || {};
      var ok = Object.keys(serve).every(function (d) { return bank.filter(function (q) { return q.domain === d; }).length >= serve[d]; });
      if (!bank.length || !ok) { fail('This readiness check is not available yet.'); return; }
      run(bank);
    })
    .catch(function () { fail('We could not load the readiness check right now.'); });
})();
