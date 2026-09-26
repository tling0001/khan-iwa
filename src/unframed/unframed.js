document.addEventListener("DOMContentLoaded", () => {
  const frame = document.querySelector("controlledframe");

  if (frame) {
    // Set custom User-Agent string
    if (typeof frame.setUserAgentOverride === "function") {
      frame.setUserAgentOverride("Mozilla/5.0 (Linux; Android 17) Cobalt/156");
    }

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