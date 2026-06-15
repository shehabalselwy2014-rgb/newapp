/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Profile Manager
   ═══════════════════════════════════════════ */

const Profile = (() => {
  function open() {
    if (!App.user) return;
    document.getElementById('edit-name').value = App.user.name;
    document.getElementById('edit-u').value = App.user.uname;
    document.getElementById('edit-old-p').value = '';
    document.getElementById('edit-new-p').value = '';
    Auth.clearMsgs();

    const pAva = document.getElementById('profileAvatar');
    const pText = document.getElementById('profileAvatarText');
    const pImg = document.getElementById('profileAvatarImg');
    if (App.user.avatar) {
      pImg.src = App.user.avatar; pImg.style.display = 'block';
      pText.style.display = 'none';
    } else {
      pImg.style.display = 'none';
      pText.style.display = 'block';
      pText.textContent = App.user.name[0].toUpperCase();
    }

    Themes.initProfileSelector();
    openModal('profileModal');
  }

  function uploadAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('الصورة كبيرة جدًا! الحد الأقصى 2 ميجا'); return; }
    const reader = new FileReader();
    reader.onload = function(ev) {
      const img = ev.target.result;
      document.getElementById('profileAvatarImg').src = img;
      document.getElementById('profileAvatarImg').style.display = 'block';
      document.getElementById('profileAvatarText').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  function save() {
    Auth.clearMsgs();
    const name = document.getElementById('edit-name').value.trim();
    const oldPass = document.getElementById('edit-old-p').value;
    const newPass = document.getElementById('edit-new-p').value;
    const pImg = document.getElementById('profileAvatarImg');

    if (!name) return Auth.showErr('profile-err', 'الرجاء إدخال الاسم');
    if (oldPass !== App.user.pass) return Auth.showErr('profile-err', 'كلمة المرور الحالية غير صحيحة');

    const users = Storage.users();
    users[App.user.uname].name = name;
    if (pImg.style.display !== 'none' && pImg.src) users[App.user.uname].avatar = pImg.src;
    if (newPass) {
      if (newPass.length < 6) return Auth.showErr('profile-err', 'كلمة المرور الجديدة 6 أحرف على الأقل');
      users[App.user.uname].pass = newPass;
    }
    Storage.saveUsers(users);
    App.user = users[App.user.uname];
    App.updateAvatar(App.user);
    document.getElementById('nav-uname').textContent = name;
    Auth.showOk('profile-ok', '✅ تم حفظ التغييرات بنجاح!');
    App.render();
  }

  function deleteAccount() {
    if (!confirm('⚠️ هل أنت متأكد من حذف حسابك نهائيًا؟ سيتم حذف جميع بياناتك ومهامك!')) return;
    const users = Storage.users();
    delete users[App.user.uname];
    Storage.saveUsers(users);
    localStorage.removeItem('ei_t_' + App.user.uname);
    Storage.clearSession();
    Auth.logout();
  }

  return { open, uploadAvatar, save, deleteAccount };
})();
