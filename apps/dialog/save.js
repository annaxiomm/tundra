import { DialogApp } from ".";
import { fs } from "../../core/fs";
import { openDialog } from "../../core/wm";
import { ConfirmDialog } from "./confirm";

export class SaveDialog extends DialogApp {
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

    this.savebutton = document.createElement("button");
    this.savebutton.className = "save-button";
    this.savebutton.innerText = "Save";
    this.savebutton.addEventListener("click", () => {
      this.save_file();
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
    this.bottom_bar.appendChild(this.savebutton);
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

  save_file() {
    let absolute_path = fs.resolvePath(this.current_dir, this.file_name);
    if (fs.resolve(absolute_path) != null) {
      let x = openDialog(ConfirmDialog, {
        title: "file exists",
        message: `${this.file_name} already exists. Do you want to replace it?`
      });

      x.then((response) => {
        if (response == null) {
          return;
        }

        this.ok(absolute_path)
      })
    } else {
      this.ok(absolute_path)
    }
  }
}
