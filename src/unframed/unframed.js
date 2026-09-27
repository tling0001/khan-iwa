document.addEventListener("DOMContentLoaded", () => {
  const frame = document.querySelector("controlledframe");

  if (frame) {
    if (typeof frame.setUserAgentOverride === "function") {
      frame.setUserAgentOverride("Mozilla/5.0 (Linux; Android 17) Cobalt/156");
    }

    frame.addEventListener("permissionrequest", (e) => {
      if (e.permission === "fullscreen") {
        e.request.allow();
      }
    });

    frame.addEventListener("newwindow", (e) => {
      window.open(e.targetUrl, "_blank");
      e.preventDefault();
    });
  }

  // Window Close Handler
  const closeBtn = document.getElementById("close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.close();
    });
  }

  // Handle click-through on full-screen drag bar
  const dragBar = document.getElementById("drag-bar");
  if (dragBar) {
    let startX = 0;
    let startY = 0;
    let isClicking = false;

    dragBar.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      isClicking = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isClicking) return;
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);

      // If dragging, re-enable drag app-region
      if (deltaX > 4 || deltaY > 4) {
        dragBar.style.webkitAppRegion = "drag";
        dragBar.style.pointerEvents = "auto";
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (!isClicking) return;
      isClicking = false;

      // If released without significant movement, temporarily disable pointer events
      // to let the click penetrate into the underlying controlledframe
      dragBar.style.webkitAppRegion = "no-drag";
      dragBar.style.pointerEvents = "none";

      setTimeout(() => {
        dragBar.style.webkitAppRegion = "drag";
        dragBar.style.pointerEvents = "auto";
      }, 200);
    });
  }
});