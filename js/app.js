/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Main App Controller
   ═══════════════════════════════════════════ */

const App = (() => {
  let user = null;
  let tasks = [];

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const timeAgo = ts => {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return 'الآن';
    if (m < 60) return `${m} دقيقة`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} ساعة`;
    return `${Math.floor(h / 24)} يوم`;
  };

  function start(u) {
    user = u;
    tasks = Storage.tasks(u.uname);
    updateAvatar(u);
    document.getElementById('nav-uname').textContent = u.name;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    Themes.applySaved();
    EmojiPicker.init();
    Motivation.load().then(() => Motivation.start());
    render();
  }

  function updateAvatar(u) {
    const navAva = document.getElementById('nav-avatar');
    if (u.avatar) {
      navAva.innerHTML = `<img src="${u.avatar}" style="width:100%;height:100%;object-fit:cover">`;
    } else {
      navAva.textContent = u.name[0].toUpperCase();
    }
  }

  function render() {
    const vis = Tasks.getFiltered();
    const byQ = { q1: [], q2: [], q3: [], q4: [] };
    vis.forEach(t => byQ[t.q].push(t));

    ['q1', 'q2', 'q3', 'q4'].forEach(q => {
      const list = document.getElementById('list-' + q);
      const badge = document.getElementById('badge-' + q);
      const prog = document.getElementById('prog-' + q);
      const ptxt = document.getElementById('prog-txt-' + q);

      const all = tasks.filter(t => t.q === q);
      const done = all.filter(t => t.done).length;
      const pct = all.length ? Math.round(done / all.length * 100) : 0;

      badge.textContent = all.length;
      prog.style.width = pct + '%';
      ptxt.textContent = `${done} / ${all.length} مكتمل`;

      if (!byQ[q].length) {
        const msgs = {
          q1: 'لا توجد مهام عاجلة ومهمة 🎉',
          q2: 'لا توجد مهام للجدولة',
          q3: 'لا توجد مهام للتفويض',
          q4: 'لا توجد مهام هنا — ممتاز!'
        };
        const icons = { q1: '🔴', q2: '🟢', q3: '🟡', q4: '⚫' };
        list.innerHTML = `<div class="empty-state"><div class="empty-icon">${icons[q]}</div><div class="empty-text">${msgs[q]}</div></div>`;
        return;
      }

      list.innerHTML = byQ[q].map(t => `
        <div class="task-item ${t.done ? 'done' : ''}">
          <div class="task-check" onclick="Tasks.toggleDone('${t.id}')">${t.done ? '✓' : ''}</div>
          <div class="task-body">
            <div class="task-text">${esc(t.text)}</div>
            <div class="task-meta">
              <span>⏱ ${timeAgo(t.ts)}</span>
              ${t.done ? '<div class="task-meta-dot"></div><span style="color:#10b981">✓ مكتملة</span>' : ''}
            </div>
          </div>
          <div class="task-actions">
            <button class="task-btn share-btn" onclick="Share.open('${t.id}')" title="مشاركة">📤</button>
            <button class="task-btn" onclick="Tasks.deleteTask('${t.id}')" title="حذف">✕</button>
          </div>
        </div>
      `).join('');
    });

    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    document.getElementById('s-total').textContent = total;
    document.getElementById('s-done').textContent = done;
    document.getElementById('s-pend').textContent = total - done;
    document.getElementById('s-pct').textContent = pct + '%';
    document.getElementById('nav-done').textContent = done;
    document.getElementById('nav-total').textContent = total;
    document.getElementById('nav-pct').textContent = pct + '%';
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const id = document.activeElement.id;
    if (id === 'taskInput') Tasks.add();
    if (id === 'login-u' || id === 'login-p') Auth.login();
    if (id === 'reg-c') Auth.register();
  });

  // Modal helpers (global)
  window.openModal = function(id) { document.getElementById(id).classList.add('show'); };
  window.closeModal = function(id) { document.getElementById(id).classList.remove('show'); };

  // Auto login on page load
  window.addEventListener('DOMContentLoaded', () => {
    EmojiPicker.init();
    if (!Auth.autoLogin()) {
      document.getElementById('auth-screen').style.display = 'flex';
    }
  });

  return {
    get user() { return user; },
    set user(value) { user = value; },
    get tasks() { return tasks; },
    set tasks(value) { tasks = value; },
    start,
    updateAvatar,
    render
  };
})();
