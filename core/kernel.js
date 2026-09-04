// KERNEL.JS
// handles OS-level interaction, like fullscreen requests.

import { ConfirmDialog } from "../apps/dialog/confirm";
import { openDialog } from "./wm";

const syscalls = {
  info: sys_info,
  fullscreen: sys_fullscreen,
  shutdown: sys_shutdown
}

function sys_info() {
  function getBrowser() {
    console.log(navigator.userAgent)
    let x = window.navigator.userAgent.split(" ");
    return x[x.length - 1];
  }

  return {
    browser: getBrowser(),
  }
}

function sys_fullscreen() {
  document.body.requestFullscreen();
}

function sys_shutdown() {
  let x = openDialog(ConfirmDialog, {
    title: "shutdown?",
    message: "Are you sure you want to exit Tundra?"
  });

  x.then((response) => {
    if (response == "ok") {
      const p = document.getElementById("power-off");
      setTimeout(() => {
        Array.from(document.getElementsByClassName("window")).forEach((e) => {
          e.style.display = "none";
        })
        setTimeout(() => {
          document.getElementById("screen").style.display = "none";

          setTimeout(() => {
            p.style.display = "block";

            setTimeout(() => {
              p.innerText = "shutting down.";
              setTimeout(() => {
                p.innerText = "shutting down..";
                setTimeout(() => {
                  p.innerText = "shutting down...";
                  setTimeout(() => {
                    p.innerText = "shutting down";
                    setTimeout(() => {
                      p.innerText = "shutting down.";
                      setTimeout(() => {
                        p.innerText = "shutting down..";
                        setTimeout(() => {
                          p.innerText = "shutting down...";
                          setTimeout(() => {
                            p.innerText = "";
                            setTimeout(() => {
                              document.getElementById("safe").style.display = "block";
                            }, 2000);
                          }, 1000);
                        }, 500);
                      }, 500);
                    }, 500);
                  }, 500);
                }, 500);
              }, 500);
            }, 500);
          }, 1000);
        }, 2000);
      }, 500)
    }
  })
}

export function syscall(id) {
  if (!(id in syscalls)) {
    console.error(`[kernel] ERROR syscall ${id} not found`);
    return;
  }

  return syscalls[id]();
}
