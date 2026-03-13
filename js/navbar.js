// ===== NAVBAR (FIXED) =====
(function () {
  var navbar   = document.querySelector('.navbar');
  var toggle   = document.getElementById('mob-toggle');
  var mobMenu  = document.getElementById('mob-menu');
  var mobLinks = mobMenu ? mobMenu.querySelectorAll('a') : [];

  function handleScroll() {
    if (window.scrollY > 60) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toggle && mobMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = mobMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobMenu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    mobMenu.addEventListener('click', function (e) {
      if (e.target === mobMenu) {
        mobMenu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobMenu.classList.contains('is-open')) {
        mobMenu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }
})();