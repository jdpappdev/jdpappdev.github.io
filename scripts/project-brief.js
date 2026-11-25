(() => {
  const projectTriggers = document.querySelectorAll(
    '.selected-projects-grid [data-project-brief], .creative-card .button-row [data-creative-brief]'
  );
  if (!projectTriggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'project-brief';
  dialog.setAttribute('aria-labelledby', 'project-brief-label');
  dialog.innerHTML = `
    <div class="project-brief__shell">
      <header class="project-brief__header">
        <p class="project-brief__eyebrow" id="project-brief-label">Project brief</p>
        <button class="project-brief__close" type="button" aria-label="Close project brief">×</button>
      </header>
      <div class="project-brief__body"></div>
    </div>`;
  document.body.append(dialog);

  const body = dialog.querySelector('.project-brief__body');
  const closeButton = dialog.querySelector('.project-brief__close');
  let lastTrigger = null;

  function closeBrief() {
    dialog.close();
    document.body.classList.remove('project-brief-open');
    lastTrigger?.focus();
  }

  function renderBrief(project, isDeveloper) {
    const hero = document.createElement('section');
    hero.className = 'detail-hero';
    const image = isDeveloper
      ? ''
      : project.image
        ? `<figure class="detail-visual"><img src="${project.image}" alt="${project.alt}" loading="lazy"><figcaption>${project.caption}</figcaption></figure>`
        : '<div class="image-placeholder"><span>Project overview</span></div>';
    const secondaryUrl = project.repo || project.extra;
    const secondaryLink = secondaryUrl
      ? `<a class="button secondary" target="_blank" rel="noreferrer" href="${secondaryUrl}">${project.repo ? 'View source code' : project.extraLabel}</a>`
      : '';
    hero.innerHTML = `<div class="wrap detail-grid"><div><p class="eyebrow">${project.type}</p><h1>${project.title}</h1><p class="lede"><strong>${project.subtitle}</strong></p><p>${project.description}</p><div class="button-row"><a class="button primary" target="_blank" rel="noreferrer" href="${project.link}">${project.label}</a>${secondaryLink}</div></div>${image}</div>`;
    body.replaceChildren(hero);

    const steps = project.process.map((step) => `<li>${step}</li>`).join('');
    const detailsSection = document.createElement('section');
    detailsSection.className = 'section rule-top';
    detailsSection.innerHTML = `<div class="wrap"><div class="content-grid"><div><h3>My role</h3><p>${project.role}</p><h3 style="margin-top:30px">Process</h3><ul class="list-clean">${steps}</ul></div><aside><div class="callout"><p class="eyebrow">Tools used</p><p>${project.tools}</p></div><div class="callout warning" style="margin-top:16px"><p class="eyebrow">Current status</p><p><strong>${project.status}</strong></p>${project.limitation ? `<p>${project.limitation}</p>` : ''}</div></aside></div></div></section>`;
    const disclosure = document.createElement('details');
    disclosure.className = 'project-brief__details';
    disclosure.innerHTML = '<summary>Project details</summary>';
    disclosure.append(detailsSection);
    body.append(disclosure);
  }

  projectTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const project = trigger.dataset.projectBrief
        ? window.developerBriefs?.[trigger.dataset.projectBrief]
        : window.creativeBriefs?.[trigger.dataset.creativeBrief];
      if (!project) return;
      lastTrigger = trigger;
      const isDeveloper = Boolean(trigger.dataset.projectBrief);
      dialog.classList.toggle('project-brief--developer', isDeveloper);
      renderBrief(project, isDeveloper);
      document.body.classList.add('project-brief-open');
      dialog.show();
    });
  });

  closeButton.addEventListener('click', closeBrief);
  dialog.addEventListener('close', () => document.body.classList.remove('project-brief-open'));
})();
