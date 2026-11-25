const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-nav]');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('open');
}
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menu?.classList.toggle('open', !expanded);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
menu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
window.matchMedia('(min-width: 851px)').addEventListener('change', closeMenu);

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

// Progressive enhancement: content is visible even without animation support.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const runningAnimations = new Set();
function enter(element, delay = 0) {
  if (reducedMotion.matches || !element.animate) return;
  const animation = element.animate([
    { opacity: 0.35, translate: '0 18px' },
    { opacity: 1, translate: '0 0' }
  ], { duration: 560, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'none' });
  runningAnimations.add(animation);
  animation.finished.catch(() => {}).finally(() => runningAnimations.delete(animation));
}
document.querySelectorAll('.profile-panel, .intro-panel, .experience-panel').forEach((element, index) => enter(element, index * 65));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      enter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.bento-path, .case-card, .proof-card, .section-head, .closing-panel').forEach(element => observer.observe(element));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) runningAnimations.forEach(animation => animation.cancel());
});
const header = document.querySelector('.site-header');
let headerFrame = 0;
function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  headerFrame = 0;
}
window.addEventListener('scroll', () => {
  if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader);
}, { passive: true });
updateHeader();



// Mark the current section (including nested case studies) in the shared navigation.
const currentPath = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
const currentSectionLink = [...document.querySelectorAll('.nav a')]
  .filter((link) => currentPath.startsWith(new URL(link.href, window.location.origin).pathname))
  .sort((a, b) => new URL(b.href, window.location.origin).pathname.length - new URL(a.href, window.location.origin).pathname.length)[0];
currentSectionLink?.setAttribute('aria-current', 'page');
const hireLink = document.querySelector('.header-inner > .nav-hire');
if (hireLink && new URL(hireLink.href, window.location.origin).pathname === currentPath) hireLink.setAttribute('aria-current', 'page');

// Count from 0 to 10 over ten seconds as the page opens.
const experienceCount = document.querySelector('[data-count-up]');
if (experienceCount) {
  const target = Number(experienceCount.dataset.countUp) || 10;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    experienceCount.textContent = String(target);
  } else {
    experienceCount.textContent = '0';
    let value = 0;
    const timer = window.setInterval(() => {
      value += 1;
      experienceCount.textContent = String(Math.min(value, target));
      if (value >= target) window.clearInterval(timer);
    }, 120);
    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        window.clearInterval(timer);
        experienceCount.textContent = String(target);
      }
    });
  }
}
