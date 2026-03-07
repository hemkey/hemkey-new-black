// ===== VIDEO CONTROLS =====
(function () {
  const video = document.querySelector('.hero__video');
  const muteBtn = document.querySelector('.hero__mute-btn');
  const muteIcon = document.querySelector('.hero__mute-icon');

  if (!video) return;

  // Attempt autoplay muted
  video.muted = true;
  video.play().catch(() => {});

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      updateMuteIcon();
    });
  }

  function updateMuteIcon() {
    if (!muteIcon) return;
    muteIcon.innerHTML = video.muted
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>`;
  }

  // Init icon state
  updateMuteIcon();
})();