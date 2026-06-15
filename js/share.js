/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Share Manager
   ═══════════════════════════════════════════ */

const Share = (() => {
  let taskId = null;

  function open(id) {
    taskId = id;
    openModal('shareModal');
  }

  function share(platform) {
    const t = App.tasks.find(x => x.id === taskId);
    if (!t) return;
    const qLabels = {
      q1: '🔴 مهم وعاجل',
      q2: '🟢 مهم وغير عاجل',
      q3: '🟡 غير مهم وعاجل',
      q4: '⚫ غير مهم وغير عاجل'
    };
    const text = `📋 مهمة من مصفوفة أيزنهاور\n\n${t.text}\n\nالأولوية: ${qLabels[t.q]}\nالحالة: ${t.done ? '✅ مكتملة' : '⏳ معلّقة'}\n\n🎯 مصفوفة أيزنهاور - نظّم وقتك`;

    if (platform === 'whatsapp') {
      window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    } else if (platform === 'telegram') {
      window.open('https://t.me/share/url?url=&text=' + encodeURIComponent(text), '_blank');
    } else if (platform === 'twitter') {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text), '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(text).then(() => alert('✅ تم نسخ المهمة!'));
    }
    closeModal('shareModal');
  }

  return { open, share };
})();
