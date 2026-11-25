(() => {
  const root = document.querySelector('[data-practice-tracker]');
  if (!root) return;

  const key = 'jade-practice-tracker-v1';
  const statuses = ['Scheduled', 'In progress', 'Awaiting reply', 'Blocked', 'Done'];
  const seed = [
    ['Book project check-in', 'Coordinator', 1, 2, 'Awaiting reply', 'Confirm two available slots; send the invite once approved.'],
    ['Prepare meeting agenda', 'Coordinator', 1, 2, 'In progress', 'Collect agenda items and flag decisions needed.'],
    ['Draft review', 'Project lead', 2, 3, 'Blocked', 'Assign a reviewer so work can begin.'],
    ['Organize shared documents', 'Coordinator', 2, 3, 'In progress', 'Index the latest files and retain source versions.'],
    ['Record check-in actions', 'Coordinator', 3, 3, 'Scheduled', 'Record decisions, action owners, and deadlines after the meeting.'],
    ['Send weekly handoff', 'Coordinator', 4, 5, 'Scheduled', 'Summarize open items and request approval before circulation.']
  ];
  const $ = (selector) => root.querySelector(selector);
  const body = $('[data-task-list]');
  const dialog = $('[data-task-dialog]');
  const form = $('[data-task-form]');
  const status = $('[data-tracker-status]');
  const dateAt = (offset) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const newSamples = () => seed.map(([title, owner, follow, due, state, next], index) => ({
    id: `sample-${index + 1}`, title, owner, follow: dateAt(follow), due: dateAt(due), state, next
  }));
  let tasks;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    tasks = Array.isArray(saved) && saved.every(item => item && typeof item.id === 'string') ? saved : newSamples();
  } catch { tasks = newSamples(); }

  function save() {
    try { localStorage.setItem(key, JSON.stringify(tasks)); }
    catch { status.textContent = 'Changes are available until you close this tab. Browser storage is unavailable.'; }
  }
  const oldSample = tasks.find(task => task.id === 'sample-3');
  if (oldSample?.title === 'Confirm draft review owner' &&
      oldSample.next === 'Ask the project lead to assign a review owner.') {
    oldSample.title = 'Draft review';
    oldSample.next = 'Assign a reviewer so work can begin.';
    save();
  }
  const cell = (row, text, tag = 'td') => {
    const element = document.createElement(tag);
    element.textContent = text;
    row.append(element);
    return element;
  };
  const formatDate = (value) => {
    if (!value) return '—';
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  function render() {
    const term = $('[data-task-search]').value.trim().toLowerCase();
    const filter = $('[data-task-filter]').value;
    const visible = tasks.filter(task => (filter === 'all' || task.state === filter) &&
      [task.title, task.owner, task.next, task.state].some(value => value.toLowerCase().includes(term)));
    const today = dateAt(0);
    $('[data-stat-total]').textContent = tasks.length;
    $('[data-stat-open]').textContent = tasks.filter(task => task.state !== 'Done').length;
    $('[data-stat-blocked]').textContent = tasks.filter(task => task.state === 'Blocked').length;
    $('[data-stat-due]').textContent = tasks.filter(task => task.state !== 'Done' && task.due <= today).length;
    body.replaceChildren();
    visible.forEach(task => {
      const row = document.createElement('tr');
      const name = cell(row, task.title, 'th'); name.scope = 'row';
      const owner = cell(row, task.owner); owner.dataset.label = 'Owner';
      const follow = cell(row, formatDate(task.follow)); follow.dataset.label = 'Follow up';
      const due = cell(row, formatDate(task.due));
      due.dataset.label = 'Due';
      if (task.state !== 'Done' && task.due < today) due.classList.add('tracker-overdue');
      const state = cell(row, ''); state.dataset.label = 'Status';
      const badge = document.createElement('span');
      badge.className = `tracker-state tracker-state--${task.state.toLowerCase().replaceAll(' ', '-')}`;
      badge.textContent = task.state;
      state.append(badge);
      const next = cell(row, task.next); next.dataset.label = 'Next action';
      const actions = cell(row, ''); actions.dataset.label = 'Action';
      const edit = document.createElement('button');
      edit.type = 'button'; edit.textContent = 'Edit'; edit.dataset.edit = task.id;
      edit.setAttribute('aria-label', `Edit ${task.title}`);
      actions.append(edit);
      body.append(row);
    });
    $('[data-tracker-count]').textContent = `${visible.length} of ${tasks.length} tasks shown`;
    $('[data-empty]').hidden = visible.length !== 0;
  }
  function open(task) {
    form.reset();
    form.elements.id.value = task?.id || '';
    for (const name of ['title', 'owner', 'follow', 'due', 'state', 'next']) {
      form.elements[name].value = task?.[name] || (name === 'state' ? 'Scheduled' : '');
    }
    $('[data-dialog-title]').textContent = task ? 'Edit task' : 'Add task';
    $('[data-delete-task]').hidden = !task;
    dialog.showModal();
    form.elements.title.focus();
  }
  $('[data-add-task]').addEventListener('click', () => open());
  body.addEventListener('click', event => {
    const button = event.target.closest('[data-edit]');
    if (button) open(tasks.find(task => task.id === button.dataset.edit));
  });
  $('[data-cancel-task]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.follow > data.due) {
      form.elements.follow.setCustomValidity('Follow-up must be on or before the due date.');
      form.elements.follow.reportValidity();
      return;
    }
    const task = { id: data.id || (crypto.randomUUID?.() || `task-${Date.now()}`), ...data };
    const index = tasks.findIndex(item => item.id === task.id);
    if (index < 0) tasks.push(task); else tasks[index] = task;
    save(); dialog.close(); render();
    status.textContent = index < 0 ? 'Task added.' : 'Task updated.';
  });
  form.elements.follow.addEventListener('input', () => form.elements.follow.setCustomValidity(''));
  $('[data-delete-task]').addEventListener('click', () => {
    const task = tasks.find(item => item.id === form.elements.id.value);
    if (!task || !confirm(`Delete “${task.title}”?`)) return;
    tasks = tasks.filter(item => item.id !== task.id);
    save(); dialog.close(); render(); status.textContent = 'Task deleted.';
  });
  for (const selector of ['[data-task-search]', '[data-task-filter]']) {
    $(selector).addEventListener('input', render);
  }
  $('[data-reset-sample]').addEventListener('click', () => {
    if (!confirm('Replace all current tasks with the six practice tasks?')) return;
    tasks = newSamples(); save(); render(); status.textContent = 'Practice tasks restored.';
  });
  render();
})();
