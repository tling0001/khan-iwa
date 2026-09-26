const MIN_SPLASH_TIME_MS = 1250;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function launchTargetWindow(startTime) {
  // Calculate how much time is left to reach the full 2 seconds
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(0, MIN_SPLASH_TIME_MS - elapsedTime);

  // Wait out the remainder of the 2 seconds BEFORE spawning the new window
  if (remainingTime > 0) {
    await sleep(remainingTime);
  }

  // Open the unframed window
  const childWindow = window.open("/unframed/window.html", "_blank");

  if (childWindow) {
    // Small buffer to allow the new window process to initialize before self-terminating
    await sleep(100);
    window.close();
  } else {
    // Reveal fallback permission prompt if window.open was blocked by policy
    const fallbackContainer = document.getElementById("fallback-controls");
    const promptBtn = document.getElementById("permission-prompt");
    if (fallbackContainer) fallbackContainer.style.display = "block";
    if (promptBtn) promptBtn.disabled = true;
  }
}

async function onPermissionChanged(status, startTime) {
  const stateElem = document.getElementById("permission-state");
  const promptBtn = document.getElementById("permission-prompt");
  const fallbackContainer = document.getElementById("fallback-controls");

  if (stateElem) stateElem.innerText = status.state;

  if (status.state === "granted") {
    await launchTargetWindow(startTime);
  } else {
    if (fallbackContainer) fallbackContainer.style.display = "block";
    if (promptBtn) promptBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const startTime = Date.now();
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
      onPermissionChanged(status, startTime);
    });
  } else {
    launchTargetWindow(startTime);
  }
});