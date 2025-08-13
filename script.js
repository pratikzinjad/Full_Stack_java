// ----- Questions -----
const QUESTIONS = [
  {
    topic: "Syntax",
    text: "Which is a correct main method signature in Java?",
    choices: [
      "public void main(String[] args)",
      "public static void main(String[] args)",
      "static public void main(String args)",
      "void main(String... args)"
    ],
    correct: 1,
    explanation:
      "The entry point must be public static void main(String[] args)."
  },
  {
    topic: "Types",
    text: "What is the default value of an uninitialized instance variable of type int?",
    choices: ["0", "null", "Undefined", "NaN"],
    correct: 0,
    explanation:
      "Instance numeric fields default to 0; references default to null."
  },
  {
    topic: "OOP",
    text: "Which keyword is used to inherit a class in Java?",
    choices: ["implements", "extends", "inherits", "super"],
    correct: 1,
    explanation:
      "Classes use extends; interfaces use implements."
  },
  {
    topic: "Control Flow",
    text: "What will be printed?\nint x = 5;\nSystem.out.println(x++);\nSystem.out.println(x);",
    choices: ["5 then 5", "6 then 5", "5 then 6", "6 then 6"],
    correct: 2,
    explanation:
      "Post-increment returns old value then increments; prints 5 then 6."
  },
  {
    topic: "Strings",
    text: "Which compares String content for equality?",
    choices: ["==", "equals()", "compareTo() == 1", "hashCode()"],
    correct: 1,
    explanation:
      "== compares references; equals() compares content."
  },
  {
    topic: "Collections",
    text: "Which interface guarantees unique elements and no order requirement?",
    choices: ["List", "Set", "Queue", "Map"],
    correct: 1,
    explanation:
      "Set contains unique elements and does not define positional access."
  },
  {
    topic: "Exceptions",
    text: "Which is a checked exception?",
    choices: ["NullPointerException", "IOException", "ArithmeticException", "ArrayIndexOutOfBoundsException"],
    correct: 1,
    explanation:
      "IOException is checked; others shown are unchecked."
  },
  {
    topic: "Modifiers",
    text: "Which access modifier makes a member visible only within the same package and subclasses?",
    choices: ["private", "default (no modifier)", "protected", "public"],
    correct: 2,
    explanation:
      "protected allows same package and subclass access."
  },
  {
    topic: "Basics",
    text: "What does the following print?\nSystem.out.println(10/4);",
    choices: ["2.5", "3", "2", "Compilation error"],
    correct: 2,
    explanation:
      "With int operands, 10/4 performs integer division and prints 2."
  },
  {
    topic: "Generics",
    text: "Which is a valid generic method signature?",
    choices: [
      "public <T> void add(T item)",
      "public void <T> add(T item)",
      "public void add<T>(T item)",
      "public <T> T item()"
    ],
    correct: 0,
    explanation:
      "Type parameters come before return type; option 1 is valid."
  }
];

// ----- State -----
let current = 0;
let answers = Array(QUESTIONS.length).fill(null);
let revealed = Array(QUESTIONS.length).fill(false);
let startedAt = null;
let timerId = null;
const LIMIT_SECONDS = 10 * 60;

// ----- Elements -----
const elIntro = document.getElementById('intro');
const elQuiz = document.getElementById('quiz');
const elResult = document.getElementById('result');

const elQNumber = document.getElementById('q-number');
const elQTopic = document.getElementById('q-topic');
const elQText = document.getElementById('q-text');
const elOptions = document.getElementById('options');
const elExplain = document.getElementById('explanation');

const elPrev = document.getElementById('prev-btn');
const elNext = document.getElementById('next-btn');
const elSubmit = document.getElementById('submit-btn');

const elTimer = document.getElementById('timer');
const elProgressFill = document.getElementById('progress-fill');

const elScorePath = document.getElementById('score-path');
const elScorePercent = document.getElementById('score-percent');
const elScoreRaw = document.getElementById('score-raw');
const elScoreBand = document.getElementById('score-band');
const elTimeUsed = document.getElementById('time-used');
const elBreakdown = document.getElementById('breakdown');
const elReview = document.getElementById('review');

