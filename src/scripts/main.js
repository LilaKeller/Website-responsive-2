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

// Portfolio Carousel Funktionalität
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing carousel...');
  
  // Warte einen Moment, um sicherzustellen, dass alle Elemente geladen sind
  setTimeout(function() {
    const carousel = document.querySelector('.portfolio-carousel');
    const leftBtn = document.querySelector('.carousel-btn.left.round-svg');
    const rightBtn = document.querySelector('.carousel-btn.right.round-svg');
    
    console.log('Carousel elements found:', { 
      carousel: !!carousel, 
      leftBtn: !!leftBtn, 
      rightBtn: !!rightBtn 
    });
    
    if (!carousel) {
      console.error('Portfolio carousel not found!');
      return;
    }
    
    if (!leftBtn) {
      console.error('Left carousel button not found!');
      return;
    }
    
    if (!rightBtn) {
      console.error('Right carousel button not found!');
      return;
    }
    
    console.log('All carousel elements exist, adding event listeners');
    
    // Scroll-Funktion für Links-Button
    leftBtn.addEventListener('click', function(e) {
      console.log('Left button clicked');
      e.preventDefault();
      e.stopPropagation();
      
      carousel.scrollBy({
        left: -420, // Scroll nach links um eine Kartenbreite + gap
        behavior: 'smooth'
      });
    });
    
    // Scroll-Funktion für Rechts-Button
    rightBtn.addEventListener('click', function(e) {
      console.log('Right button clicked');
      e.preventDefault();
      e.stopPropagation();
      
      carousel.scrollBy({
        left: 420, // Scroll nach rechts um eine Kartenbreite + gap
        behavior: 'smooth'
      });
    });
    
    // Button-States basierend auf Scroll-Position aktualisieren
    function updateButtonStates() {
      const scrollLeft = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      const isAtStart = scrollLeft <= 10;
      const isAtEnd = scrollLeft >= maxScroll - 10;
      
      console.log('Scroll state:', { scrollLeft, maxScroll, isAtStart, isAtEnd });
      
      leftBtn.style.opacity = isAtStart ? '0.3' : '1';
      leftBtn.disabled = isAtStart;
      
      rightBtn.style.opacity = isAtEnd ? '0.3' : '1';
      rightBtn.disabled = isAtEnd;
    }
    
    // Button-States beim Laden aktualisieren
    updateButtonStates();
    
    // Button-States beim Scrollen aktualisieren
    carousel.addEventListener('scroll', function() {
      setTimeout(updateButtonStates, 100); // Kleine Verzögerung für smooth scrolling
    });
    
    // Button-States bei Fenstergrößenänderung aktualisieren
    window.addEventListener('resize', updateButtonStates);
    
    console.log('Carousel functionality initialized successfully');
    
    // Test-Click um zu sehen, ob die Buttons funktionieren
    leftBtn.addEventListener('mousedown', function() {
      console.log('Left button mouse down');
    });
    
    rightBtn.addEventListener('mousedown', function() {
      console.log('Right button mouse down');
    });
    
  }, 500); // 500ms warten
});