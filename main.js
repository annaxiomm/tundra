import { updateStatusBar } from "./core/statusbar";

setInterval(() => {
  fixedUpdate();
}, 1000);

// runs once every second (1000ms)
function fixedUpdate() {
  updateStatusBar();
}
