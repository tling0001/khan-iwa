document.addEventListener("DOMContentLoaded", () => {
  const frame = document.querySelector("controlledframe");

  if (frame) {
    // Intercept and approve embedded fullscreen requests (e.g., YouTube video embeds)
    frame.addEventListener("permissionrequest", (e) => {
      if (e.permission === "fullscreen") {
        e.request.allow();
      }
    });
  }

  const closeBtn = document.getElementById("close-btn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.close();
    });
  }
});