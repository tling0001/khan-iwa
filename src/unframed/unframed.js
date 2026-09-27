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

  // Hybrid Drag / Click Handling
  const dragBar = document.getElementById("drag-bar");
  if (dragBar) {
    let isMouseDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    dragBar.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return; // Only trigger on left-click
      isMouseDown = true;
      isDragging = false;
      startX = e.screenX;
      startY = e.screenY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;

      const deltaX = e.screenX - startX;
      const deltaY = e.screenY - startY;

      // If mouse moved more than 3px, treat as a drag action
      if (!isDragging && (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3)) {
        isDragging = true;
      }

      if (isDragging) {
        window.moveBy(deltaX, deltaY);
        startX = e.screenX;
        startY = e.screenY;
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (!isMouseDown) return;

      // If user clicked without dragging, forward click through to underlying frame
      if (!isDragging) {
        dragBar.style.pointerEvents = "none";
        const targetElem = document.elementFromPoint(e.clientX, e.clientY);
        
        if (targetElem && targetElem !== dragBar) {
          targetElem.click();
        }

        // Re-enable drag bar after forwarding the click
        setTimeout(() => {
          dragBar.style.pointerEvents = "auto";
        }, 50);
      }

      isMouseDown = false;
      isDragging = false;
    });
  }
});