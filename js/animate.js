// ===== Scroll-triggered animations =====
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[data-animate], [data-animate-stagger]');

  if (!targets.length) return;

  const reveal = (el) => {
    el.classList.add('visible');
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  targets.forEach(el => {
    // Check if element is already in viewport on load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal(el);
    } else {
      observer.observe(el);
    }
  });
});
