/**
 * HEMKEY — Insights Page JS
 * insights.js
 *
 * Handles:
 *   1. Subscribe popup modal (phone required, email optional)
 *   2. Insights filter bar (All / Market Report / Investment Guide / etc.)
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════
     SUBSCRIBE MODAL
     ═══════════════════════════════════════ */
  (function initSubscribeModal() {
    var modal    = document.getElementById('subscribe-modal');
    var closeBtn = document.getElementById('subscribe-close');
    var skipBtn  = document.getElementById('subscribe-skip');
    var form     = document.getElementById('subscribe-form');
    var phoneIn  = document.getElementById('sub-phone');
    var phoneErr = document.getElementById('sub-phone-error');
    var success  = document.getElementById('subscribe-success');
    var formWrap = document.getElementById('subscribe-form-wrap');

    if (!modal) return;

    /* Don't show again if already subscribed this session */
    if (sessionStorage.getItem('hemkey-subscribed')) {
      modal.style.display = 'none';
      return;
    }

    /* Show after 800ms — less aggressive than immediate */
    setTimeout(function () {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }, 800);

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    /* Close triggers */
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (skipBtn)  skipBtn.addEventListener('click',  closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    /* Backdrop click — close */
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('subscribe-modal__backdrop')) {
        closeModal();
      }
    });

    /* Form submit */
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var phone = phoneIn ? phoneIn.value.trim() : '';
        var valid = phone.length >= 7 && /[\d\s\+\-\(\)]{7,}/.test(phone);

        if (!valid) {
          if (phoneIn)  phoneIn.classList.add('is-error');
          if (phoneErr) phoneErr.classList.add('visible');
          if (phoneIn)  phoneIn.focus();
          return;
        }

        /* Clear error state */
        if (phoneIn)  phoneIn.classList.remove('is-error');
        if (phoneErr) phoneErr.classList.remove('visible');

        /* Show success */
        if (formWrap) formWrap.style.display = 'none';
        if (success)  success.style.display  = 'block';

        sessionStorage.setItem('hemkey-subscribed', '1');

        /* Auto-close after 3.5s */
        setTimeout(closeModal, 3500);
      });

      /* Live clear error on input */
      if (phoneIn) {
        phoneIn.addEventListener('input', function () {
          phoneIn.classList.remove('is-error');
          if (phoneErr) phoneErr.classList.remove('visible');
        });
      }
    }
  })();


  /* ═══════════════════════════════════════
     INSIGHTS FILTER BAR
     ═══════════════════════════════════════ */
  (function initFilter() {
    /* Cards are injected by renderer.js on DOMContentLoaded,
       so we delegate or wait until after renderer runs. */
    function attachFilter() {
      var btns  = document.querySelectorAll('.insights-filter__btn');
      if (!btns.length) return;

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          /* Toggle active state */
          btns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          var filter = btn.dataset.filter;

          /* Target all insight cards in both grids */
          var cards = document.querySelectorAll(
            '#insights-page-grid .insight-card, #insights-page-grid-secondary .insight-card'
          );

          cards.forEach(function (card) {
            var tag = card.dataset.tag || '';
            if (filter === 'all' || tag === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    /* Attach after DOM + renderer have both run */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachFilter);
    } else {
      attachFilter();
    }
  })();

})();