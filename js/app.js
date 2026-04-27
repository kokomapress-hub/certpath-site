// CertPath Publishing - Access code validation + book unlock + bonus content

const STORAGE_KEY = "certpath_unlocked";
const EMAIL_KEY = "certpath_email";
const BONUS_KEY = "certpath_bonus";

// Replace with your Formspree / Basin / Pages Function endpoint that accepts
// multipart/form-data with fields: email, book, file (review screenshot).
// Leave as "" to skip upload and rely on local confirmation only (trust-based).
window.REVIEW_UPLOAD_ENDPOINT = window.REVIEW_UPLOAD_ENDPOINT || "";

let booksData = null;

async function loadBooks() {
  if (booksData) return booksData;
  const r = await fetch('/data/books.json');
  booksData = await r.json();
  return booksData;
}

function getUnlocked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"slugs":[],"isAdmin":false}'); }
  catch { return { slugs: [], isAdmin: false }; }
}
function setUnlocked(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
function getEmail() { return localStorage.getItem(EMAIL_KEY) || ""; }
function setEmail(e) { localStorage.setItem(EMAIL_KEY, e); }

function getBonusUnlocked() {
  try { return JSON.parse(localStorage.getItem(BONUS_KEY) || '{}'); }
  catch { return {}; }
}
function setBonusUnlocked(slug) {
  const b = getBonusUnlocked();
  b[slug] = { unlockedAt: new Date().toISOString() };
  localStorage.setItem(BONUS_KEY, JSON.stringify(b));
}

async function validateCode(code) {
  const data = await loadBooks();
  const cleanCode = code.toUpperCase().trim();
  if (cleanCode === data.adminCode) {
    return { success: true, isAdmin: true, books: data.books, message: "Admin access granted." };
  }
  const book = data.books.find(b => b.code.toUpperCase() === cleanCode);
  if (book) return { success: true, isAdmin: false, books: [book], message: `Access granted to ${book.title}.` };
  return { success: false, message: "Invalid access code. Please check the code on the last page of your book." };
}

function bonusSectionHTML(book) {
  const bonus = getBonusUnlocked();
  const unlocked = !!bonus[book.slug];
  const pdfUrl = `/bonus-pdfs/${book.slug}-cheatsheet.pdf`;

  if (unlocked) {
    return `
      <div class="bonus-box unlocked">
        <div class="bonus-title">🎁 Bonus Content Unlocked</div>
        <p>Thanks for your review! Download your printable formula cheat sheet:</p>
        <a href="${pdfUrl}" class="btn btn-sm" download>Download Cheat Sheet (PDF)</a>
      </div>`;
  }

  return `
    <div class="bonus-box">
      <div class="bonus-title">🎁 Unlock Bonus Content</div>
      <p>Leave an honest review on Amazon, then upload a screenshot to unlock the printable <strong>formula cheat sheet (PDF)</strong> for ${book.shortName || book.title}.</p>
      <form class="bonus-form" data-slug="${book.slug}">
        <label class="file-label">
          <input type="file" accept="image/*,.pdf" required>
          <span class="file-cta">Upload Review Screenshot</span>
          <span class="file-name">No file selected</span>
        </label>
        <button type="submit" class="btn btn-sm">Unlock Cheat Sheet</button>
        <div class="bonus-msg"></div>
      </form>
    </div>`;
}

function wireBonusForms() {
  document.querySelectorAll('.bonus-form').forEach(form => {
    const fileInput = form.querySelector('input[type="file"]');
    const nameEl = form.querySelector('.file-name');
    const msgEl = form.querySelector('.bonus-msg');

    fileInput.addEventListener('change', () => {
      nameEl.textContent = fileInput.files[0]?.name || 'No file selected';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const slug = form.dataset.slug;
      const file = fileInput.files[0];
      if (!file) { msgEl.textContent = "Please select your review screenshot first."; msgEl.className = 'bonus-msg error'; return; }

      msgEl.textContent = "Uploading…"; msgEl.className = 'bonus-msg';

      if (window.REVIEW_UPLOAD_ENDPOINT) {
        try {
          const fd = new FormData();
          fd.append('email', getEmail());
          fd.append('book', slug);
          fd.append('file', file);
          await fetch(window.REVIEW_UPLOAD_ENDPOINT, { method: 'POST', body: fd });
        } catch { /* don't block unlock on upload failure */ }
      }

      setBonusUnlocked(slug);
      // Re-render just this bonus box
      const wrap = form.closest('.book-card-unlocked').querySelector('.bonus-mount');
      wrap.innerHTML = bonusSectionHTML({ slug, shortName: form.dataset.shortName, title: form.dataset.title });
    });
  });
}

function renderUnlockedBooks(books, isAdmin) {
  const grid = document.getElementById('unlockedGrid');
  if (!grid) return;
  grid.innerHTML = books.map(book => `
    <div class="book-card-unlocked">
      <div class="bcu-header">
        <img src="${book.cover}" alt="${book.title}" class="bcu-cover">
        <div>
          <div class="book-category">${book.category}</div>
          <h3>${book.title}</h3>
          <div class="book-meta">
            <span class="book-meta-item"><strong>${book.testCount}</strong> Tests</span>
            <span class="book-meta-item"><strong>${book.totalQuestions}</strong> Qs</span>
            <span class="book-meta-item"><strong>${book.timeMinutes}</strong> min each</span>
          </div>
        </div>
      </div>
      <div class="bcu-tests">
        ${Array.from({length: book.testCount}, (_, i) => `
          <a href="/quiz?book=${book.slug}&test=${i+1}" class="btn btn-sm">Practice Test ${i+1}</a>
        `).join('')}
      </div>
      <div class="bonus-mount">${bonusSectionHTML(book)}</div>
    </div>
  `).join('');

  document.getElementById('testList').style.display = 'block';
  const welcome = document.getElementById('welcomeMsg');
  if (welcome) {
    welcome.textContent = isAdmin
      ? "Admin access: All 10 books unlocked."
      : "Your timed practice tests and bonus formula cheat sheet are below.";
  }
  wireBonusForms();
}

async function initAccessPage() {
  const form = document.getElementById('accessForm');
  if (!form) return;

  const savedEmail = getEmail();
  if (savedEmail) document.getElementById('email').value = savedEmail;

  // Prefill code from ?code=XXXX-XXXXX-XXXXX (sent by homepage quick-unlock)
  const params = new URLSearchParams(location.search);
  const codeFromUrl = params.get('code');
  if (codeFromUrl) document.getElementById('code').value = codeFromUrl.toUpperCase();

  const unlocked = getUnlocked();
  if (unlocked.slugs.length > 0 || unlocked.isAdmin) {
    const data = await loadBooks();
    const books = unlocked.isAdmin ? data.books : data.books.filter(b => unlocked.slugs.includes(b.slug));
    if (books.length > 0) {
      renderUnlockedBooks(books, unlocked.isAdmin);
      form.parentElement.innerHTML = `
        <h2>Welcome Back</h2>
        <p>You have ${unlocked.isAdmin ? 'admin access' : books.length === 1 ? '1 book' : books.length + ' books'} unlocked.</p>
        <button class="btn btn-outline" onclick="resetAccess()">Add Another Access Code</button>
      `;
      return;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;
    const errorMsg = document.getElementById('errorMsg');

    const result = await validateCode(code);
    if (!result.success) { errorMsg.textContent = result.message; errorMsg.classList.add('show'); return; }

    setEmail(email);
    const current = getUnlocked();
    if (result.isAdmin) { current.isAdmin = true; current.slugs = result.books.map(b => b.slug); }
    else { current.slugs = Array.from(new Set([...current.slugs, ...result.books.map(b => b.slug)])); }
    setUnlocked(current);

    // Fire-and-forget MailerLite subscribe — never block unlock on failure.
    const bookLabel = result.isAdmin ? 'ADMIN' : (result.books[0]?.shortName || result.books[0]?.slug || '');
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, accessCode: code, book: bookLabel }),
    }).catch(() => {});

    renderUnlockedBooks(result.books, result.isAdmin);
    form.parentElement.style.display = 'none';
  });
}

function resetAccess() {
  if (confirm("Clear your unlocked books? You'll need to re-enter your access code.")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BONUS_KEY);
    location.reload();
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAccessPage);
else initAccessPage();
