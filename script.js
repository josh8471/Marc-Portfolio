// Mark JS as available so CSS can gate scroll animations on it
document.documentElement.classList.add('js');

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

// Header background on scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Fade-in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Welcome popup — first visit only
const popup = document.getElementById('welcomePopup');
if (popup) {
  const SEEN_KEY = 'bby-welcome-seen';
  let seen = false;
  try {
    seen = localStorage.getItem(SEEN_KEY) === '1';
  } catch (e) { /* storage unavailable: treat as seen to avoid nagging */ seen = true; }

  const closePopup = () => {
    popup.classList.remove('open');
    setTimeout(() => { popup.hidden = true; }, 300);
    try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* ignore */ }
  };

  if (!seen) {
    setTimeout(() => {
      popup.hidden = false;
      requestAnimationFrame(() => popup.classList.add('open'));
    }, 1200);

    document.getElementById('popupClose').addEventListener('click', closePopup);
    document.getElementById('popupCta').addEventListener('click', closePopup);
    popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !popup.hidden) closePopup();
    });
  }
}

// Lightbox options
if (typeof lightbox !== 'undefined') {
  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    fadeDuration: 300
  });
}
