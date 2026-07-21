import { openApp, getOpenWindows } from "./wm.js";

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

function updateWindowList() {
  let windowList = document.getElementById("window-list");
  let windows = getOpenWindows();

  Array.from(windowList.children).forEach((child) => {
    child.remove();
  })

  Object.entries(windows).forEach(([id, window]) => {
    let element = document.createElement("div");
    element.className = "window-list-item";
    element.innerText = window.title;
    windowList.appendChild(element);
  })
}

document.addEventListener("windowschanged", () => {
  updateWindowList();
});
