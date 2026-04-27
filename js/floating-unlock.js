// CertPath Publishing - Floating access-code unlock widget
// Injects a fixed button (bottom-right) on any page. Click opens a modal
// that accepts an access code, validates it, saves to localStorage,
// and routes the user to /access with a congratulations message.
(function () {
  // Don't show on the /access page itself — the form is already there.
  if (/\/access(\.html)?$/.test(location.pathname) || location.pathname.startsWith('/quiz')) return;

  const css = `
    .fu-launcher { position: fixed; bottom: 24px; right: 24px; z-index: 9998; background: linear-gradient(135deg, #FFB800, #FFCB45); color: #1B2A4A; border: none; border-radius: 999px; padding: 0.9rem 1.4rem; font-weight: 700; font-size: 0.95rem; box-shadow: 0 8px 24px rgba(15, 26, 48, 0.25); cursor: pointer; font-family: inherit; display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.15s, box-shadow 0.15s; }
    .fu-launcher:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(15, 26, 48, 0.35); }
    .fu-launcher .fu-icon { font-size: 1.2rem; }
    .fu-overlay { position: fixed; inset: 0; background: rgba(15, 26, 48, 0.65); backdrop-filter: blur(4px); z-index: 9999; display: none; align-items: center; justify-content: center; padding: 1rem; }
    .fu-overlay.open { display: flex; }
    .fu-modal { background: #fff; border-radius: 14px; padding: 2rem; max-width: 480px; width: 100%; box-shadow: 0 30px 80px rgba(15, 26, 48, 0.4); position: relative; animation: fuIn 0.2s ease-out; }
    @keyframes fuIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: none; } }
    .fu-close { position: absolute; top: 12px; right: 14px; background: none; border: none; font-size: 1.6rem; color: #6B7280; cursor: pointer; line-height: 1; padding: 4px 10px; border-radius: 6px; }
    .fu-close:hover { background: #F5F7FA; color: #1B2A4A; }
    .fu-modal h3 { color: #1B2A4A; font-size: 1.4rem; font-weight: 800; margin: 0 0 0.35rem; }
    .fu-modal p { color: #6B7280; font-size: 0.95rem; margin: 0 0 1.25rem; }
    .fu-modal input { width: 100%; padding: 0.85rem 1rem; border: 2px solid #E5E9F0; border-radius: 8px; font-size: 1.05rem; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; text-transform: uppercase; letter-spacing: 0.5px; outline: none; transition: border-color 0.15s; }
    .fu-modal input:focus { border-color: #FFB800; }
    .fu-modal .fu-btn { width: 100%; margin-top: 0.75rem; background: #1B2A4A; color: #fff; border: none; padding: 0.9rem; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.15s; font-family: inherit; }
    .fu-modal .fu-btn:hover { background: #0F1A30; }
    .fu-msg { margin-top: 0.85rem; padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.92rem; display: none; }
    .fu-msg.success { display: block; background: #ECFDF5; border: 1px solid #86EFAC; color: #065F46; }
    .fu-msg.error { display: block; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; }
    .fu-msg a { color: #1B2A4A; font-weight: 700; text-decoration: underline; }
    @media (max-width: 560px) { .fu-launcher { bottom: 16px; right: 16px; padding: 0.75rem 1.1rem; font-size: 0.9rem; } }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.className = 'fu-launcher';
  launcher.setAttribute('aria-label', 'Enter book access code');
  launcher.innerHTML = '<span class="fu-icon">🔓</span><span>Enter Access Code</span>';
  document.body.appendChild(launcher);

  const overlay = document.createElement('div');
  overlay.className = 'fu-overlay';
  overlay.innerHTML = `
    <div class="fu-modal" role="dialog" aria-modal="true" aria-labelledby="fuTitle">
      <button class="fu-close" aria-label="Close">×</button>
      <h3 id="fuTitle">Enter Your Access Code</h3>
      <p>Found on the last page of your CertPath study guide. Format: XXXX-XXXXX-XXXXX</p>
      <form id="fuForm" autocomplete="off">
        <input type="text" id="fuCode" required placeholder="XXXX-XXXXX-XXXXX" autocomplete="off">
        <button type="submit" class="fu-btn">Unlock My Tests</button>
        <div class="fu-msg" id="fuMsg"></div>
      </form>
    </div>`;
  document.body.appendChild(overlay);

  const open = () => { overlay.classList.add('open'); setTimeout(() => document.getElementById('fuCode')?.focus(), 50); };
  const close = () => { overlay.classList.remove('open'); document.getElementById('fuMsg').className = 'fu-msg'; document.getElementById('fuMsg').textContent = ''; };

  launcher.addEventListener('click', open);
  overlay.querySelector('.fu-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  overlay.querySelector('#fuForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('fuCode').value.toUpperCase().trim();
    const msg = document.getElementById('fuMsg');
    msg.className = 'fu-msg';

    try {
      const r = await fetch('/data/books.json');
      const data = await r.json();

      // Validate locally so we can show an inline error, but don't unlock
      // here — bounce the user to /access where they enter their email
      // and the backend records the signup in MailerLite.
      const isAdmin = code === data.adminCode;
      const book = data.books.find(b => b.code.toUpperCase() === code);

      if (!isAdmin && !book) {
        msg.classList.add('error');
        msg.textContent = 'Invalid code. Please check the last page of your book.';
        return;
      }

      msg.classList.add('success');
      msg.innerHTML = '✓ Code verified. Redirecting to enter your email…';
      const target = isAdmin
        ? `/access?code=${encodeURIComponent(code)}`
        : `/access?code=${encodeURIComponent(code)}&book=${book.slug}`;
      setTimeout(() => { location.href = target; }, 800);
    } catch (err) {
      msg.classList.add('error');
      msg.textContent = 'Something went wrong. Please try again.';
    }
  });
})();
