// CertPath Publishing - Quiz Engine
// Loads a book's test data, runs a timed practice test, scores, and shows results.

const STORAGE_KEY = "certpath_unlocked";
const COMPLETED_KEY = "certpath_completed"; // { slug: [testNum, ...] } — tests the user has finished

let book = null;
let bookMeta = null; // books.json entry (carries the `sequential` flag)
let test = null;
let currentIdx = 0;
let answers = {};
let startTime = 0;
let endTime = 0;
let timerInterval = null;
let timeLeft = 0; // seconds

function getUnlocked() {
  // Dev convenience: on localhost, unlock everything so previews need no email or access code.
  // Production hostnames (e.g. certpathpublishing.store) still require a valid code.
  if (['localhost', '127.0.0.1', '0.0.0.0'].includes(location.hostname)) {
    return { slugs: [], isAdmin: true };
  }
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"slugs":[],"isAdmin":false}');
  } catch {
    return { slugs: [], isAdmin: false };
  }
}

function getCompleted() {
  try { return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '{}'); }
  catch { return {}; }
}
function markCompleted(slug, testNum) {
  const all = getCompleted();
  const list = all[slug] || [];
  if (!list.includes(testNum)) { list.push(testNum); all[slug] = list; localStorage.setItem(COMPLETED_KEY, JSON.stringify(all)); }
}

async function init() {
  const params = new URLSearchParams(location.search);
  const slug = params.get('book');
  const testNum = parseInt(params.get('test') || '1', 10);

  if (!slug) {
    showError("No book specified. <a href='/access.html'>Go back</a>");
    return;
  }

  // Check unlock
  const unlocked = getUnlocked();
  if (!unlocked.isAdmin && !unlocked.slugs.includes(slug)) {
    showError("This book is locked. <a href='/access.html'>Enter your access code</a>");
    return;
  }

  // Load book data. Books in books.json may set a `dataSlug` alias when
  // they share a question bank with another book (e.g. sat-math-workbook
  // and sat-math-tests both read sat-math.json). Look that up first.
  let data;
  try {
    let dataSlug = slug;
    try {
      const meta = await (await fetch('/data/books.json')).json();
      const entry = meta.books.find(b => b.slug === slug);
      if (entry) { bookMeta = entry; if (entry.dataSlug) dataSlug = entry.dataSlug; }
    } catch { /* fall back to slug == dataSlug */ }

    const r = await fetch(`/data/${dataSlug}.json`);
    data = await r.json();
  } catch (e) {
    showError("Failed to load book data.");
    return;
  }

  book = data;
  test = data.tests.find(t => t.testNum === testNum);
  if (!test) {
    showError(`Test ${testNum} not found for ${data.title}.`);
    return;
  }

  // Progressive unlock: sequential books require finishing Test N-1 before Test N.
  // Admin / localhost preview bypasses this gate.
  if (bookMeta && bookMeta.sequential && !unlocked.isAdmin && testNum > 1) {
    const done = getCompleted()[slug] || [];
    if (!done.includes(testNum - 1)) {
      showError(
        `<strong>Practice Test ${testNum} is locked.</strong><br>` +
        `Finish <strong>Practice Test ${testNum - 1}</strong> first — the tests unlock in order so you build up to the full exam.` +
        `<br><br><a class="btn" href="/pmp?test=${testNum - 1}">Go to Test ${testNum - 1}</a>`
      );
      return;
    }
  }

  // Calculate per-test time (proportional to total)
  const testTimePerQuestion = (data.timeMinutes * 60) / data.tests.reduce((s, t) => s + t.questions.length, 0);
  timeLeft = Math.round(testTimePerQuestion * test.questions.length);

  // Show start screen
  showStartScreen();
}

function showError(html) {
  document.getElementById('quizApp').innerHTML = `
    <div style="text-align: center; padding: 4rem 2rem;">
      <h2 style="color: var(--error);">Oops</h2>
      <p style="margin-top: 1rem;">${html}</p>
    </div>
  `;
}

function showStartScreen() {
  const minutes = Math.round(timeLeft / 60);
  document.getElementById('quizApp').innerHTML = `
    <header class="header">
      <div class="header-inner">
        <a href="/" class="logo">CertPath <span class="gold">Publishing</span></a>
        <nav class="nav">
          <a href="/access.html">My Tests</a>
        </nav>
      </div>
    </header>
    <div class="container">
      <div class="form-card">
        <h2>${book.title}</h2>
        <p style="text-align: center; color: var(--gray); margin-bottom: 1.5rem;">Practice Test ${test.testNum}</p>

        <div style="background: var(--gray-light); padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: var(--navy); margin-bottom: 0.8rem;">Test Details</h3>
          <p><strong>${test.questions.length}</strong> multiple-choice questions</p>
          <p><strong>${minutes} minutes</strong> total time</p>
          <p>Instant scoring with detailed answer explanations</p>
        </div>

        <div style="background: #FFF7E0; padding: 1.2rem; border-radius: 6px; border-left: 4px solid var(--gold); margin-bottom: 1.5rem;">
          <strong style="color: var(--navy);">Important:</strong>
          <ul style="margin: 0.5rem 0 0 1.2rem; color: var(--gray-dark); font-size: 0.95rem;">
            <li>The timer starts when you click Begin Test</li>
            <li>You can navigate between questions freely</li>
            <li>Test auto-submits when time expires</li>
            <li>Answers and explanations shown after submission</li>
          </ul>
        </div>

        <button class="btn" onclick="startQuiz()" style="width: 100%;">Begin Test</button>
        <a href="/access.html" class="btn btn-outline" style="display: block; text-align: center; margin-top: 0.8rem;">Back to My Tests</a>
      </div>
    </div>
  `;
}

