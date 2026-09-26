let startTime = 0;
const MIN_SPLASH_TIME_MS = 2000;

function launchTargetWindow() {
  const childWindow = window.open("/unframed/window.html", "_blank");

  if (childWindow) {
    // Calculate how long the splash screen has been visible
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_SPLASH_TIME_MS - elapsedTime);

    // Guarantee the splash screen displays for at least 2 seconds before closing
    setTimeout(() => {
      window.close();
    }, remainingTime);
  } else {
    // Reveal fallback permission prompt if window.open was blocked
    const fallbackContainer = document.getElementById("fallback-controls");
    const promptBtn = document.getElementById("permission-prompt");
    if (fallbackContainer) fallbackContainer.style.display = "block";
    if (promptBtn) promptBtn.disabled = true;
  }
}

function onPermissionChanged(status) {
  const stateElem = document.getElementById("permission-state");
  const promptBtn = document.getElementById("permission-prompt");
  const fallbackContainer = document.getElementById("fallback-controls");

  if (stateElem) stateElem.innerText = status.state;

  if (status.state === "granted") {
    launchTargetWindow();
  } else {
    if (fallbackContainer) fallbackContainer.style.display = "block";
    if (promptBtn) promptBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Capture the start timestamp as soon as the splash screen renders
  startTime = Date.now();

  const promptBtn = document.getElementById("permission-prompt");

  if (promptBtn) {
    promptBtn.addEventListener("click", () => {
      if ('getScreenDetails' in window) {
        window.getScreenDetails();
      }
    });
  }

  if ('permissions' in navigator) {
    navigator.permissions.query({ name: "window-management" }).then((status) => {
      onPermissionChanged(status);
      status.onchange = () => onPermissionChanged(status);
    });
  } else {
    launchTargetWindow();
  }
});