const contactForm = document.querySelector('#contact-form');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const recipient = contactForm.dataset.recipient;
  const status = document.querySelector('#contact-form-status');
  if (!recipient) {
    status.textContent = 'Email is not available yet. Please reach me on LinkedIn above.';
    return;
  }

  const fields = new FormData(contactForm);
  const name = String(fields.get('name') || '').trim();
  const email = String(fields.get('email') || '').trim();
  const interest = String(fields.get('interest') || '').trim();
  const message = String(fields.get('message') || '').trim();
  if (!name || !email || !message) {
    status.textContent = 'Please add your name, email, and a few details.';
    return;
  }

  const subject = interest ? `Portfolio inquiry: ${interest}` : 'Portfolio inquiry';
  const body = [
    `Hello Jade,`,
    '',
    message,
    '',
    `Regarding: ${interest || 'General inquiry'}`,
    `From: ${name}`,
    `Reply to: ${email}`
  ].join('\n');

  status.textContent = 'Your email app should open with this message. Review it and press Send there.';
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
