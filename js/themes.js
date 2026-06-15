/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Theme Manager
   ═══════════════════════════════════════════ */

const Themes = (() => {
  const themeMap = { dark: 0, light: 1, ocean: 2, forest: 3, sunset: 4 };

  function set(theme, el) {
    document.body.setAttribute('data-theme', theme);
    Storage.saveTheme(theme);
    document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  function applySaved() {
    const saved = Storage.theme();
    document.body.setAttribute('data-theme', saved);
  }

  function initProfileSelector() {
    const saved = Storage.theme();
    document.querySelectorAll('.theme-option').forEach((el, i) => {
      el.classList.toggle('active', i === themeMap[saved]);
    });
  }

  return { set, applySaved, initProfileSelector };
})();
