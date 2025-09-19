// Entferne Custom-Cursor-Code
document.body.style.cursor = 'auto';

// Projektvorschau bei Hover/Focus auf Projektbuttons anzeigen (wie in P2_IA_Schlaf.html)
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.projekt-btn').forEach(function(btn) {
		var vorschau = btn.parentElement.querySelector('.projekt-vorschau');
		btn.addEventListener('mouseenter', function() {
			if(vorschau) vorschau.style.display = 'block';
		});
		btn.addEventListener('mouseleave', function() {
			if(vorschau) vorschau.style.display = 'none';
		});
		btn.addEventListener('focus', function() {
			if(vorschau) vorschau.style.display = 'block';
		});
		btn.addEventListener('blur', function() {
			if(vorschau) vorschau.style.display = 'none';
		});
		if(vorschau) {
			vorschau.addEventListener('mouseenter', function() {
				vorschau.style.display = 'block';
			});
			vorschau.addEventListener('mouseleave', function() {
				vorschau.style.display = 'none';
			});
		}
	});
});

// Lokale Zeit immer aktuell anzeigen (wie auf index.html)
function updateLocalTime() {
	const now = new Date();
	const options = { hour: '2-digit', minute: '2-digit' };
	let timeString = now.toLocaleTimeString('de-DE', options) + ' Uhr';
	// MESZ/MEZ je nach Sommerzeit
	const isDST = now.getTimezoneOffset() < -60;
	timeString += isDST ? ' MESZ' : ' MEZ';
	var el = document.getElementById('local-time');
	if (el) el.textContent = timeString;
}
updateLocalTime();
setInterval(updateLocalTime, 10000);

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    let hasShownOnce = false;
    
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.max(0, Math.min(100, (scrollTop / documentHeight) * 100));
      
      const easedPercent = scrollPercent < 50 ? 
        2 * scrollPercent * scrollPercent / 100 :
        1 - Math.pow(-2 * scrollPercent + 2, 3) / 2;
      
      const progressDeg = (easedPercent / 100) * 360;
      backToTopBtn.style.setProperty('--progress', `${progressDeg}deg`);
      
      // Hero-Bereich als Threshold nutzen
      const hero = document.querySelector('.hero');
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight * 0.8;
      
      if (scrollTop > heroHeight) {
        if (!backToTopBtn.classList.contains('visible')) {
          backToTopBtn.classList.add('visible');
          
          if (!hasShownOnce) {
            hasShownOnce = true;
            backToTopBtn.classList.add('first-show');
            setTimeout(() => {
              backToTopBtn.classList.remove('first-show');
            }, 600);
          }
        }
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    backToTopBtn.addEventListener('click', () => {
      const startTime = performance.now();
      const startPos = window.pageYOffset;
      const duration = Math.min(1200, Math.max(600, startPos / 3));
      
      backToTopBtn.style.pointerEvents = 'none';
      backToTopBtn.style.opacity = '0.7';
      
      function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        
        window.scrollTo(0, startPos * (1 - ease));
        
        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          backToTopBtn.style.pointerEvents = '';
          backToTopBtn.style.opacity = '';
        }
      }
      
      requestAnimationFrame(scrollStep);
    });
    
    let isScrolling = false;
    function handleScroll() {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          isScrolling = false;
        });
        isScrolling = true;
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    backToTopBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        backToTopBtn.click();
      }
      if (e.key === 'Escape') {
        backToTopBtn.blur();
      }
    });
    
    updateScrollProgress();
  }
});