export const WriteType = {
  OK: "Ok",
  ERR: "Err",
  GAP: "Gap"
}

export function boot_write(type, msg) {
  switch (type) {
    case WriteType.OK:
      document.getElementById("boot-console").innerHTML += `<span class="log-line">[ <span class="log-ok">OK</span> ] ${msg}</span><br/>`;
      break;
    case WriteType.ERR:
      document.getElementById("boot-console").innerHTML += `<span class="log-line">[ <span class="log-err">ERR</span> ] ${msg}</span><br/>`;
      break;
    case WriteType.GAP:
      document.getElementById("boot-console").innerHTML += `<br/>`;
      break;
  }
}
