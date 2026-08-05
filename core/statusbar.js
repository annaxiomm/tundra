import { truncateString } from "./util.js";
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

    openApp(appname, {});

  })
})

function updateWindowList() {
  let windowList = document.getElementById("window-list");
  let windows = getOpenWindows();

  Array.from(windowList.children).forEach((child) => {
    child.remove();
  })

  Object.entries(windows).forEach(([id, window]) => {
    if (!window.list_visible) { return }
    let element = document.createElement("div");
    element.className = "window-list-item statusbar-button";
    element.innerText = truncateString(window.title, 12);
    element.setAttribute("windowID", id);

    element.addEventListener("click", () => {
      windowListClicked(id, element);
    })
    windowList.appendChild(element);
  })
}

function updateFocusedWindow(id) {
  let windowList = document.getElementById("window-list");
  Array.from(windowList.children).forEach((window) => {
    if (window.getAttribute("windowID") != id) {
      window.classList.remove("window-list-focused");
    } else {
      window.classList.add("window-list-focused");
    }
  })
}

document.addEventListener("windowschanged", () => {
  updateWindowList();
});

document.addEventListener("windowfocused", (e) => {
  updateFocusedWindow(e.detail.window);
})

function windowListClicked(id, element) {
  element.dispatchEvent(new CustomEvent("requestfocus", {
    bubbles: true,
    detail: {
      window: id
    }
  }))
}
