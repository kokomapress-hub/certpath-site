// CertPath Publishing - /check-code: test a book access code without unlocking anything.
// Uses the same rules as /access (js/app.js): normalise, SHA-256, compare with the
// hashes in /data/books.json. No email, no localStorage, nothing is sent anywhere.

const normCode = (s) => (s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkForm');
  const input = document.getElementById('code');
  const out = document.getElementById('checkResult');
  const btn = form.querySelector('button[type="submit"]');

  function show(kind, html) {
    out.className = 'cc-result cc-' + kind;
    out.innerHTML = html;
    out.hidden = false;
  }

  input.addEventListener('input', () => { out.hidden = true; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const typed = input.value;
    const clean = normCode(typed);
    if (!clean) { show('bad', 'Type or paste a code first.'); input.focus(); return; }

    btn.disabled = true; btn.textContent = 'Checking…';
    try {
      // no-store: always test against the live code list, never a cached copy
      const data = await (await fetch('/data/books.json', { cache: 'no-store' })).json();
      const hash = await sha256Hex(clean);
      const codesOf = b => [b.codeHash, ...(Array.isArray(b.codeHashes) ? b.codeHashes : [])].filter(Boolean);
      const matches = data.books.filter(b => codesOf(b).includes(hash));

      if (hash === data.adminCodeHash) {
        show('ok', '<strong>✓ This code works.</strong> It is the owner code and opens every book.');
      } else if (matches.length) {
        const list = matches.map(b => '<li>' + esc(b.title) + '</li>').join('');
        show('ok',
          '<strong>✓ This code works.</strong> It unlocks:' +
          '<ul>' + list + '</ul>' +
          '<button type="button" class="btn btn-outline btn-block" id="ccOpen">Open these practice tests</button>');
        document.getElementById('ccOpen').addEventListener('click', () => {
          // Hand the code to /access the same way /pmp and /capm do: sessionStorage, never the URL.
          try { sessionStorage.setItem('certpath_pending_code', typed.trim()); } catch (_) {}
          location.href = '/access?book=' + encodeURIComponent(matches[0].slug);
        });
      } else {
        show('bad',
          '<strong>✗ This code isn\'t recognised.</strong> ' +
          'Check each character against the last page of the book — letters O/I and digits 0/1 are easy to mix up. ' +
          'You typed <code>' + esc(clean.replace(/^(.{4})(.{5})(.{5})$/, '$1-$2-$3')) + '</code>.');
      }
    } catch (err) {
      show('bad', 'We couldn\'t reach the code list just now. Check your connection and try again.');
    } finally {
      btn.disabled = false; btn.textContent = 'Check code';
    }
  });
});
