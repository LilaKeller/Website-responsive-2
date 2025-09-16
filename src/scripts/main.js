// Custom Cursor Script (mit Textanzeige)
(function() {
  try {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    const cursorText = document.createElement('span');
    cursorText.classList.add('cursor-text');
    cursor.appendChild(cursorText);
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'flex';
    });

    // Cursor Hover Effekt für Links und Buttons
    const hoverTargets = ['a', 'button', '.btn', '.filter-btn', '.carousel-btn'];
    document.addEventListener('mouseover', (e) => {
      if (hoverTargets.some(sel => e.target.matches(sel))) {
        cursor.classList.add('cursor-hover');
        // Optional: Text im Cursor anzeigen, wenn data-cursor-text gesetzt
        if (e.target.dataset.cursorText) {
          cursorText.textContent = e.target.dataset.cursorText;
        } else {
          cursorText.textContent = '';
        }
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (hoverTargets.some(sel => e.target.matches(sel))) {
        cursor.classList.remove('cursor-hover');
        cursorText.textContent = '';
      }
    });

    // Fallback: Zeige Standardcursor, wenn Cursor-Element nicht sichtbar
    setTimeout(() => {
      if (!document.querySelector('.cursor')) {
        document.body.style.cursor = 'auto';
      }
    }, 1000);
  } catch (e) {
    document.body.style.cursor = 'auto';
  }
})();