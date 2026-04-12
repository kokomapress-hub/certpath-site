// ===== CERTPATH Access Code Validation =====

// Valid book codes — one per book title
const VALID_CODES = {
  'CAST-CP-2024': { book: 'cast-exam', title: 'CAST Exam Study Guide' },
  'MECH-APT-CP': { book: 'mechanical-aptitude', title: 'Mechanical Aptitude Study Guide' }
};

// Check if user already has access
function checkExistingAccess() {
  const access = JSON.parse(localStorage.getItem('certpath_access') || '{}');
  if (access.email && access.books && access.books.length > 0) {
    return access;
  }
  return null;
}

// Show access status if already unlocked
(function showAccessStatus() {
  const access = checkExistingAccess();
  if (!access) return;

  const wrapper = document.querySelector('.access-wrapper');
  if (!wrapper) return;

  const booksHTML = access.books.map(b => {
    const info = Object.values(VALID_CODES).find(v => v.book === b);
    const title = info ? info.title : b;
    return `<li style="margin:8px 0;">
      <a href="/${b}/test-1/" class="btn btn-primary btn-sm" style="display:block;">${title} — Practice Tests</a>
    </li>`;
  }).join('');

  const statusHTML = `
    <h1>Welcome Back!</h1>
    <p class="subtitle">You have access to the following practice tests:</p>
    <ul style="list-style:none;margin:24px 0;">${booksHTML}</ul>
    <hr style="border:none;border-top:1px solid var(--border);margin:24px 0;">
    <p style="font-size:0.9rem;color:var(--text-light);">Want to unlock another book?</p>
  `;

  // Keep the form but prepend access status
  const form = document.getElementById('accessForm');
  const statusDiv = document.createElement('div');
  statusDiv.innerHTML = statusHTML;
  wrapper.insertBefore(statusDiv, form);
})();

function handleAccess(e) {
  e.preventDefault();

  const codeInput = document.getElementById('accessCode');
  const emailInput = document.getElementById('email');
  const codeError = document.getElementById('codeError');
  const emailError = document.getElementById('emailError');

  // Reset errors
  codeError.style.display = 'none';
  emailError.style.display = 'none';

  const code = codeInput.value.trim().toUpperCase();
  const email = emailInput.value.trim();

  // Validate code
  if (!VALID_CODES[code]) {
    codeError.style.display = 'block';
    codeInput.focus();
    return false;
  }

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.style.display = 'block';
    emailInput.focus();
    return false;
  }

  // Save access to localStorage
  const access = JSON.parse(localStorage.getItem('certpath_access') || '{}');
  access.email = email;
  access.books = access.books || [];
  if (!access.books.includes(VALID_CODES[code].book)) {
    access.books.push(VALID_CODES[code].book);
  }
  localStorage.setItem('certpath_access', JSON.stringify(access));

  // Submit to MailerLite (placeholder — replace with your MailerLite form action)
  submitToMailerLite(email, VALID_CODES[code].title);

  // Redirect to practice tests
  window.location.href = '/' + VALID_CODES[code].book + '/test-1/';
  return false;
}

function submitToMailerLite(email, bookTitle) {
  // TODO: Replace with your MailerLite API integration
  // For now, this logs the subscription. Set up MailerLite embedded form or API call here.
  console.log('MailerLite subscribe:', email, 'Book:', bookTitle);

  // Example MailerLite API call (uncomment and add your API key):
  // fetch('https://connect.mailerlite.com/api/subscribers', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer YOUR_MAILERLITE_API_KEY'
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //     groups: ['YOUR_GROUP_ID'],
  //     fields: { book: bookTitle }
  //   })
  // });
}
