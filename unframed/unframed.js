document.addEventListener("DOMContentLoaded", () => {
  const minBtn = document.getElementById("min-btn");
  const maxBtn = document.getElementById("max-btn");
  const closeBtn = document.getElementById("close-btn");

  if (minBtn) {
    minBtn.addEventListener("click", () => {
      // Direct Chromium IWA Minimize API
      if (typeof window.minimize === "function") {
        window.minimize().catch(() => {
          // Fallback: request blur if window.minimize is restricted
          window.blur();
        });
      } else {
        window.blur();
      }
    });
  }

  if (maxBtn) {
    maxBtn.addEventListener("click", () => {
      // Use native browser window maximize/restore API
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => console.warn(err));
      } else {
        // Request full-screen display on document element (outer container)
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn("Fullscreen toggle restricted:", err);
        });
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.close();
    });
  }
});