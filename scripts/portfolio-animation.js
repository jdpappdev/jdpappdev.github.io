(() => {
  const mount = document.querySelector('[data-portfolio-animation]');
  if (!mount) return;
  if (!window.lottie) {
    mount.hidden = true;
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animation = window.lottie.loadAnimation({
    container: mount,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '/assets/Developer.json'
  });

  animation.addEventListener('data_failed', () => { mount.hidden = true; });
  animation.addEventListener('DOMLoaded', () => {
    if (reducedMotion.matches) {
      animation.goToAndStop(24, true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      animation.play();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reducedMotion.matches) animation.goToAndStop(24, true);
      else animation.play();
    }, { threshold: 0.25 });
    observer.observe(mount);
  });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) animation.goToAndStop(24, true);
  });
})();
