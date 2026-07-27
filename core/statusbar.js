import { openApp, getOpenWindows } from "./wm.js";

const special_apps = {
  "exit": () => {
    console.log("quitting tundra!");
  }
}

export function updateStatusBar() {
  let now = new Date();
  let formatted_date = now.toLocaleString();
  document.getElementById("status-time").innerText = formatted_date;
}

Array.from(document.getElementsByClassName("appdrawer-app")).forEach((element) => {
  element.addEventListener("click", () => {
    let appname = element.id.slice(4);

    // Check for special system functions e.g. Quit
    if (appname in special_apps) {
      special_apps[appname]();
      return;
    }

    openApp(appname);

  })
})

function updateWindowList() {
  let windowList = document.getElementById("window-list");
  let windows = getOpenWindows();

  Array.from(windowList.children).forEach((child) => {
    child.remove();
  })

  Object.entries(windows).forEach(([id, window]) => {
    let element = document.createElement("div");
    element.className = "window-list-item statusbar-button";
    element.innerText = window.title;
    windowList.appendChild(element);
  })
}

document.addEventListener("windowschanged", () => {
  updateWindowList();
});
