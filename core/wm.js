// caribou - the official window manager of tundra

import { apps } from "./apps.js";

export let windows = {};
let lastID = 0;

let highestZ = 1;

let focusedWindow = null;

export function initCaribou() {
  openApp("welcome");
}

export function openApp(appname) {
  if (!Object.hasOwn(apps, appname)) {
    console.error(
      `TUNDRA: Attempting to open app "${appname}" which doesn't exist`,
    );
    return;
  }

  let instance = new apps[appname](++lastID);
  windows[lastID] = instance;

  focusWindow(lastID);
}

document.addEventListener("requestfocus", (e) => {
  focusWindow(e.detail.window);
})

document.addEventListener("requestclose", (e) => {
  windows[e.detail.window].div.remove();
  delete windows[e.detail.window];
  console.log(windows);
})

function focusWindow(windowID) {
  Object.entries(windows).forEach(([key, value]) => {
    value.div.classList.remove("active-window");
  })

  windows[windowID].div.classList.add("active-window");

  windows[windowID].div.style.zIndex = ++highestZ;
}
