import { DialogApp } from ".";

export class OkDialog extends DialogApp {
  constructor(windowID, params) {
    super(windowID, params);

    const p = document.createElement("p");
    p.innerText = params.message;
    this.dialogContent.appendChild(p);

    this.addAction("OK", () => { this.cancel() });
  }
}
