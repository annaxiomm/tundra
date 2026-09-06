import { fs } from "../../core/fs";
import { Window } from "../../core/window";
import { openDialog } from "../../core/wm";
import { OpenDialog } from "../dialog/open";
import { SaveDialog } from "../dialog/save";

export class TextEditorApp extends Window {
  constructor(windowID) {
    super({
      title: "text editor",
      id: "texteditor",
      width: 800,
      height: 600,
      x: 100,
      y: 100
    }, windowID)

    this.filename = "Untitled";

    this.editor = document.createElement("div");
    this.editor.contentEditable = true;
    this.editor.className = "texteditor-editor";

    this.buttons = document.createElement("div");
    this.buttons.className = "texteditor-buttons";

    this.save = document.createElement("button");
    this.save.innerText = "Save File";
    this.save.className = "texteditor-button";
    this.open = document.createElement("button");
    this.open.innerText = "Open File";
    this.open.className = "texteditor-button";

    this.save.addEventListener("click", () => {
      this.save_file();
    })

    this.open.addEventListener("click", () => {
      this.open_file();
    })

    this.current = document.createElement("span");
    this.current.innerText = this.filename;

    this.buttons.appendChild(this.save);
    this.buttons.appendChild(this.open);
    this.buttons.appendChild(this.current);

    this.content.appendChild(this.buttons);
    this.content.appendChild(this.editor);

    this.content.addEventListener("keydown", (e) => {
      if (e.key == "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.save_file();
      }
    })
  }

  save_file() {
    if (this.filename == "Untitled") {

      let filename = openDialog(SaveDialog, {
        default_name: "untitled.txt"
      })

      filename.then((response) => {
        if (response != null) {
          this.filename = response;
          fs.touch(response);
          fs.writeFile(response, this.editor.innerText);
          this.current.innerText = this.filename;
        }
      })
    } else {
      fs.writeFile(this.filename, this.editor.innerText);
    }
  }

  open_file() {
    let x = openDialog(OpenDialog)

    x.then((response) => {
      if (response != null) {
        this.filename = response;
        this.current.innerText = this.filename;
        console.log(fs.resolve(response).contents);
        this.editor.innerText = fs.resolve(response).contents;
      }
    })
  }
}