function startQuiz() {
  startTime = Date.now();
  currentIdx = 0;
  answers = {};
  renderQuiz();
  startTimer();
}

function startTimer() {
  updateTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function updateTimer() {
  const el = document.getElementById('timer');
  if (!el) return;
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  el.textContent = `${m}:${String(s).padStart(2, '0')}`;
  if (timeLeft <= 60) el.classList.add('warning');
}

const LETTERS = ['A','B','C','D','E'];

function qPassage(q) {
  if (q.passageIndex == null || !test.passages || !test.passages[q.passageIndex]) return '';
  const p = test.passages[q.passageIndex];
  return `<div class="passage-box"><div class="passage-title">${p.title || 'Passage'}</div><div class="passage-text">${p.text}</div></div>`;
}
function qFigure(q) {
  return q.image ? `<div class="q-figure"><img src="${q.image}" alt="Question figure" loading="lazy"></div>` : '';
}
// ---- item-type helpers (single-response is the default; multi-response added) ----
function isMulti(q) { return q.type === 'multi'; }
function normSet(s) { return (s || '').split(',').map(x => x.trim()).filter(Boolean).sort().join(','); }
function isCorrect(q, ans) {
  if (ans == null || ans === '') return false;
  if (isMulti(q)) return normSet(ans) === normSet(q.answer);
  return ans === q.answer;
}
function multiHint(q) {
  if (!isMulti(q)) return '';
  const n = normSet(q.answer).split(',').length;
  const word = n === 2 ? 'TWO' : n === 3 ? 'THREE' : 'all that apply';
  return `<div class="multi-hint" style="font-size:0.9rem;color:var(--navy);font-style:italic;margin:.25rem 0 .5rem;">Select ${word}.</div>`;
}

function renderQuiz() {
  const q = test.questions[currentIdx];
  const total = test.questions.length;
  const progress = ((currentIdx + 1) / total) * 100;
  const selected = answers[q.num];

  document.getElementById('quizApp').innerHTML = `
    <div class="quiz-header">
      <h2>${book.title} <span class="gold">/ Test ${test.testNum}</span></h2>
      <div class="timer" id="timer">--:--</div>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width: ${progress}%"></div></div>

    <div class="quiz-container">
      <div class="question-card">
        <div class="question-num">Question ${currentIdx + 1} of ${total}</div>
        ${qPassage(q)}
        <div class="question-text">${q.question}</div>
        ${qFigure(q)}
        ${multiHint(q)}
        <div class="choices">
          ${q.choices.map((c, i) => {
            const letter = LETTERS[i];
            if (isMulti(q)) {
              const sel = normSet(selected).split(',').includes(letter);
              return `<div class="${sel ? 'choice selected' : 'choice'}" onclick="toggleMulti('${letter}')">
                <span class="letter">${sel ? '&#9745;' : '&#9744;'} ${letter}</span>
                <span>${c}</span>
              </div>`;
            }
            const cls = selected === letter ? 'choice selected' : 'choice';
            return `<div class="${cls}" onclick="selectAnswer('${letter}')">
              <span class="letter">${letter}</span>
              <span>${c}</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="quiz-controls">
        <button class="btn btn-outline" ${currentIdx === 0 ? 'disabled' : ''} onclick="prevQ()">&larr; Previous</button>
        <span style="color: var(--gray); font-size: 0.9rem;">
          ${Object.keys(answers).length} / ${total} answered
        </span>
        ${currentIdx === total - 1
          ? `<button class="btn" onclick="confirmSubmit()">Submit Test</button>`
          : `<button class="btn" onclick="nextQ()">Next &rarr;</button>`
        }
      </div>
    </div>
  `;
  updateTimer();
}

function selectAnswer(letter) {
  const q = test.questions[currentIdx];
  answers[q.num] = letter;
  renderQuiz();
}

function toggleMulti(letter) {
  const q = test.questions[currentIdx];
  let set = normSet(answers[q.num]).split(',').filter(Boolean);
  set = set.includes(letter) ? set.filter(x => x !== letter) : set.concat(letter);
  const val = set.sort().join(',');
  if (val) answers[q.num] = val; else delete answers[q.num];
  renderQuiz();
}

function nextQ() {
  if (currentIdx < test.questions.length - 1) {
    currentIdx++;
    renderQuiz();
  }
}

function prevQ() {
  if (currentIdx > 0) {
    currentIdx--;
    renderQuiz();
  }
}

function confirmSubmit() {
  const total = test.questions.length;
  const answered = Object.keys(answers).length;
  const unanswered = total - answered;
  let msg = "Submit your test now? You won't be able to change answers after this.";
  if (unanswered > 0) {
    msg = `You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit anyway?`;
  }
  if (confirm(msg)) submitQuiz();
}

function submitQuiz() {
  endTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  // Record completion so the next test in a sequential book unlocks.
  if (book && test) markCompleted(book.slug, test.testNum);
  showResults();
}

function showResults() {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  test.questions.forEach(q => {
    const ans = answers[q.num];
    if (!ans) unanswered++;
    else if (isCorrect(q, ans)) correct++;
    else wrong++;
  });
  const total = test.questions.length;
  const pct = Math.round((correct / total) * 100);
  const elapsedSec = Math.round((endTime - startTime) / 1000);
  const elapsedM = Math.floor(elapsedSec / 60);
  const elapsedS = elapsedSec % 60;
  const passed = pct >= 70;

  document.getElementById('quizApp').innerHTML = `
    <header class="header">
      <div class="header-inner">
        <a href="/" class="logo">CertPath <span class="gold">Publishing</span></a>
        <nav class="nav"><a href="/access.html">My Tests</a></nav>
      </div>
    </header>

    <div class="container">
      <div class="results-card">
        <h2>${passed ? 'Great Work!' : 'Keep Practicing'}</h2>
        <p style="color: var(--gray);">${book.title} -- Test ${test.testNum}</p>

        <div class="score-display">
          ${correct}<span class="total"> / ${total}</span>
        </div>
        <p style="font-size: 1.5rem; color: var(--navy); font-weight: 700;">${pct}%</p>

        <div class="results-stats">
          <div class="stat-box">
            <div class="label">Correct</div>
            <div class="value" style="color: var(--success);">${correct}</div>
          </div>
          <div class="stat-box">
            <div class="label">Wrong</div>
            <div class="value" style="color: var(--error);">${wrong}</div>
          </div>
          <div class="stat-box">
            <div class="label">Time Used</div>
            <div class="value">${elapsedM}:${String(elapsedS).padStart(2,'0')}</div>
          </div>
        </div>

        <p style="margin: 1.5rem 0; color: var(--gray-dark);">
          ${passed
            ? "You passed! Review the answers below to reinforce your knowledge."
            : "Below the passing threshold. Review every wrong answer carefully."}
        </p>

        <button class="btn" onclick="showReview()">Review All Answers</button>
        <a href="/access.html" class="btn btn-outline" style="margin-left: 0.5rem;">Back to My Tests</a>
      </div>
    </div>
  `;
}

function showReview() {
  const html = test.questions.map((q, i) => {
    const userAns = answers[q.num];
    const correct = isCorrect(q, userAns);
    const noAnswer = !userAns;
    const ansSet = normSet(q.answer).split(',');
    const userSet = normSet(userAns).split(',');
    return `
      <div class="question-card">
        <div class="question-num">Question ${i + 1} ${noAnswer ? '(Not Answered)' : correct ? '✓ Correct' : '✗ Incorrect'}</div>
        ${qPassage(q)}
        <div class="question-text">${q.question}</div>
        ${qFigure(q)}
        ${multiHint(q)}
        <div class="choices">
          ${q.choices.map((c, j) => {
            const letter = LETTERS[j];
            let cls = 'choice';
            if (ansSet.includes(letter)) cls = 'choice correct';
            else if (userSet.includes(letter)) cls = 'choice wrong';
            return `<div class="${cls}">
              <span class="letter">${letter}</span>
              <span>${c}</span>
            </div>`;
          }).join('')}
        </div>
        ${q.explanation ? `<div class="explanation show"><strong>Explanation:</strong> ${q.explanation}</div>` : ''}
      </div>
    `;
  }).join('');

  document.getElementById('quizApp').innerHTML = `
    <header class="header">
      <div class="header-inner">
        <a href="/" class="logo">CertPath <span class="gold">Publishing</span></a>
        <nav class="nav"><a href="/access.html">My Tests</a></nav>
      </div>
    </header>
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="color: var(--navy);">Test Review</h2>
        <div>
          <button class="btn btn-outline" onclick="showResults()">Back to Results</button>
          <a href="/quiz?book=${book.slug}&test=${test.testNum}" class="btn">Retake Test</a>
        </div>
      </div>
      <div class="quiz-container">${html}</div>
    </div>
  `;
}

// Boot
init();
