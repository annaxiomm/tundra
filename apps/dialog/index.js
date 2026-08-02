import { Window } from "../../core/window";

export class DialogApp extends Window {
  constructor(windowID, params) {
    super({
      title: "",
      id: "dialog",
      width: 400,
      height: 150,
      x: 100,
      y: 100,
      list_visible: false
    }, windowID, params)

    this.resolve = this.params.resolve
    this.resolved = false;


    this.setTitle(params.title);
    let x = (document.getElementById("desktop").getBoundingClientRect().width / 2) - (this.width / 2);
    let y = (document.getElementById("desktop").getBoundingClientRect().height / 2) - (this.height / 2);
    console.log(document.getElementById("desktop").getBoundingClientRect().width)
    console.log(this.width)
    console.log(x, y);
    this.move(x, y)

    console.log(this.content);

    this.dialogContent = document.createElement("div");
    this.dialogContent.className = "dialog-content";

    this.dialogActions = document.createElement("div");
    this.dialogActions.className = "dialog-actions";

    this.content.appendChild(this.dialogContent)
    this.content.appendChild(this.dialogActions)
  }

  ok(value) {
    this.params.resolve(value)
    this.resolved = true
    this.closeWindow();
  }

  cancel() {
    this.params.resolve(null);
    this.resolved = true;
    this.closeWindow();
  }

  onClose() {
    if (!this.resolved) {
      this.cancel();
    }
  }

  addAction(label, callback) {
    const action = document.createElement("button");
    action.className = `dialog-action`;
    action.innerText = label;
    action.addEventListener("click", callback);
    this.dialogActions.appendChild(action);
  }
}
