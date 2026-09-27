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

  const closeBtn = document.getElementById("close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.close();
    });
  }
});