/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Excel Export
   ═══════════════════════════════════════════ */

const Excel = (() => {
  function download() {
    const qNames = {
      q1: 'مهم وعاجل (افعله الآن)',
      q2: 'مهم وغير عاجل (جدوله)',
      q3: 'غير مهم وعاجل (فوّضه)',
      q4: 'غير مهم وغير عاجل (احذفه)'
    };

    // Build CSV with BOM for Arabic
    let csv = '\uFEFF';
    csv += 'المهمة,الأولوية,الحالة,تاريخ الإضافة\n';
    App.tasks.forEach(t => {
      const status = t.done ? 'مكتملة' : 'معلّقة';
      const date = new Date(t.ts).toLocaleDateString('ar-SA');
      csv += `"${t.text}","${qNames[t.q]}","${status}","${date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'تقرير_مصفوفة_أيزنهاور_' + new Date().toLocaleDateString('ar-SA') + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return { download };
})();
