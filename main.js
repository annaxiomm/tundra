import { updateStatusBar } from "./core/statusbar.js";
import { initCaribou } from "./core/wm.js";
import { fs } from "./core/fs.js";

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
  // initialise the window manager
  initCaribou();

  // filesystem tests
  fs.resolve("/test"); // should error
  fs.mkdir("/test");
  console.log(fs.resolve("/test"));
  fs.touch("/test/test.txt");
  console.log(fs.resolve("/test/test.txt"));
  fs.writeFile("/test/test.txt", "this is a tundra filesystem test");
  console.log(fs.readFile("/test/test.txt"));
  console.log(fs.ls("/"));
}
