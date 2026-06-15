/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Reports Manager
   ═══════════════════════════════════════════ */

const Reports = (() => {
  function open() {
    const total = App.tasks.length;
    const done = App.tasks.filter(t => t.done).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    document.getElementById('r-total').textContent = total;
    document.getElementById('r-done').textContent = done;
    document.getElementById('r-pend').textContent = total - done;
    document.getElementById('r-pct').textContent = pct + '%';

    const qNames = { q1: '🔴 افعله الآن', q2: '🟢 جدوله', q3: '🟡 فوّضه', q4: '⚫ احذفه' };
    const qColors = {
      q1: 'linear-gradient(90deg,#ff4d6d,#ff6b6b)',
      q2: 'linear-gradient(90deg,#06d6a0,#10b981)',
      q3: 'linear-gradient(90deg,#ffd166,#f59e0b)',
      q4: 'linear-gradient(90deg,#7c6cf7,#6366f1)'
    };

    let chartHTML = '';
    ['q1', 'q2', 'q3', 'q4'].forEach(q => {
      const count = App.tasks.filter(t => t.q === q).length;
      const max = Math.max(1, total);
      const w = Math.round(count / max * 100);
      chartHTML += `<div class="chart-bar-wrap"><div class="chart-label">${qNames[q]}</div><div class="chart-bar-bg"><div class="chart-bar-fill" style="width:${w}%;background:${qColors[q]}"></div></div><div class="chart-bar-val">${count}</div></div>`;
    });
    document.getElementById('reportChart').innerHTML = chartHTML;

    let doneHTML = '';
    ['q1', 'q2', 'q3', 'q4'].forEach(q => {
      const all = App.tasks.filter(t => t.q === q);
      const d = all.filter(t => t.done).length;
      const pct2 = all.length ? Math.round(d / all.length * 100) : 0;
      doneHTML += `<div class="chart-bar-wrap"><div class="chart-label">${qNames[q]}</div><div class="chart-bar-bg"><div class="chart-bar-fill" style="width:${pct2}%;background:${qColors[q]}"></div></div><div class="chart-bar-val">${pct2}%</div></div>`;
    });
    document.getElementById('reportChartDone').innerHTML = doneHTML;

    openModal('reportsModal');
  }

  return { open };
})();
