import { windows } from "./wm";

export function updateStatusBar() {
  let now = new Date();
  let formatted_date = now.toLocaleString();
  document.getElementById("status_time").innerText = formatted_date;
}

document.getElementById("os_name").addEventListener("click", () => {
  windows["welcome"].openWindow();
});
