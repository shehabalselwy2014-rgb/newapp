/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Task Manager
   ═══════════════════════════════════════════ */

const Tasks = (() => {
  let filter = 'all';

  function setFilter(f, btn) {
    filter = f;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    App.render();
  }

  function add() {
    const inp = document.getElementById('taskInput');
    const text = inp.value.trim();
    if (!text) { inp.focus(); return; }
    const q = document.getElementById('qSelect').value;
    App.tasks.push({ id: Date.now().toString(), text, q, done: false, ts: Date.now() });
    Storage.saveTasks(App.user.uname, App.tasks);
    App.render();
    inp.value = '';
    inp.focus();
  }

  function toggleDone(id) {
    const t = App.tasks.find(t => t.id === id);
    if (t) { t.done = !t.done; Storage.saveTasks(App.user.uname, App.tasks); App.render(); }
  }

  function deleteTask(id) {
    App.tasks = App.tasks.filter(t => t.id !== id);
    Storage.saveTasks(App.user.uname, App.tasks);
    App.render();
  }

  function clearDone() {
    if (!App.tasks.filter(t => t.done).length) return;
    if (confirm('حذف جميع المهام المكتملة؟')) {
      App.tasks = App.tasks.filter(t => !t.done);
      Storage.saveTasks(App.user.uname, App.tasks);
      App.render();
    }
  }

  function getFiltered() {
    return App.tasks.filter(t =>
      filter === 'all' ? true : filter === 'done' ? t.done : !t.done);
  }

  return { setFilter, add, toggleDone, deleteTask, clearDone, getFiltered };
})();
