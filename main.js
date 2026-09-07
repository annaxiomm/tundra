import { updateStatusBar } from "./core/statusbar.js";
import { initCaribou } from "./core/wm.js";
import { fs, initFilesystem } from "./core/fs.js";
import { boot_write, WriteType } from "./core/boot.js";

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

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// runs when the "OS" loads
async function onStart() {

  Array.from(document.getElementsByClassName("window")).forEach((e) => {
    e.style.display = "hidden";
  })

  await sleep(500);
  boot_write(WriteType.OK, "Starting boot process")
  await sleep(300);
  boot_write(WriteType.OK, "Setting up root user")
  await sleep(300);
  await initFilesystem();
  await sleep(500);
  boot_write(WriteType.GAP, "")
  boot_write(WriteType.OK, "Initialising device manager")
  await sleep(300);
  boot_write(WriteType.OK, "Detecting mouse")
  boot_write(WriteType.OK, "Detecting keyboard")
  await sleep(300);
  boot_write(WriteType.OK, "Initialising input system")
  await sleep(500);
  boot_write(WriteType.GAP, "")
  initCaribou();
  boot_write(WriteType.OK, "Initialising window manager")
  boot_write(WriteType.OK, "Starting graphical session")
  boot_write(WriteType.OK, "Starting desktop environment")
  await sleep(500);
  boot_write(WriteType.GAP, "")
  boot_write(WriteType.OK, "Boot complete")
  await sleep(500);
  boot_write(WriteType.GAP, "")
  boot_write(WriteType.OK, "┏━━━━━━━━━━━━━━━━━━━━┓")
  boot_write(WriteType.OK, "┃ welcome to tundra! ┃")
  boot_write(WriteType.OK, "┗━━━━━━━━━━━━━━━━━━━━┛")
  boot_write(WriteType.OK, "Press any key to continue...")
  document.addEventListener("keydown", async () => {
    document.getElementById("boot-console").style.display = "none";
    await sleep(500);
    Array.from(document.getElementsByClassName("window")).forEach((e) => {
      e.style.display = "grid";
    })
  }, {once: true});
}
