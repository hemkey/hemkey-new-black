// ===== ANIMATIONS & INTERACTIONS =====
(function () {

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -3% 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- Animated Counters ----
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target + suffix;
    }

    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ---- Word Carousel ----
  const carousels = document.querySelectorAll('.hero__word-carousel');
  carousels.forEach(carousel => {
    const words = carousel.querySelectorAll('.word');
    if (words.length < 2) return;

    let current = 0;
    words[current].classList.add('active');

    setInterval(() => {
      words[current].classList.remove('active');
      words[current].classList.add('exit');
      setTimeout(() => words[current].classList.remove('exit'), 600);

      current = (current + 1) % words.length;
      words[current].classList.add('active');
    }, 3000);
  });

  // ---- Testimonial Slider ----
  const track = document.querySelector('.testimonials__track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonials__dot');
  const prevBtn = document.querySelector('.testimonials__btn--prev');
  const nextBtn = document.querySelector('.testimonials__btn--next');

  if (track && cards.length) {
    let currentIndex = 0;
    let cardWidth = 0;
    let visibleCount = 1;

    function getVisibleCount() {
      const w = window.innerWidth;
      if (w >= 1200) return 2.5;
      if (w >= 768) return 1.8;
      return 1.1;
    }

    function updateSlider() {
      visibleCount = getVisibleCount();
      const totalWidth = track.parentElement.offsetWidth;
      cardWidth = totalWidth / Math.floor(visibleCount);

      const maxIndex = Math.max(0, cards.length - Math.floor(visibleCount));
      currentIndex = Math.min(currentIndex, maxIndex);

      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - Math.floor(visibleCount));
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();

    // Touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextBtn && nextBtn.click();
        else prevBtn && prevBtn.click();
      }
    }, { passive: true });
  }

  // ---- Projects Filter ----
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0.3';
          card.style.transform = 'scale(0.97)';
        }
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      });
    });
  });

  // ---- Parallax on Hero ----
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.7));
      }
    }, { passive: true });
  }

  // ---- Newsletter form ----
  const newsletterForm = document.querySelector('.footer__newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('.footer__newsletter-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      btn.style.background = 'linear-gradient(135deg, #4caf7d, #81c995)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        newsletterForm.reset();
      }, 3000);
    });
  }

})();