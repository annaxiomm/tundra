import { updateStatusBar } from "./core/statusbar";
import { initCaribou } from "./core/wm";

setInterval(() => {
  fixedUpdate();
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  onStart();
});

// runs once every second (1000ms)
function fixedUpdate() {
  updateStatusBar();
}

// runs when the "OS" loads
function onStart() {
  // initialise the window managers
  initCaribou();
}
