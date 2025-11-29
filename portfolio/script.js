// Smooth scroll for internal anchors only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = this.getAttribute('href');
    if (!target || target === "#") return;
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Simple responsive carousel logic
const track = document.querySelector('.carousel-track');
if (track) {
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  let index = 0;

  function updateCarousel() {
    // compute an item width including gap
    const itemStyle = getComputedStyle(items[0]);
    const gap = parseInt(getComputedStyle(track).gap || 16, 10);
    const itemWidth = items[0].getBoundingClientRect().width;
    const shift = index * (itemWidth + gap);
    track.style.transform = `translateX(${-shift}px)`;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    index = Math.min(index + 1, items.length - 1);
    updateCarousel();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    updateCarousel();
  });

  // allow swipe on touch devices (basic)
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) index = Math.min(index + 1, items.length - 1);
      else index = Math.max(index - 1, 0);
      updateCarousel();
    }
  });

  // recalc on resize
  window.addEventListener('resize', updateCarousel);
  // initial
  updateCarousel();
}

// Popups (open/close)
document.querySelectorAll('.show-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.popup;
    const popup = document.getElementById(id);
    if (!popup) return;
    popup.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('.popup .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const popup = closeBtn.closest('.popup');
    if (popup) popup.setAttribute('aria-hidden', 'true');
  });
});

// close popup when clicking outside the content
window.addEventListener('click', e => {
  if (e.target.classList && e.target.classList.contains('popup')) {
    e.target.setAttribute('aria-hidden', 'true');
  }
});

// keyboard: close popup on Escape
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup[aria-hidden="false"]').forEach(p => p.setAttribute('aria-hidden','true'));
  }
});
