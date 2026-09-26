function onPermissionChanged(status) {
  const stateElem = document.getElementById("permission-state");
  const promptBtn = document.getElementById("permission-prompt");
  const fallbackContainer = document.getElementById("fallback-controls");

  if (stateElem) stateElem.innerText = status.state;

  if (status.state === "granted") {
    // Launch the unframed window once
    const childWindow = window.open("/unframed/window.html", "_blank");

    if (childWindow) {
      // Close the launcher window after opening the target window
      window.close();
    } else {
      // If blocked by browser popup policy, reveal manual controls
      if (fallbackContainer) fallbackContainer.style.display = "block";
      if (promptBtn) promptBtn.disabled = true;
    }
  } else {
    // Permission pending/denied; show manual setup controls
    if (fallbackContainer) fallbackContainer.style.display = "block";
    if (promptBtn) promptBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const promptBtn = document.getElementById("permission-prompt");
  const closeBtn = document.getElementById("close-window-button");

  if (promptBtn) {
    promptBtn.addEventListener("click", () => {
      if ('getScreenDetails' in window) {
        window.getScreenDetails();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => window.close());
  }

  if ('permissions' in navigator) {
    navigator.permissions.query({ name: "window-management" }).then((status) => {
      onPermissionChanged(status);
      status.onchange = () => onPermissionChanged(status);
    });
  }
});