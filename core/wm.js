// caribou - the official window manager of tundra

import { apps } from "./apps.js";

import { ConfirmDialog } from "../apps/dialog/confirm.js";
import { requestFullscreen } from "./kernel.js";

export let windows = {};
let lastID = 0;

let highestZ = 1;

let focusedWindow = null;

const defaultWallpaper = "images/wallpapers/pariwhero.png"

const windowsChangedEvent = new CustomEvent("windowschanged", {
  bubbles: true
})

export function initCaribou() {
  console.log("[caribou] initialising caribou...")
  setWallpaper(defaultWallpaper);
  openApp("about", {});
  let x = openDialog(ConfirmDialog, { title: "enable fullscreen?", message: "Would you like to enable fullscreen mode?"});
  x.then((response) => {
    if (response == "ok") { requestFullscreen() };
  })
}

export function openApp(appname, params) {
  if (!Object.hasOwn(apps, appname)) {
    console.error(
      `TUNDRA: Attempting to open app "${appname}" which doesn't exist`,
    );
    return;
  }

  let id = ++lastID;

  let instance = new apps[appname](id, params);
  windows[id] = instance;

  document.dispatchEvent(windowsChangedEvent);
  focusWindow(id);
}

export function openAppByClass(classname, params) {
  let id = ++lastID;

  let instance = new classname(id, params);
  windows[id] = instance;

  document.dispatchEvent(windowsChangedEvent);
  focusWindow(id);
}

export function openDialog(dialog, params) {
  return new Promise((resolve, reject) => {
    openAppByClass(dialog, {
      resolve,
      reject,
      ...params
    });
  })
}

export function getOpenWindows() {
  return windows;
}

document.addEventListener("requestfocus", (e) => {
  focusWindow(e.detail.window);
})

document.addEventListener("requestclose", (e) => {
  if (!windows[e.detail.window]) {
    console.warn(`TUNDRA: tried to close missing window ${windowID}`);
  }
  windows[e.detail.window].div.remove();
  delete windows[e.detail.window];
  document.dispatchEvent(windowsChangedEvent);
})

function focusWindow(windowID) {
  if (!windows[windowID]) {
    console.warn(`TUNDRA: tried to focus missing window ${windowID}`);
  }
  Object.entries(windows).forEach(([key, value]) => {
    value.div.classList.remove("active-window");
  })

  windows[windowID].div.classList.add("active-window");

  windows[windowID].div.style.zIndex = ++highestZ;

  windows[windowID].div.dispatchEvent(new CustomEvent("windowfocused", {
    bubbles: true,
    detail: {
      window: windowID
    }
  }))
}

function setWallpaper(wallpaper) {
  document.getElementById("desktop").style.backgroundImage = `url(${wallpaper})`;
}
