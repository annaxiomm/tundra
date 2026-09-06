import { DialogApp } from ".";
import { Directory, fs } from "../../core/fs";
import { openDialog } from "../../core/wm";
import { ConfirmDialog } from "./confirm";
import { OkDialog } from "./ok";

export class OpenDialog extends DialogApp {
  constructor(windowID, params) {
    super(windowID, params);

    this.current_dir = "/";
    this.file_name = params.default_name;

    this.top_bar = document.createElement("div");
    this.top_bar.className = "files-top-bar";

    this.back = document.createElement("button");
    this.back.className = "files-back-button";
    this.back.innerText = "..";
    this.back.addEventListener("click", () => {
      this.navigate_to("..");
    })

    this.dir_name = document.createElement("span");
    this.dir_name.className = "files-dir-name";
    this.dir_name.innerText = this.current_dir;

    this.top_bar.appendChild(this.back);
    this.top_bar.appendChild(this.dir_name);

    this.dir_view = document.createElement("div");
    this.dir_view.className = "files-view";

    this.name_input = document.createElement("input");
    this.name_input.className = "save-input";
    this.name_input.value = this.file_name;
    this.name_input.addEventListener("input", () => {
      this.file_name = this.name_input.value;
    })

    this.openbutton = document.createElement("button");
    this.openbutton.className = "save-button";
    this.openbutton.innerText = "Open";
    this.openbutton.addEventListener("click", () => {
      this.open_file();
    })
    this.cancelbutton = document.createElement("button");
    this.cancelbutton.className = "save-button";
    this.cancelbutton.innerText = "Cancel";
    this.cancelbutton.addEventListener("click", () => {
      this.cancel();
    })

    this.bottom_bar = document.createElement("div");
    this.bottom_bar.className = "save-bar";

    this.bottom_bar.appendChild(this.name_input);
    this.bottom_bar.appendChild(this.openbutton);
    this.bottom_bar.appendChild(this.cancelbutton);

    this.resize(400, 300);

    this.update_dir_view()

    this.save_container = document.createElement("div");
    this.save_container.className = "save-content";

    this.save_container.appendChild(this.top_bar)
    this.save_container.appendChild(this.dir_view)
    this.save_container.appendChild(this.bottom_bar)

    this.dialogContent.appendChild(this.save_container);
  }

  update_dir_view() {
    this.dir_name.innerText = this.current_dir;
    this.dir_view.innerHTML = "";

    let dir_contents = fs.listDir(this.current_dir);

    dir_contents.forEach((e) => {
      let file = document.createElement("div");
      file.className = "files-file";

      let file_icon = document.createElement("img");
      switch (e.type) {
        case "directory":
          file_icon.src = "images/folder.png";
          file.addEventListener("click", () => {
            this.navigate_to(e.name);
          })
          break;
        case "file":
          let name_split = e.name.split(".");
          console.log(name_split);
          if (name_split.length == 1) {
            file_icon.src = "images/binary.png";
          }

          switch (name_split[name_split.length - 1]) {
            case "txt":
            case "md":
              file_icon.src = "images/text.png";
              break;
          }

          file.addEventListener("click", () => {
            this.set_name(e.name);
          })
          break;
        default:
          file_icon.src = "";
      }

      let file_name = document.createElement("span");
      file_name.innerText = e.name;

      file.appendChild(file_icon);
      file.appendChild(file_name);

      this.dir_view.appendChild(file);
    })
  }

  navigate_to(path) {
    let absolute_path = fs.resolvePath(this.current_dir, path);
    this.current_dir = absolute_path;
    this.update_dir_view();
  }

  set_name(name) {
    this.file_name = name;
    this.name_input.value = this.file_name;
  }

  open_file() {
    let absolute_path;
    try {
      absolute_path = fs.resolvePath(this.current_dir, this.file_name);
    } catch {
      openDialog(OkDialog, { title: "file doesn't exist", message: `"${this.file_name}" does not exist.` })
      return;
    }
    let path = fs.resolve(absolute_path);

    if (path instanceof Directory) {
      openDialog(OkDialog, {title: "is a directory", message: `"${this.file_name}" is a directory. try opening a file instead.`})
    } else {
      this.ok(absolute_path);
    }
  }
}
