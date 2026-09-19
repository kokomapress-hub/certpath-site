// CertPath Publishing - Access code validation + book unlock + bonus content

const STORAGE_KEY = "certpath_unlocked";
const EMAIL_KEY = "certpath_email";
const BONUS_KEY = "certpath_bonus";

// Normalize an access code for comparison: uppercase and drop everything that
// isn't a letter or digit. This makes hyphens, spaces, and case optional, so
// "CAP-7H4MK-Q9XRD", "cap7h4mkq9xrd", and "CAP 7H4MK Q9XRD" all match.
const normCode = (s) => (s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

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
const COMPLETED_KEY = "certpath_completed";
function getCompleted() {
  try { return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '{}'); }
  catch { return {}; }
}
function setUnlocked(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
const NAME_KEY = "certpath_name";
function getName() { return localStorage.getItem(NAME_KEY) || ""; }
function setName(n) { if (n) localStorage.setItem(NAME_KEY, n.trim().slice(0, 40)); }
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

// Owner super code -> also open the paid video courses. On localhost this is immediate
// (offline review). On the live site the course keys are written ONLY after
// /api/redeem-course confirms the code against the SUPER_ACCESS_CODE secret, because the
// books.json is public, so a client-side check must never be enough to open a paid product.
async function grantOwnerCourses(code) {
  const write = () => {
    const owner = JSON.stringify({ tier: 'complete', code: 'OWNER', ts: Date.now() });
    localStorage.setItem('certpath_pmp_access', owner);
    localStorage.setItem('certpath_capm_access', owner);
  };
  try {
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) { write(); return true; }
    const r = await fetch('/api/redeem-course', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, superOnly: true }),
    });
    const d = await r.json();
    if (d && d.ok && d.super) { write(); return true; }
  } catch (e) { /* courses stay locked; tests are still unlocked */ }
  return false;
}

