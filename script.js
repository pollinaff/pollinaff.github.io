// script.js

// 1) Часы в заголовке (Title)
(function startTitleClock() {
  const base = document.title.replace(/\s+\|.+$/, '');
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    document.title = `${base} | ${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
})();

// 2) Кнопки смены фона
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      document.documentElement.style.setProperty('--bg', color || '#ffffff');
    });
  });

  // 3) Автопрокрутка через 5 секунд к #author (если есть на странице)
  const autoBtn = document.getElementById('btnAutoScroll');
  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      autoBtn.disabled = true;
      autoBtn.textContent = 'Таймер запущен... (5 c)';
      setTimeout(() => {
        const target = document.getElementById('author') || document.body;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        autoBtn.textContent = 'Готово!';
      }, 5000);
    });
  }

  // 4) Pop-up текущей даты
  const btnShowDate = document.getElementById('btnShowDate');
  if (btnShowDate) {
    btnShowDate.addEventListener('click', () => {
      const now = new Date();
      alert(`Сегодня: ${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU')}`);
    });
  }

  // Дополнительно: текстовые операции

  const input = document.getElementById('inputSentence');

  // Удалить слова > 7 букв (pop-up)
  const btnRemoveLong = document.getElementById('btnRemoveLong');
  if (btnRemoveLong && input) {
    btnRemoveLong.addEventListener('click', () => {
      const txt = input.value || '';
      const result = txt
        .split(/\s+/)
        .filter(w => w.replace(/[.,!?;:()"«»]/g, '').length <= 7)
        .join(' ');
      alert(result || 'Пусто');
    });
  }

  // Найти наиболее частую букву (pop-up)
  const btnMostLetter = document.getElementById('btnMostLetter');
  if (btnMostLetter && input) {
    btnMostLetter.addEventListener('click', () => {
      const txt = (input.value || '').toLowerCase().replace(/[^a-zа-яё]/gi, '');
      if (!txt) { alert('Нет букв'); return; }
      const freq = {};
      for (const ch of txt) freq[ch] = (freq[ch] || 0) + 1;
      let best = null, bestN = 0;
      for (const [ch, n] of Object.entries(freq)) {
        if (n > bestN) { best = ch; bestN = n; }
      }
      alert(`Частая буква: "${best}" (${bestN} раз)`);
    });
  }

  // Удалить цифры и вывести результат в новом окне
  const btnRemoveDigits = document.getElementById('btnRemoveDigits');
  if (btnRemoveDigits && input) {
    btnRemoveDigits.addEventListener('click', () => {
      const txt = input.value || '';
      const result = txt.replace(/\d+/g, '');
      const win = window.open('', '_blank', 'width=600,height=400');
      if (win) {
        win.document.write(`
          <!doctype html>
          <html lang="ru"><head><meta charset="utf-8"><title>Результат</title></head>
          <body style="font-family:Segoe UI,Arial,sans-serif;padding:16px;">
            <h1>Результат без цифр</h1>
            <p>${result.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
          </body></html>
        `);
        win.document.close();
      } else {
        alert('Браузер заблокировал всплывающее окно.');
      }
    });
  }
});