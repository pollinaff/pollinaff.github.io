function changeBackground(color) {
  document.documentElement.style.setProperty('--bg', color);
}

function autoScroll() {
  const targetY = Math.min(
    document.body.scrollHeight - window.innerHeight,
    window.scrollY + 400
  );
  window.scrollTo({ top targetY, behavior 'smooth' });
}

function startTitleClock() {
  function pad(n) { return n  10  '0' + n  '' + n; }
  setInterval(() = {
    const now = new Date();
    const hh = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    const base = document.title.replace(ssd{2}d{2}d{2}$, '');
    document.title = `${base}  ${hh}${mm}${ss}`;
  }, 1000);
}

function showCurrentDate() {
  const now = new Date();
  alert(now.toLocaleString());
}

function getSentence() {
  const area = document.getElementById('sentence');
  if (area && area.value.trim()) return area.value.trim();
  const fromPrompt = prompt('Введите предложение');
  return (fromPrompt  '').trim();
}

function removeLongWords() {
  const s = getSentence();
  if (!s) return alert('Пустой ввод.');
  const result = s
    .split(s+)
    .filter(word = word.replace([^p{L}p{N}_-]gu, '').length = 7)
    .join(' ');
  alert(result);
}

function mostFrequentLetter() {
  const s = getSentence();
  if (!s) return alert('Пустой ввод.');
  const freq = new Map();
  for (const ch of s.toLowerCase()) {
    if ([a-zа-яё]i.test(ch)) {
      freq.set(ch, (freq.get(ch)  0) + 1);
    }
  }
  if (freq.size === 0) return alert('Букв не найдено.');
  let maxChar = '';
  let maxCount = -1;
  for (const [ch, count] of freq.entries()) {
    if (count  maxCount) {
      maxCount = count;
      maxChar = ch;
    }
  }
  alert(`Самая частая буква ${maxChar} (${maxCount})`);
}

function removeDigitsOpenNew() {
  const s = getSentence();
  if (!s) return alert('Пустой ввод.');
  const result = s.replace(d+g, '');
  const w = window.open('', '_blank', 'noopener,noreferrer');
  if (w) {
    w.document.write(`
      !doctype html
      meta charset=utf-8
      titleРезультат без цифрtitle
      pre style=font-family system-ui, -apple-system, Segoe UI, Roboto, Arial; white-space pre-wrap; line-height1.5; padding16px;${result.replace([&']g, s = ({
        '&' '&amp;', '' '&lt;', '' '&gt;', '' '&quot;', ' '&#39;'
      })[s])}pre
    `);
    w.document.close();
  } else {
    alert(result);
  }
}

document.addEventListener('DOMContentLoaded', () = {
  startTitleClock();
});