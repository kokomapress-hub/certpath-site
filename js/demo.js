// Animated test preview on homepage
(function () {
  const questions = [
    {
      q: "A 200-pound object is pushed 10 feet across a flat floor. How much work is done if the pushing force is 80 pounds?",
      choices: ["2,000 ft·lb", "800 ft·lb", "280 ft·lb", "16,000 ft·lb"],
      answer: 1
    },
    {
      q: "Which of Newton's laws explains why you feel pushed back in your seat when a vehicle accelerates?",
      choices: ["First Law", "Second Law", "Third Law", "Law of Gravity"],
      answer: 0
    },
    {
      q: "A first-class lever has the fulcrum positioned:",
      choices: ["At one end, with load and effort on the same side", "Between the load and the effort", "At the load end, with effort at the opposite end", "At the effort end only"],
      answer: 1
    },
    {
      q: "In a series circuit with three 4-ohm resistors connected to a 24V battery, what is the total current?",
      choices: ["6 A", "8 A", "2 A", "12 A"],
      answer: 2
    }
  ];

  const qEl = document.getElementById('demoQuestion');
  const cEl = document.getElementById('demoChoices');
  const pEl = document.getElementById('demoProgress');
  const nEl = document.getElementById('demoQNum');
  const tEl = document.getElementById('demoTimer');
  if (!qEl) return;

  let idx = 0;
  let timerSec = 29 * 60;
  const tick = () => {
    timerSec -= 1;
    if (timerSec < 0) timerSec = 29 * 60;
    const m = Math.floor(timerSec / 60), s = timerSec % 60;
    tEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
  };
  setInterval(tick, 1000);

  function render(i, stage) {
    const item = questions[i];
    qEl.textContent = item.q;
    nEl.textContent = `Question ${i + 1} of ${questions.length}`;
    pEl.style.width = `${((i + 1) / questions.length) * 100}%`;
    cEl.innerHTML = item.choices.map((c, j) => {
      const letter = ['A', 'B', 'C', 'D'][j];
      let cls = 'demo-choice';
      if (stage === 'select' && j === item.answer) cls += ' selected';
      if (stage === 'reveal' && j === item.answer) cls += ' correct';
      return `<div class="${cls}"><span class="demo-letter">${letter}</span><span>${c}</span></div>`;
    }).join('');
  }

  function loop() {
    render(idx, 'idle');
    setTimeout(() => render(idx, 'select'), 1600);
    setTimeout(() => render(idx, 'reveal'), 3000);
    setTimeout(() => {
      idx = (idx + 1) % questions.length;
      loop();
    }, 4800);
  }

  loop();
})();
