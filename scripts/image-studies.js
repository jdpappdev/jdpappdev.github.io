(() => {
  const dialog = document.querySelector('[data-prompt-dialog]');
  const title = dialog?.querySelector('[data-prompt-title]');
  const summary = dialog?.querySelector('[data-prompt-summary]');
  const promptText = dialog?.querySelector('[data-prompt-text]');
  const copyButton = dialog?.querySelector('[data-prompt-copy]');
  if (!dialog || !title || !summary || !promptText || !copyButton) return;

  const prompts = {
    'london-bus': {
      title: 'Red Bus Beneath Big Ben',
      summary: 'A London stock photo restyled as a Japanese manga editorial illustration with bold ink work and generous negative space.',
      text: `Create one standalone 3:4 vertical illustration from Image 1. Use Image 1 as the sole reference for the London scene. Preserve the red double-decker bus, Big Ben, street perspective, recognizable forms, and their relative positions. Simplify incidental detail; add no unsupported objects or people.

STYLE: Japanese minimalist manga editorial. Draw with expressive black ink, bold contours, varied line weight, directional brush strokes, a few dry-brush marks, and restrained halftone. Keep the subject bold and recognizable within a quiet, asymmetric composition with generous clean margins and negative space. Use near-white paper, black ink, and one or two accent colors sampled from the photo. Keep textures subtle and the overall image uncluttered.

OUTPUT: One complete illustration only. No photo panel, comparison, split, collage, added text, Japanese characters, speech bubbles, labels, border, logo, watermark, or unrelated elements.`
    },
    'annecy': {
      title: 'Annecy Canal by the Lake',
      summary: 'Annecy’s canal, old town, lake, and alpine backdrop rendered in a richly textured vintage engraved illustration.',
      text: `Create one standalone 3:4 vertical illustration. Image 1 controls the Annecy scene and its composition; Image 2 is a style reference only. Preserve the canal, old-town buildings, lake, mountains, bridge, boats, horizon, clouds, and original weather and lighting. Keep recognizable people and landmarks in their source positions. Omit illegible signage and add no objects or clouds absent from Image 1.

STYLE: 1950s–1960s European storybook printmaking. Fully redraw the scene with bold black-ink contours, fine parallel hatching and cross-hatching, carved woodcut-like marks, and subtle hand-printed grain. Use a vivid retro palette—teal-cyan, vermilion, orange, golden ochre, cream, sun-yellow, olive, and emerald—adapted to the source lighting. Apply the style consistently across the entire scene. Do not copy Image 2's subject, objects, or composition.

OUTPUT: One polished, continuous illustration only. No original-photo panel, comparison, split, collage, divider, border, added text, labels, logo, watermark, or unrelated details.`
    },
    'porto-tram': {
      title: 'Porto Tram 22',
      summary: 'A Porto street photograph transformed into a dimensional paper-cut scene with stacked layers and softly cast shadows.',
      text: `Create one standalone 3:4 vertical artwork of Porto Tram 22. Image 1 controls the subject, setting, perspective, proportions, and color atmosphere. Preserve the tram and recognizable Porto street details; simplify only incidental clutter. Image 2 is a material and style reference only—do not copy its subject, objects, text, or composition.

STYLE: Refined paper sculpture combining layered cut-paper forms, a dimensional papercraft diorama, and architectural relief. Build the whole scene from precise overlapping paper layers with sculpted edges, subtle cast shadows, delicate translucency, and believable paper texture. Let the paper forms create the scene; do not place a decorative frame over an unchanged photo. Keep the lighting soft and natural, with restrained photo-inspired color. Aim for a spacious, elegant contemporary art-poster composition with architectural editorial sensibility. Avoid glossy CGI, plastic surfaces, childish craft textures, and effects that compete with the tram.

OUTPUT: One cohesive, continuous artwork only. No original-photo panel, comparison, split, diptych, collage, border, divider, caption, added text, logo, or watermark.`
    },
    'fuji': {
      title: 'Fuji in Bloom',
      summary: 'A spring travel photograph translated into a raised-paint treatment while retaining the pagoda, blossoms, and Mount Fuji.',
      text: `Create one standalone vertical painting of the scene in Image 1. Preserve its subject identity, pose, proportions, perspective, important objects, architecture, landscape contours, and essential details. Simplify only incidental background clutter. Add nothing absent from the source.

STYLE: Premium handmade oil painting with thick, tactile palette-knife impasto and sculptural relief. Form organically connected raised ridges and fractured paint shapes with softly lit edges and recessed shadows. Let marks follow the subject’s form and the scene’s structure—such as fur, fabric, architecture, terrain, clouds, or water. Avoid random cracks, flat filters, and crack overlays. Preserve fine facial and other defining details with smoother localized paint. Keep foreground texture defined and distant texture softer. Use soft matte lighting, restrained contrast, and an atmospheric mood.

COLOR: Derive a distinct palette from Image 1. Use at least three related tonal values for highlights, midtones, and shadows; keep any contrasting temperature accents subtle. Do not reuse a fixed palette across images.

OUTPUT: One complete, edge-to-edge artwork only. No original-photo panel, comparison, split, diptych, collage, frame, border, added text, label, logo, or watermark. Retain source signage only when it is an integral, legible part of the scene.`
    },
    'striped-tabby': {
      title: 'Striped Tabby on a Weathered Roof',
      summary: 'A rooftop tabby translated into a minimalist flat-vector editorial illustration with clean outlines and photo-inspired color blocking.',
      text: `Create one standalone 3:4 vertical illustration of Image 1’s striped tabby on the weathered roof. Preserve the cat’s coat pattern, yellow-green eyes, seated pose, proportions, and recognizable silhouette. Keep the essential roof and leafy setting, simplifying incidental detail. Image 2 guides style only; do not copy its subject, palette, or composition.

STYLE: Minimalist flat-vector fashion editorial. Use clean flowing shapes, ultra-fine consistent outlines, crisp color blocks, and restrained one- or two-tone shadows. Keep the result polished and graphic. No gradients, realistic textures, or painterly effects.

COLOR AND COMPOSITION: Choose up to four main colors from Image 1: a dominant subject color, one contrasting accent, an optional small detail color, and a separate muted-light solid background. Keep the cat at a similar scale and orientation, occupying roughly 55–65% of the canvas, with generous negative space. Preserve the details needed to recognize the cat and setting.

OUTPUT: One complete illustration only. No photo panel, comparison, split, collage, text, title, label, logo, watermark, frame, or decorative additions.`
    },
    'camper': {
      title: 'Camper Van',
      summary: 'A camper-van scene reimagined as a unified artwork, using a separate image as the visual-style reference.',
      text: `Create one standalone 3:4 vertical artwork of the camper van in Image 1. Image 1 controls the subject, recognizable features, pose, setting, and story. Image 2 controls the art style only—its medium, marks, palette, texture, and mood. Never copy Image 2’s subject, objects, or composition.

Preserve the camper van’s identity and defining details. Keep its essential silhouette, proportions, pose, and relationship to the setting; simplify distracting background elements without losing the source’s story. Recompose only when it improves the artwork, keeping a clear focal subject and intentional breathing room.

STYLE: Reinterpret the scene as a polished, cohesive artwork in Image 2’s visual language. Apply its line quality, shapes, texture, color relationships, and level of detail consistently across the canvas. Integrate distinctive reference treatments—such as paper layers, painted fields, or rough edges—into the scene itself.

OUTPUT: One finished image filling the canvas. No original-photo panel, comparison, split, diptych, collage, added labels, captions, text, logo, watermark, border, or decorative elements absent from the reference.`
    }
  };

  const backgroundObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const source = target.querySelector('.image-study-source');
          const result = target.querySelector('.image-study-result');
          if (source && result) {
            target.style.setProperty('--source-image', `url("${source.getAttribute('src')}")`);
            target.style.setProperty('--result-image', `url("${result.getAttribute('src')}")`);
            target.closest('.image-study-card')?.style.setProperty('--result-image', `url("${result.getAttribute('src')}")`);
          }
          observer.unobserve(target);
        });
      }, { rootMargin: '300px' })
    : null;

  document.querySelectorAll('.image-study-range').forEach((range) => {
    const viewer = range.closest('.image-study-compare');
    const divider = viewer?.querySelector('.image-study-divider');
    if (!divider) return;
    const source = viewer.querySelector('.image-study-source');
    const result = viewer.querySelector('.image-study-result');
    if (backgroundObserver) backgroundObserver.observe(viewer);
    else if (source && result) {
      viewer.style.setProperty('--source-image', `url("${source.getAttribute('src')}")`);
      viewer.style.setProperty('--result-image', `url("${result.getAttribute('src')}")`);
      viewer.closest('.image-study-card')?.style.setProperty('--result-image', `url("${result.getAttribute('src')}")`);
    }
    const update = () => {
      const split = Number(range.value);
      viewer.style.setProperty('--split', `${split}%`);
      range.setAttribute('aria-valuetext', `${split}% original photo above; ${100 - split}% prompt result below.`);
    };
    let pointerOffset = 0;
    const moveToPointer = (event) => {
      const bounds = viewer.getBoundingClientRect();
      const pointerPercent = ((event.clientY - bounds.top - pointerOffset) / bounds.height) * 100;
      const minimum = Number(range.min || 0);
      const maximum = Number(range.max || 100);
      const split = Math.max(minimum, Math.min(maximum, pointerPercent));
      range.value = String(Math.round(split * 10) / 10);
      update();
    };
    let activePointer = null;
    divider.addEventListener('pointerdown', (event) => {
      if (activePointer !== null || !event.isPrimary || event.button !== 0) return;
      const bounds = viewer.getBoundingClientRect();
      pointerOffset = event.clientY - bounds.top - bounds.height * Number(range.value) / 100;
      activePointer = event.pointerId;
      if (event.pointerType === 'mouse') range.focus({ preventScroll: true });
      divider.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    divider.addEventListener('pointermove', (event) => {
      if (activePointer === event.pointerId) moveToPointer(event);
    });
    const stopDragging = (event) => {
      if (activePointer !== event.pointerId) return;
      activePointer = null;
      if (divider.hasPointerCapture(event.pointerId)) divider.releasePointerCapture(event.pointerId);
    };
    divider.addEventListener('pointerup', stopDragging);
    divider.addEventListener('pointercancel', stopDragging);
    divider.addEventListener('lostpointercapture', stopDragging);
    range.addEventListener('input', update);
    update();
  });

  let lastTrigger = null;
  document.querySelectorAll('[data-study]').forEach((button) => {
    button.addEventListener('click', () => {
      const study = prompts[button.dataset.study];
      if (!study) return;
      lastTrigger = button;
      title.textContent = study.title;
      summary.textContent = study.summary;
      promptText.textContent = study.text;
      copyButton.textContent = 'Copy prompt';
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-prompt-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => lastTrigger?.focus());

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(promptText.textContent);
      copyButton.textContent = 'Copied';
      window.setTimeout(() => { copyButton.textContent = 'Copy prompt'; }, 1600);
    } catch {
      copyButton.textContent = 'Select prompt to copy';
    }
  });
})();
