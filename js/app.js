// CertPath Publishing - Access code validation + book unlock

const STORAGE_KEY = "certpath_unlocked";
const EMAIL_KEY = "certpath_email";

let booksData = null;

// Load books metadata
async function loadBooks() {
  if (booksData) return booksData;
  const r = await fetch('/data/books.json');
  booksData = await r.json();
  return booksData;
}

// Check what's already unlocked from localStorage
function getUnlocked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"slugs":[],"isAdmin":false}');
  } catch {
    return { slugs: [], isAdmin: false };
  }
}

function setUnlocked(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getEmail() {
  return localStorage.getItem(EMAIL_KEY) || "";
}

function setEmail(email) {
  localStorage.setItem(EMAIL_KEY, email);
}

// Validate code and unlock the appropriate book(s)
async function validateCode(code, email) {
  const data = await loadBooks();
  const cleanCode = code.toUpperCase().trim();

  // Master admin code unlocks everything
  if (cleanCode === data.adminCode) {
    return {
      success: true,
      isAdmin: true,
      books: data.books,
      message: "Admin access granted. All books unlocked."
    };
  }

  // Book-specific code
  const book = data.books.find(b => b.code.toUpperCase() === cleanCode);
  if (book) {
    return {
      success: true,
      isAdmin: false,
      books: [book],
      message: `Access granted to ${book.title}.`
    };
  }

  return {
    success: false,
    message: "Invalid access code. Please check the code on the last page of your book."
  };
}

// Render the list of unlocked books with "Take Test" buttons
function renderUnlockedBooks(books, isAdmin) {
  const grid = document.getElementById('unlockedGrid');
  if (!grid) return;
  grid.innerHTML = books.map(book => `
    <div class="book-card">
      <h3>${book.title}</h3>
      <div class="meta">
        <span class="badge">${book.testCount} Tests</span>
        <span class="badge">${book.totalQuestions} Qs</span>
      </div>
      <div class="actions">
        ${Array.from({length: book.testCount}, (_, i) => `
          <a href="/quiz.html?book=${book.slug}&test=${i+1}" class="btn">Test ${i+1}</a>
        `).join('')}
      </div>
    </div>
  `).join('');

  document.getElementById('testList').style.display = 'block';
  const welcome = document.getElementById('welcomeMsg');
  if (welcome) {
    welcome.textContent = isAdmin
      ? "Admin access: All 10 books unlocked."
      : `${books[0].testCount} timed practice tests with ${books[0].totalQuestions} questions and detailed explanations.`;
  }
}

// Initialize the access page
async function initAccessPage() {
  const form = document.getElementById('accessForm');
  if (!form) return;

  // Pre-fill email if we have it
  const savedEmail = getEmail();
  if (savedEmail) document.getElementById('email').value = savedEmail;

  // Pre-select book if URL has ?book=slug
  const urlBook = new URLSearchParams(location.search).get('book');

  // Auto-show if already unlocked
  const unlocked = getUnlocked();
  if (unlocked.slugs.length > 0 || unlocked.isAdmin) {
    const data = await loadBooks();
    const books = unlocked.isAdmin
      ? data.books
      : data.books.filter(b => unlocked.slugs.includes(b.slug));
    if (books.length > 0) {
      renderUnlockedBooks(books, unlocked.isAdmin);
      // Hide the form, show "Add another code" link instead
      form.parentElement.innerHTML = `
        <h2>Welcome Back</h2>
        <p>You have ${unlocked.isAdmin ? 'admin' : books.length === 1 ? '1 book' : books.length + ' books'} unlocked.</p>
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

    const result = await validateCode(code, email);
    if (!result.success) {
      errorMsg.textContent = result.message;
      errorMsg.classList.add('show');
      return;
    }

    // Save state
    setEmail(email);
    const current = getUnlocked();
    if (result.isAdmin) {
      current.isAdmin = true;
      current.slugs = result.books.map(b => b.slug);
    } else {
      current.slugs = Array.from(new Set([...current.slugs, ...result.books.map(b => b.slug)]));
    }
    setUnlocked(current);

    // POST to mailing list (placeholder - replace with real endpoint)
    if (window.MAILING_LIST_ENDPOINT) {
      fetch(window.MAILING_LIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, books: result.books.map(b => b.slug) })
      }).catch(() => {});
    }

    // Show unlocked tests
    renderUnlockedBooks(result.books, result.isAdmin);
    form.parentElement.style.display = 'none';
  });
}

function resetAccess() {
  if (confirm("Clear your unlocked books? You'll need to re-enter your access code.")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessPage);
} else {
  initAccessPage();
}
