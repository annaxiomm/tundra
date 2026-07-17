import { openApp, windows } from "./wm.js";

export function updateStatusBar() {
  let now = new Date();
  let formatted_date = now.toLocaleString();
  document.getElementById("status_time").innerText = formatted_date;
}

document.getElementById("app-welcome").addEventListener("click", () => {
  openApp("welcome");
});

document.getElementById("app-notes").addEventListener("click", () => {
  openApp("notes");
});

document.getElementById("app-image").addEventListener("click", () => {
  console.log("oh hello");
  openApp("images");
});
