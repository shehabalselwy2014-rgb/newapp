/* ═══════════════════════════════════════════
   Eisenhower Matrix Pro — Motivation Bar
   ═══════════════════════════════════════════ */

const Motivation = (() => {
  let quotes = [];
  let current = 0;
  let interval = null;

  async function load() {
    try {
      const res = await fetch('data/quotes.json');
      quotes = await res.json();
    } catch (e) {
      // Fallback quotes
      quotes = [
        "النجاح ليس نهائيًا، والفشل ليس قاتلًا — الجرأة على الاستمرار هي ما يهم.",
        "لا تنتظر الفرصة، اصنعها بنفسك.",
        "كل يوم هو فرصة جديدة لتصبح نسخة أفضل من نفسك.",
        "العقل القوي يخلق واقعًا قويًا.",
        "لا تستسلم أبدًا — أعظم إنجازاتك تنتظرك في نهاية الطريق.",
        "التحدي هو باب النمو، ادخله بشجاعة.",
        "أنت أقوى مما تعتقد، وأكثر قدرة مما تتخيل.",
        "الاستمرار هو السر — كل خطوة صغيرة تقربك من هدفك الكبير.",
        "لا تقل 'لا أستطيع' قبل أن تجرب — المستحيل مجرد كلمة.",
        "التنظيم هو مفتاح النجاح — رتب أفكارك وسترتب حياتك.",
        "الوقت هو أثمن ما تملك — استثمره بحكمة.",
        "كل صباح هو بداية جديدة — ابدأها بإيجابية.",
        "لا تقارن نفسك بالآخرين — أنت في سباقك الخاص.",
        "الإنجاز يبدأ بقرار — قرر أن تبدأ الآن.",
        "الثقة بالنفس نصف الطريق إلى النجاح."
      ];
    }
  }

  function rotate() {
    current = (current + 1) % quotes.length;
    const el = document.getElementById('motivationText');
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
      el.innerHTML = '<span>"' + quotes[current] + '"</span>';
      el.style.opacity = '1';
    }, 300);
  }

  function start() {
    if (interval) clearInterval(interval);
    interval = setInterval(rotate, 8000);
  }

  function stop() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  return { load, start, stop, rotate };
})();
