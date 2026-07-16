// caribou - the official window manager of tundra

import { apps } from "./apps";

export let windows = [];
let highestZ = 1;

export function initCaribou() {
  let welcome = new apps["welcome"]();
  windows.push[welcome];
}

export function openApp(appname) {
  if (!Object.hasOwn(apps, appname)) {
    console.error(
      `TUNDRA: Attempting to open app ${appname} which doesn't exist`,
    );
    return;
  }

  let instance = new apps[appname]();
  windows.push[instance];
}
