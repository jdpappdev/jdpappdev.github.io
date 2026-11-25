(() => {
  const mount = document.querySelector('.contact-jade-animation');
  if (!mount) return;

  const fallback = mount.parentElement.querySelector('.contact-jade-fallback');
  const showFallback = () => {
    mount.parentElement.classList.add('is-fallback');
    mount.hidden = true;
    if (fallback) fallback.hidden = false;
  };

  if (!window.lottie) {
    showFallback();
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  try {
    const animation = window.lottie.loadAnimation({
      container: mount,
      renderer: 'svg',
      loop: !reduceMotion,
      autoplay: !reduceMotion,
      path: '/assets/contact%20jade.json',
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
    });

    animation.addEventListener('data_failed', showFallback, { once: true });
    if (reduceMotion) animation.goToAndStop(0, true);
  } catch {
    showFallback();
  }
})();