const elStart = document.getElementById('start-btn');
const elRetry = document.getElementById('retry-btn');
const elExport = document.getElementById('export-btn');
const elTheme = document.getElementById('theme-toggle');
const elToast = document.getElementById('toast');

// ----- Theme -----
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  elTheme.textContent = '☀️';
}
elTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  elTheme.textContent = dark ? '☀️' : '🌙';
});

// ----- Start -----
elStart.addEventListener('click', () => {
  elIntro.classList.add('hidden');
  elQuiz.classList.remove('hidden');
  startedAt = Date.now();
  startTimer();
  render();
});

// ----- Timer -----
function startTimer() {
  updateTimer();
  timerId = setInterval(() => {
    updateTimer();
    if (remainingSeconds() <= 0) {
      clearInterval(timerId);
      finish();
    }
  }, 1000);
}
function remainingSeconds() {
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, LIMIT_SECONDS - elapsed);
}
function updateTimer() {
  const sec = remainingSeconds();
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  elTimer.textContent = `${mm}:${ss}`;
  const progress = ((QUESTIONS.filter((_, i) => answers[i] !== null).length) / QUESTIONS.length) * 100;
  elProgressFill.style.width = `${progress}%`;
}

// ----- Render -----
function render() {
  const q = QUESTIONS[current];
  elQNumber.textContent = `Question ${current + 1}/${QUESTIONS.length}`;
  elQTopic.textContent = q.topic;
  elQText.textContent = q.text;

  elOptions.innerHTML = '';
  q.choices.forEach((c, idx) => {
    const id = `opt-${current}-${idx}`;
    const wrapper = document.createElement('label');
    wrapper.className = 'option';
    wrapper.htmlFor = id;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q-${current}`;
    input.id = id;
    input.value = idx;

    const text = document.createElement('div');
    text.textContent = c;

    wrapper.appendChild(input);
    wrapper.appendChild(text);
    elOptions.appendChild(wrapper);

    if (answers[current] === idx) input.checked = true;

    wrapper.addEventListener('click', () => {
      answers[current] = idx;
      updateTimer();
    });
  });

  const show = revealed[current];
  elExplain.classList.toggle('hidden', !show);
  elExplain.textContent = show ? q.explanation : '';

  if (show) {
    [...elOptions.children].forEach((opt, idx) => {
      opt.classList.remove('correct', 'incorrect');
      if (idx === q.correct) opt.classList.add('correct');
      if (answers[current] !== null && idx === answers[current] && answers[current] !== q.correct) {
        opt.classList.add('incorrect');
      }
    });
  } else {
    [...elOptions.children].forEach(opt => opt.classList.remove('correct', 'incorrect'));
  }

  elPrev.disabled = current === 0;
  const last = current === QUESTIONS.length - 1;
  elNext.classList.toggle('hidden', last);
  elSubmit.classList.toggle('hidden', !last);
}

// ----- Navigation -----
elPrev.addEventListener('click', () => {
  current = Math.max(0, current - 1);
  render();
});
elNext.addEventListener('click', () => {
  if (answers[current] !== null) revealed[current] = true;
  current = Math.min(QUESTIONS.length - 1, current + 1);
  render();
});
elSubmit.addEventListener('click', () => {
  if (answers[current] !== null) revealed[current] = true;
  finish();
});

// ----- Finish / Scoring -----
function finish() {
  clearInterval(timerId);
  let correct = 0;
  const perTopic = {};
  QUESTIONS.forEach((q, i) => {
    if (!perTopic[q.topic]) perTopic[q.topic] = { total: 0, correct: 0 };
    perTopic[q.topic].total++;
    if (answers[i] === q.correct) {
      perTopic[q.topic].correct++;
      correct++;
    }
  });

  elQuiz.classList.add('hidden');
  elResult.classList.remove('hidden');

  const pct = Math.round((correct / QUESTIONS.length) * 100);
  elScorePath.setAttribute('stroke-dasharray', `${pct},100`);
  elScorePercent.textContent = `${pct}%`;
  elScoreRaw.textContent = `${correct}/${QUESTIONS.length} correct`;
  elScoreBand.textContent = `Band: ${band(pct)}`;
  const used = Math.min(LIMIT_SECONDS, Math.floor((Date.now() - startedAt) / 1000));
  elTimeUsed.textContent = `Time used: ${fmt(used)}`;

  elBreakdown.innerHTML = '';
  Object.entries(perTopic).forEach(([topic, stats]) => {
    const div = document.createElement('div');
    div.className = 'break-card';
    const topicPct = Math.round((stats.correct / stats.total) * 100);
    div.innerHTML = `
      <h4>${topic}</h4>
      <p>${stats.correct}/${stats.total} correct</p>
      <p>Accuracy: ${topicPct}%</p>
    `;
    elBreakdown.appendChild(div);
  });

  elReview.innerHTML = '';
  QUESTIONS.forEach((q, i) => {
    const item = document.createElement('div');
    item.className = 'review-item';
    const user = answers[i];
    const ok = user === q.correct;
    const userText = user === null ? "<em>No answer</em>" : q.choices[user];
    item.innerHTML = `
      <div class="q">${i + 1}. [${q.topic}] ${q.text.replace(/\n/g, '<br/>')}</div>
      <div class="a">Your answer: ${userText} ${ok ? '<span class="ok">✓</span>' : '<span class="bad">✗</span>'}</div>
      <div class="a">Correct: ${q.choices[q.correct]}</div>
      <div class="a">${q.explanation}</div>
    `;
    elReview.appendChild(item);
  });

  const history = JSON.parse(localStorage.getItem('java_basic_results') || '[]');
  history.push({
    date: new Date().toISOString(),
    score: pct,
    correct,
    total: QUESTIONS.length,
    timeUsed: used,
    note: 'Test website (practice only)'
  });
  localStorage.setItem('java_basic_results', JSON.stringify(history));
  showToast('Result saved locally (test site)');
}

function band(pct) {
  if (pct >= 90) return 'Expert';
  if (pct >= 75) return 'Proficient';
  if (pct >= 60) return 'Intermediate';
  if (pct >= 40) return 'Beginner';
  return 'Novice';
}

function fmt(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ----- Export -----
document.getElementById('export-btn').addEventListener('click', () => {
  const lines = [
    'Java Basics Test Website — Practice Result',
    `Date: ${new Date().toLocaleString()}`,
    `Score: ${document.getElementById('score-percent').textContent} (${document.getElementById('score-raw').textContent})`,
    `${document.getElementById('score-band').textContent}`,
    document.getElementById('time-used').textContent,
    '',
    'Note: This is a test/practice website. Results are for learning only.',
    '',
    'Answers:'
  ];
  QUESTIONS.forEach((q, i) => {
    const user = answers[i];
    const ok = user === q.correct ? '✓' : '✗';
    lines.push(`${i + 1}. [${q.topic}] ${q.text.replace(/\n/g, ' / ')}`);
    lines.push(`   Your: ${user === null ? 'No answer' : q.choices[user]} ${ok}`);
    lines.push(`   Correct: ${q.choices[q.correct]}`);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `java_basics_test_result_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported (test site)');
});

// ----- Retry -----
document.getElementById('retry-btn').addEventListener('click', () => {
  current = 0;
  answers = Array(QUESTIONS.length).fill(null);
  revealed = Array(QUESTIONS.length).fill(false);
  startedAt = Date.now();
  if (timerId) clearInterval(timerId);
  startTimer();
  document.getElementById('result').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  render();
});

// ----- Option selection helpers -----
document.getElementById('options').addEventListener('click', (e) => {
  const label = e.target.closest('label.option');
  if (!label) return;
  const input = label.querySelector('input');
  input.checked = true;
  answers[current] = Number(input.value);
  updateTimer();
});

// ----- Toast -----
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  el.classList.remove('hidden');
  setTimeout(() => el.classList.remove('show'), 1800);
}

// ----- Keyboard navigation -----
document.addEventListener('keydown', (e) => {
  const quizVisible = !document.getElementById('quiz').classList.contains('hidden');
  if (!quizVisible) return;
  if (e.key === 'ArrowRight') document.getElementById('next-btn').click();
  if (e.key === 'ArrowLeft') document.getElementById('prev-btn').click();
});

// Initial progress
document.getElementById('progress-fill').style.width = '0%';
