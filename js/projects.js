// ===== PROJECTS PAGE FILTER =====
(function () {
  'use strict';

  function initProjectFilters() {
    var catBtns    = document.querySelectorAll('.projects__filter-btn');
    var statusBtns = document.querySelectorAll('.projects-page__status-btn');
    var sections   = document.querySelectorAll('.projects-page__section[id]');

    if (!catBtns.length) return;

    var activeCategory = 'all';
    var activeStatus   = 'all';

    /* ── Category filter: scroll to section OR show/hide ── */
    catBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        catBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCategory = btn.dataset.filter;

        if (activeCategory === 'all') {
          /* Show all sections */
          sections.forEach(function (sec) { sec.style.display = ''; });
        } else {
          /* Map filter value to section IDs */
          var sectionMap = { residential: 'residential', commercial: 'commercial', senior: 'senior-living', township: 'township' };
          var targetId = sectionMap[activeCategory];
          sections.forEach(function (sec) {
            sec.style.display = (sec.id === targetId) ? '' : 'none';
          });
          /* Smooth scroll to section */
          var targetSection = document.getElementById(targetId);
          if (targetSection) {
            setTimeout(function () {
              var offset = targetSection.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: offset, behavior: 'smooth' });
            }, 50);
          }
        }
        applyStatusFilter();
      });
    });

    /* ── Status filter: show/hide individual cards ── */
    statusBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        statusBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeStatus = btn.dataset.status;
        applyStatusFilter();
      });
    });

    function applyStatusFilter() {
      var cards = document.querySelectorAll('.project-full-card');
      cards.forEach(function (card) {
        var catMatch    = activeCategory === 'all' || card.dataset.category === activeCategory;
        var statusMatch = activeStatus   === 'all' || card.dataset.status   === activeStatus;
        card.style.display = (catMatch && statusMatch) ? '' : 'none';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectFilters);
  } else {
    /* renderer.js fires DOMContentLoaded first; give it a tick */
    setTimeout(initProjectFilters, 100);
  }
})();