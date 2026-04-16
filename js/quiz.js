// CertPath Publishing - Quiz Engine
// Loads a book's test data, runs a timed practice test, scores, and shows results.

const STORAGE_KEY = "certpath_unlocked";

let book = null;
let test = null;
let currentIdx = 0;
let answers = {};
let startTime = 0;
let endTime = 0;
let timerInterval = null;
let timeLeft = 0; // seconds

function getUnlocked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"slugs":[],"isAdmin":false}');
  } catch {
    return { slugs: [], isAdmin: false };
  }
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

  // Load book data
  let data;
  try {
    const r = await fetch(`/data/${slug}.json`);
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
        <div class="question-text">${q.question}</div>
        <div class="choices">
          ${q.choices.map((c, i) => {
            const letter = ['A','B','C','D'][i];
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
  showResults();
}

function showResults() {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  test.questions.forEach(q => {
    const ans = answers[q.num];
    if (!ans) unanswered++;
    else if (ans === q.answer) correct++;
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
    const correct = userAns === q.answer;
    const noAnswer = !userAns;
    return `
      <div class="question-card">
        <div class="question-num">Question ${i + 1} ${noAnswer ? '(Not Answered)' : correct ? '✓ Correct' : '✗ Incorrect'}</div>
        <div class="question-text">${q.question}</div>
        <div class="choices">
          ${q.choices.map((c, j) => {
            const letter = ['A','B','C','D'][j];
            let cls = 'choice';
            if (letter === q.answer) cls = 'choice correct';
            else if (letter === userAns && !correct) cls = 'choice wrong';
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
