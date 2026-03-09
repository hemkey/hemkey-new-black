// ===== ENQUIRY MODAL =====
(function () {
  var modal     = document.getElementById('enquiry');
  var fabBtn    = document.getElementById('enquiry-fab-btn');
  var closeBtn  = document.getElementById('enquiry-close');
  var backdrop  = document.getElementById('enquiry-backdrop');
  var form      = document.getElementById('enquiry-form');
  var success   = document.getElementById('enquiry-success');
  var phoneInput = document.getElementById('enq-phone');
  var phoneError = document.getElementById('phone-error');

  if (!modal) return;

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open triggers
  if (fabBtn) fabBtn.addEventListener('click', openModal);

  // All "Get In Touch" / "#enquiry" anchor clicks
  document.querySelectorAll('a[href="#enquiry"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (backdrop)  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Form validation + submit
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var phone = phoneInput ? phoneInput.value.trim() : '';
      var isValid = phone.length >= 7 && /[\d\s\+\-\(\)]{7,}/.test(phone);

      if (!isValid) {
        phoneInput.classList.add('is-error');
        phoneError.classList.add('visible');
        phoneInput.focus();
        return;
      }

      phoneInput.classList.remove('is-error');
      phoneError.classList.remove('visible');

      // Show success (replace with your real API call)
      form.style.display = 'none';
      if (success) success.style.display = 'block';

      // Auto-close after 4 seconds
      setTimeout(function () {
        closeModal();
        // Reset for next time
        setTimeout(function () {
          form.style.display = '';
          form.reset();
          if (success) success.style.display = 'none';
        }, 400);
      }, 4000);
    });

    // Clear error on input
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        phoneInput.classList.remove('is-error');
        phoneError.classList.remove('visible');
      });
    }
  }
})();