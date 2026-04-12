// ===== CERTPATH Quiz Engine =====

class CertPathQuiz {
  constructor(containerId, questionsUrl, options = {}) {
    this.container = document.getElementById(containerId);
    this.questionsUrl = questionsUrl;
    this.timerEnabled = options.timer !== false;
    this.timeLimit = options.timeLimit || 30 * 60; // 30 min default
    this.questions = [];
    this.answers = {};
    this.timeRemaining = this.timeLimit;
    this.timerInterval = null;
    this.submitted = false;

    this.init();
  }

  async init() {
    // Check access
    if (!this.checkAccess()) return;

    // Load questions
    try {
      const resp = await fetch(this.questionsUrl);
      this.questions = await resp.json();
    } catch (err) {
      this.container.innerHTML = '<p style="color:var(--accent);text-align:center;padding:40px;">Failed to load questions. Please refresh the page.</p>';
      return;
    }

    this.render();
    if (this.timerEnabled) this.startTimer();
  }

  checkAccess() {
    const access = JSON.parse(localStorage.getItem('certpath_access') || '{}');
    const bookSlug = window.location.pathname.split('/')[1];

    if (!access.email || !access.books || !access.books.includes(bookSlug)) {
      this.container.innerHTML = `
        <div style="text-align:center;padding:60px 20px;">
          <h2 style="color:var(--primary);margin-bottom:12px;">Access Required</h2>
          <p style="color:var(--text-light);margin-bottom:24px;">
            Enter your book access code to unlock these practice tests.
          </p>
          <a href="/access/" class="btn btn-accent">Enter Access Code</a>
        </div>`;
      return false;
    }
    return true;
  }

  render() {
    const questionsHTML = this.questions.map((q, i) => `
      <div class="question-card" id="q${i}">
        <div class="question-number">Question ${i + 1} of ${this.questions.length}</div>
        <div class="question-text">${q.question}</div>
        <ul class="options-list">
          ${q.options.map((opt, j) => `
            <li onclick="quiz.selectAnswer(${i}, ${j})" id="q${i}o${j}">${opt}</li>
          `).join('')}
        </ul>
        <div class="explanation" id="exp${i}">${q.explanation || ''}</div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="quiz-header">
        <h1>${this.questions.length} Questions</h1>
        ${this.timerEnabled ? `<div class="quiz-timer" id="quizTimer">${this.formatTime(this.timeRemaining)}</div>` : ''}
      </div>
      <div class="quiz-progress">
        <div class="quiz-progress-bar" id="progressBar" style="width:0%"></div>
      </div>
      <div id="questionsArea">${questionsHTML}</div>
      <div style="text-align:center;margin-top:32px;">
        <button class="btn btn-accent btn-lg" onclick="quiz.submit()" id="submitBtn">Submit Test</button>
      </div>
    `;
  }

  selectAnswer(questionIdx, optionIdx) {
    if (this.submitted) return;

    // Clear previous selection for this question
    const q = this.questions[questionIdx];
    q.options.forEach((_, j) => {
      document.getElementById(`q${questionIdx}o${j}`).classList.remove('selected');
    });

    // Set new selection
    document.getElementById(`q${questionIdx}o${optionIdx}`).classList.add('selected');
    this.answers[questionIdx] = optionIdx;

    // Update progress
    const answered = Object.keys(this.answers).length;
    const pct = (answered / this.questions.length) * 100;
    document.getElementById('progressBar').style.width = pct + '%';

    // Mark question card
    document.getElementById(`q${questionIdx}`).classList.add('answered');
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;

      const timerEl = document.getElementById('quizTimer');
      if (timerEl) {
        timerEl.textContent = this.formatTime(this.timeRemaining);
        if (this.timeRemaining <= 60) timerEl.classList.add('warning');
      }

      if (this.timeRemaining <= 0) {
        this.submit();
      }
    }, 1000);
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  submit() {
    if (this.submitted) return;
    this.submitted = true;

    if (this.timerInterval) clearInterval(this.timerInterval);

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    this.questions.forEach((q, i) => {
      const card = document.getElementById(`q${i}`);
      const userAnswer = this.answers[i];

      if (userAnswer === undefined) {
        unanswered++;
        // Highlight correct answer
        document.getElementById(`q${i}o${q.correct}`).classList.add('correct-answer');
      } else if (userAnswer === q.correct) {
        correct++;
        card.classList.add('correct');
        document.getElementById(`q${i}o${userAnswer}`).classList.add('correct-answer');
      } else {
        wrong++;
        card.classList.add('incorrect');
        document.getElementById(`q${i}o${userAnswer}`).classList.add('wrong-answer');
        document.getElementById(`q${i}o${q.correct}`).classList.add('correct-answer');
      }

      // Show explanation
      const expEl = document.getElementById(`exp${i}`);
      if (expEl && q.explanation) expEl.classList.add('show');

      // Disable clicking
      q.options.forEach((_, j) => {
        document.getElementById(`q${i}o${j}`).style.cursor = 'default';
      });
    });

    const score = Math.round((correct / this.questions.length) * 100);
    const timeTaken = this.timeLimit - this.timeRemaining;

    // Hide submit button, show results
    document.getElementById('submitBtn').style.display = 'none';

    const resultsHTML = `
      <div class="results-card">
        <div class="results-score">${score}%</div>
        <h2>${score >= 70 ? 'Great Job!' : score >= 50 ? 'Keep Studying!' : 'More Practice Needed'}</h2>
        <p>You completed the test in ${this.formatTime(timeTaken)}</p>
        <div class="results-breakdown">
          <div class="results-stat">
            <div class="number" style="color:var(--success)">${correct}</div>
            <div class="label">Correct</div>
          </div>
          <div class="results-stat">
            <div class="number" style="color:var(--accent)">${wrong}</div>
            <div class="label">Wrong</div>
          </div>
          <div class="results-stat">
            <div class="number">${unanswered}</div>
            <div class="label">Skipped</div>
          </div>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="location.reload()">Retake Test</button>
          <a href="/${window.location.pathname.split('/')[1]}/" class="btn btn-outline" style="border-color:var(--primary);color:var(--primary);">Back to Book</a>
        </div>
      </div>
    `;

    // Scroll to top and prepend results
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('questionsArea').insertAdjacentHTML('beforebegin', resultsHTML);
  }
}

// Global reference for onclick handlers
let quiz;
