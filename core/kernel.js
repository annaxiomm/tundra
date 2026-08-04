// KERNEL.JS
// handles OS-level interaction, like fullscreen requests.

const syscalls = {
  info: sys_info,
  fullscreen: sys_fullscreen
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

export function syscall(id) {
  if (!(id in syscalls)) {
    console.error(`[kernel] ERROR syscall ${id} not found`);
    return;
  }

  return syscalls[id]();
}
