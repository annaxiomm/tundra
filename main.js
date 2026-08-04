import { updateStatusBar } from "./core/statusbar.js";
import { initCaribou } from "./core/wm.js";
import { fs, initFilesystem } from "./core/fs.js";

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
  console.log("┏━━━━━━━━━━━━━━━━━━━━┓")
  console.log("┃ welcome to tundra! ┃")
  console.log("┗━━━━━━━━━━━━━━━━━━━━┛")

  // initialise core processes and things
  initFilesystem();
  initCaribou();
}
