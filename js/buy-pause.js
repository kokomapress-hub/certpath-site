// Purchases paused: every Payhip buy link becomes a disabled "Coming soon" button.
// Remove this script (and its <script> tags) to switch buying back on.
(function () {
  var SEL = 'a[href*="payhip.com/b/"]';
  function pause(a) {
    if (a.dataset.paused) return;
    a.dataset.paused = '1';
    a.removeAttribute('href'); a.removeAttribute('target');
    a.setAttribute('aria-disabled', 'true'); a.setAttribute('title', 'Purchases are paused for a short while');
    a.style.pointerEvents = 'none'; a.style.opacity = '.55'; a.style.cursor = 'not-allowed'; a.style.filter = 'grayscale(1)';
    if (!a.querySelector('img')) a.textContent = 'Coming soon';
  }
  function run(root) { (root.querySelectorAll ? root : document).querySelectorAll(SEL).forEach(pause); }
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest(SEL); if (a) { e.preventDefault(); e.stopPropagation(); } }, true);
  if (document.readyState !== 'loading') run(document); else document.addEventListener('DOMContentLoaded', function () { run(document); });
  new MutationObserver(function () { run(document); }).observe(document.documentElement, { childList: true, subtree: true });
})();
