/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Authentication
   ═══════════════════════════════════════════ */

const Auth = (() => {
  function switchTab(t) {
    document.querySelectorAll('.auth-tab').forEach((el, i) =>
      el.classList.toggle('active', t === 'login' ? i === 0 : i === 1));
    document.getElementById('login-form').style.display = t === 'login' ? 'flex' : 'none';
    document.getElementById('register-form').style.display = t !== 'login' ? 'flex' : 'none';
    clearMsgs();
  }

  function clearMsgs() {
    ['login-err', 'reg-err', 'reg-ok', 'profile-err', 'profile-ok'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.style.display = 'none'; el.textContent = ''; }
    });
  }

  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  function showOk(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  function register() {
    clearMsgs();
    const name = document.getElementById('reg-name').value.trim();
    const uname = document.getElementById('reg-u').value.trim().toLowerCase();
    const pass = document.getElementById('reg-p').value;
    const conf = document.getElementById('reg-c').value;
    if (!name) return showErr('reg-err', 'الرجاء إدخال اسمك الكامل');
    if (!uname || !/^[a-z0-9_]+$/.test(uname)) return showErr('reg-err', 'اسم المستخدم: حروف إنجليزية وأرقام فقط');
    if (pass.length < 6) return showErr('reg-err', 'كلمة المرور 6 أحرف على الأقل');
    if (pass !== conf) return showErr('reg-err', 'كلمتا المرور غير متطابقتين');
    const users = Storage.users();
    if (users[uname]) return showErr('reg-err', 'اسم المستخدم مستخدم بالفعل');
    users[uname] = { name, uname, pass, created: Date.now(), avatar: '' };
    Storage.saveUsers(users);
    showOk('reg-ok', '✅ تم إنشاء حسابك! سيتم تحويلك...');
    setTimeout(() => switchTab('login'), 1600);
  }

  function login() {
    clearMsgs();
    const uname = document.getElementById('login-u').value.trim().toLowerCase();
    const pass = document.getElementById('login-p').value;
    if (!uname || !pass) return showErr('login-err', 'أدخل اسم المستخدم وكلمة المرور');
    const users = Storage.users();
    if (!users[uname] || users[uname].pass !== pass)
      return showErr('login-err', 'اسم المستخدم أو كلمة المرور غير صحيحة');
    Storage.setSession(uname);
    App.start(users[uname]);
  }

  function logout() {
    Storage.clearSession();
    App.user = null;
    App.tasks = [];
    document.getElementById('app-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('login-u').value = '';
    document.getElementById('login-p').value = '';
    clearMsgs();
  }

  function autoLogin() {
    const sess = Storage.session();
    if (sess) {
      const u = Storage.users()[sess];
      if (u) { App.start(u); return true; }
    }
    document.getElementById('auth-screen').style.display = 'flex';
    return false;
  }

  return { switchTab, register, login, logout, autoLogin, clearMsgs, showErr, showOk };
})();
