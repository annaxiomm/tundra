import { fs } from "../../core/fs";
import { Window } from "../../core/window";

export class FilesApp extends Window {
  constructor(windowID) {
    super({
      title: "file explorer",
      id: "files",
      width: 500,
      height: 400,
      x: 100,
      y: 100
    }, windowID)

    this.current_dir = "/";

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

    this.update_dir_view()

    this.content.appendChild(this.top_bar);
    this.content.appendChild(this.dir_view);
  }

  update_dir_view() {
    this.dir_view.innerHTML = "";
    this.dir_name.innerText = this.current_dir;

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

          console.log(name_split[name_split.length - 1]);

          switch (name_split[name_split.length - 1]) {
            case "txt":
            case "md":
              file_icon.src = "images/text.png";
              break;
          }
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
}
