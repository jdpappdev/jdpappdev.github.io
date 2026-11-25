const chibiSequence = document.querySelector('.about-chibi-sequence');

if (chibiSequence) {
  const frames = [...chibiSequence.querySelectorAll('img')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let visible = false;
  let timer;
  let pending = false;

  function stop() {
    window.clearInterval(timer);
    timer = undefined;
  }

  async function start() {
    if (timer || pending || !visible || document.hidden || reducedMotion.matches) return;
    pending = true;
    frames.forEach((frame) => { frame.loading = 'eager'; });
    await Promise.all(frames.map((frame) => frame.decode().catch(() => {})));
    pending = false;
    if (!visible || document.hidden || reducedMotion.matches || timer) return;
    timer = window.setInterval(() => {
      frames[current].classList.remove('is-active');
      current = (current + 1) % frames.length;
      frames[current].classList.add('is-active');
    }, 1000);
  }

  function sync() {
    if (reducedMotion.matches) {
      stop();
      frames[current].classList.remove('is-active');
      current = 0;
      frames[0].classList.add('is-active');
    } else if (visible && !document.hidden) start();
    else stop();
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .1 }).observe(chibiSequence);
  } else {
    visible = true;
    sync();
  }
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
}
