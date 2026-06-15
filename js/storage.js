/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Storage Layer
   ═══════════════════════════════════════════ */

const Storage = {
  users: () => JSON.parse(localStorage.getItem('ei_users') || '{}'),
  saveUsers: (u) => localStorage.setItem('ei_users', JSON.stringify(u)),
  session: () => localStorage.getItem('ei_sess') || null,
  setSession: (u) => localStorage.setItem('ei_sess', u),
  clearSession: () => localStorage.removeItem('ei_sess'),
  tasks: (u) => JSON.parse(localStorage.getItem('ei_t_' + u) || '[]'),
  saveTasks: (u, t) => localStorage.setItem('ei_t_' + u, JSON.stringify(t)),
  theme: () => localStorage.getItem('ei_theme') || 'dark',
  saveTheme: (t) => localStorage.setItem('ei_theme', t),

  // Backup & Restore
  exportData: (uname) => {
    const users = Storage.users();
    const user = users[uname];
    const tasks = Storage.tasks(uname);
    return JSON.stringify({ user, tasks, exportedAt: Date.now() }, null, 2);
  },

  importData: (uname, jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.user || !data.tasks) return false;
      const users = Storage.users();
      users[uname] = data.user;
      Storage.saveUsers(users);
      Storage.saveTasks(uname, data.tasks);
      return true;
    } catch (e) {
      return false;
    }
  }
};