// books.json ships only SHA-256 hashes of the (normalised) codes — never the codes
// themselves — so reading the public file does not reveal a working code.
async function sha256Hex(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function validateCode(code) {
  const data = await loadBooks();
  const cleanCode = await sha256Hex(normCode(code));
  if (cleanCode === data.adminCodeHash) {
    return { success: true, isAdmin: true, books: data.books, message: "Admin access granted." };
  }
  // SAT/PSAT/ACT/GED math books share a single printed access code across
  // the 3 SKUs (Prep + Workbook + 10 Practice Tests) — entering that code
  // should unlock all matching books, not just the first one found.
  // A book may list several valid printed codes ("codes": [...]) so that every
  // edition's printed code keeps working (e.g. POSS V4 printed POSS-PREP-2GXW9).
  const codesOf = b => [b.codeHash, ...(Array.isArray(b.codeHashes) ? b.codeHashes : [])].filter(Boolean);
  const matches = data.books.filter(b => codesOf(b).includes(cleanCode));
  if (matches.length) {
    const titles = matches.length === 1 ? matches[0].title : `${matches.length} matching books`;
    return { success: true, isAdmin: false, books: matches, message: `Access granted to ${titles}.` };
  }
  return { success: false, message: "We couldn't verify that code. Check the characters against the last page of your book, or email support@certpathpublishing.store and we'll help." };
}

fetch('/cheatsheets/meta.json').then(r => r.ok ? r.json() : {}).then(m => {
  window.__cpSheets = m || {};
  document.querySelectorAll('a[data-sheet-bank]').forEach(a => { const b = a.dataset.sheetBank; if (m[b] && m[b].ready) a.href = `/cheatsheets/${b}.pdf`; });
}).catch(() => {});

function bonusSectionHTML(book) {
  // Bonus materials are included with the book purchase and are never
  // conditioned on an Amazon review (Amazon's review policy prohibits
  // rewarding reviews, and the books promise the bonus "no review required").
  // New audited two-page sheets live in /cheatsheets/<bank>.pdf once cleared (see cheatsheets/meta.json);
  // until a title's sheet is cleared, its original bonus PDF stays in place.
  const bank = book.bank || book.slug;
  const pdfUrl = (window.__cpSheets && window.__cpSheets[bank] && window.__cpSheets[bank].ready)
    ? `/cheatsheets/${bank}.pdf` : `/bonus-pdfs/${book.slug}-cheatsheet.pdf`;
  return `
    <div class="bonus-box unlocked">
      <div class="bonus-title">🎁 Bonus Study Materials</div>
      <p>Included free with your book: the printable <strong>2-page cheat sheet (PDF)</strong> for ${book.shortName || book.title}.</p>
      <a href="${pdfUrl}" data-sheet-bank="${bank}" class="btn btn-sm" download>Download Cheat Sheet (PDF)</a>
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
        ${(() => {
          const done = (getCompleted()[book.slug] || []);
          return Array.from({length: book.testCount}, (_, i) => {
            const n = i + 1;
            const locked = book.sequential && !isAdmin && n > 1 && !done.includes(n - 1);
            if (locked) {
              return `<span class="btn btn-sm btn-locked" title="Finish Test ${n - 1} first" aria-disabled="true">🔒 Test ${n}</span>`;
            }
            return `<a href="/quiz?book=${book.slug}&test=${n}" class="btn btn-sm">Practice Test ${n}${done.includes(n) ? ' ✓' : ''}</a>`;
          }).join('');
        })()}
      </div>
      ${book.sequential ? `<div class="bcu-seq-note">Tests unlock in order — finish one to open the next.</div>` : ''}
      <div class="bonus-mount">${['pmp', 'pmp-free', 'cnor'].includes(book.slug) ? '' : bonusSectionHTML(book)}</div>
    </div>
  `).join('');

  document.getElementById('testList').style.display = 'block';

  // Paid PMP video customers get a prominent, persistent link back to their
  // video course, so /access never becomes a dead end away from their videos.
  try {
    const hasPmpVideo = !!JSON.parse(localStorage.getItem('certpath_pmp_access') || 'null');
    const tl = document.getElementById('testList');
    if (hasPmpVideo && tl && !document.getElementById('pmpCourseBanner')) {
      const banner = document.createElement('a');
      banner.id = 'pmpCourseBanner';
      banner.href = '/pmp-course';
      banner.textContent = '🎬 Back to your PMP Video Course →';
      banner.style.cssText = 'display:block;max-width:640px;margin:0 auto 1.5rem;padding:.9rem 1.25rem;background:var(--navy,#1B2A4A);color:#fff;border-radius:10px;text-align:center;font-weight:700;text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,.12)';
      tl.insertBefore(banner, tl.firstChild);
    }
  } catch (e) {}

  // Owner / course customers: direct links to the video courses from the library.
  try {
    const tl2 = document.getElementById('testList');
    const links = [['certpath_pmp_access', '/pmp-course', 'PMP video course'], ['certpath_capm_access', '/capm-course', 'CAPM video course']]
      .filter(([k]) => !!JSON.parse(localStorage.getItem(k) || 'null'));
    if (isAdmin && links.length && tl2 && !document.getElementById('ownerCourses')) {
      const box = document.createElement('p');
      box.id = 'ownerCourses';
      box.style.cssText = 'margin:0 0 1.5rem;display:flex;gap:.75rem;flex-wrap:wrap';
      box.innerHTML = links.map(([, href, label]) => `<a class="cp-btn cp-btn-navy cp-btn-sm" href="${href}">${label} →</a>`).join('');
      tl2.insertBefore(box, tl2.firstChild);
    }
  } catch (e) {}

  const welcome = document.getElementById('welcomeMsg');
  if (welcome) {
    welcome.textContent = isAdmin
      ? "Owner access: every practice test and both video courses are unlocked."
      : "Your timed practice tests are below.";
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
  // Codes handed over from /pmp, /capm travel in sessionStorage, never in the URL.
  try {
    const pending = sessionStorage.getItem('certpath_pending_code');
    if (pending) { document.getElementById('code').value = pending; sessionStorage.removeItem('certpath_pending_code'); }
  } catch (e) {}
  const nameInput = document.getElementById('firstName');
  if (nameInput && getName()) nameInput.value = getName();

  // Live-hide the email field if the user is typing the admin code.
  const codeInput = document.getElementById('code');
  const emailGroup = document.getElementById('emailGroup');
  const syncAdminUI = async () => {
    if (!emailGroup) return;
    const data = await loadBooks();
    const isAdmin = (await sha256Hex(normCode(codeInput.value))) === data.adminCodeHash;
    emailGroup.style.display = isAdmin ? 'none' : '';
  };
  codeInput.addEventListener('input', syncAdminUI);
  syncAdminUI(); // initial pass for prefilled code

  const unlocked = getUnlocked();
  if (unlocked.slugs.length > 0 || unlocked.isAdmin) {
    const data = await loadBooks();
    const books = unlocked.isAdmin ? data.books : data.books.filter(b => unlocked.slugs.includes(b.slug));
    if (books.length > 0) {
      renderUnlockedBooks(books, unlocked.isAdmin);
      form.parentElement.innerHTML = `
        <h2>Welcome back${getName() ? ', ' + getName().replace(/[<>&"]/g, '') : ''}</h2>
        <p>You have ${unlocked.isAdmin ? 'admin access' : books.length === 1 ? '1 book' : books.length + ' books'} unlocked.</p>
        <button class="btn btn-outline" onclick="resetAccess()">Add Another Access Code</button>
      `;
      return;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const code = document.getElementById('code').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.classList.remove('show');

    // Checking state: keep the typed code visible, block duplicate submits, and
    // never report a connection failure as an invalid code.
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Checking your code…'; }
    let result;
    try {
      result = await validateCode(code);
    } catch (err) {
      booksData = null; // allow a clean retry
      errorMsg.textContent = "We couldn't connect. Your entry is still here — please try again.";
      errorMsg.classList.add('show');
      return;
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
    }
    if (!result.success) { errorMsg.textContent = result.message; errorMsg.classList.add('show'); return; }

    // Email is required for regular book codes (we capture it to MailerLite).
    // Admin code bypasses email entirely — admin doesn't need to subscribe.
    if (!result.isAdmin && !email) {
      errorMsg.textContent = 'Please enter your email address.';
      errorMsg.classList.add('show');
      return;
    }

    if (email) setEmail(email);
    const firstName = (document.getElementById('firstName') || {}).value || '';
    if (firstName.trim()) setName(firstName);
    const current = getUnlocked();
    if (result.isAdmin) { current.isAdmin = true; current.slugs = result.books.map(b => b.slug); }
    if (result.isAdmin) await grantOwnerCourses(code);
    else { current.slugs = Array.from(new Set([...current.slugs, ...result.books.map(b => b.slug)])); }
    setUnlocked(current);

    // MailerLite subscribe — only for real customers, not admin.
    if (!result.isAdmin) {
      const bookLabel = result.books[0]?.shortName || result.books[0]?.slug || '';
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, accessCode: code, book: bookLabel, name: firstName.trim() }),
        keepalive: true, // survives the redirect below
      }).catch(() => {});

      // Each book has its own page (/books/<slug>) that doubles as the owner's
      // home, so a valid code lands the customer there rather than in the
      // generic library. ?book= (printed-book links) picks among a shared code's
      // matches. Books without a dedicated page fall through to the library.
      try {
        const pages = await (await fetch('/data/book-pages.json')).json();
        const wanted = new URLSearchParams(location.search).get('book');
        const pick = result.books.find(b => b.slug === wanted) || result.books[0];
        const target = pick && pages[pick.slug];
        if (target && target.startsWith('/books/')) { location.href = target; return; }
      } catch (e) { /* fall back to the library below */ }
    }

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
