import { DialogApp } from ".";

export class ConfirmDialog extends DialogApp {
  constructor(windowID, params) {
    super(windowID, params);

    const p = document.createElement("p");
    p.innerText = params.message;
    this.dialogContent.appendChild(p);

    this.addAction("Cancel", () => { this.cancel() });
    this.addAction("OK", () => { this.ok("ok") });
  }
}
