/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Backup Manager
   ═══════════════════════════════════════════ */

const Backup = (() => {
  function exportData() {
    const data = Storage.exportData(App.user.uname);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_' + App.user.uname + '_' + Date.now() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (Storage.importData(App.user.uname, e.target.result)) {
        App.tasks = Storage.tasks(App.user.uname);
        App.render();
        alert('✅ تم استعادة البيانات بنجاح!');
      } else {
        alert('❌ ملف النسخ الاحتياطي غير صالح');
      }
    };
    reader.readAsText(file);
  }

  return { exportData, importData };
})();
