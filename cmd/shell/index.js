import { Cmd } from "../../core/cmd";
import { fs, Directory } from "../../core/fs";
import { openApp } from "../../core/wm";
import { truncateDir } from "../../core/util";

export class ShellCmd extends Cmd {
  constructor(termcontext, currentdir, argv) {
    super({
      name: "shell"
    }, termcontext, currentdir, argv)
  }

  async run() {
    while (true) {
      let dirname = truncateDir(this.currentdir);
      this.termcontext.setTitle(dirname);
      this.termcontext.write(`anon@tundra ${dirname} $ `);
      let input = await this.termcontext.readline();
      let parts = input.split(" ");

      let cmdname = parts.shift();

      switch (cmdname) {
        case "exit":
          return false;
        case "cd":
          this.chdir(parts.join(" "));
          break;
        case "ls":
          this.lsdir(parts.join(" "));
          break;
        case "mkdir":
          this.mkdir(parts.join(" "));
          break;
        case "touch":
          this.touch(parts.join(" "));
          break;
        case "help":
          this.help();
          break;
        case "open":
          this.openapp(parts.join(" "));
          break;
        default:
          let output = await this.termcontext.exec(cmdname, this.currentdir, parts);
          if (output == 999) { // command not found
            this.termcontext.writeln(`shell: command not found: ${cmdname}`);
          }
      }
    }
  }

  chdir(dir) {
    let newdir = fs.resolvePath(this.currentdir, dir);

    let node = fs.resolve(newdir);
    if (!node) {
      this.termcontext.writeln(`cd: no such file or directory: ${dir}`);
      return;
    }

    if (!(node instanceof Directory)) {
      this.termcontext.writeln(`cd: not a directory: ${dir}`);
      return;
    }

    this.currentdir = newdir;
  }

  lsdir(dir) {
    let dircontents = fs.ls(this.currentdir);
    if (dir != "") {
      let newdir = fs.resolvePath(this.currentdir, dir);

      if (!newdir) {
        this.termcontext.writeln(`ls: no such file or directory: ${dir}`);
        return;
      }

      let node = fs.resolve(newdir);
      if (!node) {
        this.termcontext.writeln(`ls: no such file or directory: ${dir}`);
        return;
      }

      if (!(node instanceof Directory)) {
        this.termcontext.writeln(`ls: not a directory: ${dir}`);
        return;
      }

      dircontents = fs.ls(newdir);
    }


    dircontents.forEach((e) => {
      this.termcontext.writeln(e);
    })
  }

  mkdir(dir) {
    fs.mkdir(this.currentdir + "/" + dir);
  }

  touch(file) {
    fs.touch(this.currentdir + "/" + file);
  }

  openapp(app) {
    openApp(app, {});
  }

  help() {
    this.termcontext.writeln("tundra-shell version 0.1");
    this.termcontext.writeln("this is a list of internally defined commands;\nsee /bin for all commands\n");
    this.termcontext.writeln("help          show this menu");
    this.termcontext.writeln("exit          quit this tundra-shell session");
    this.termcontext.writeln("cd [dir]      change directory to [dir]");
    this.termcontext.writeln("mkdir [dir]   make a new directory named [dir]");
    this.termcontext.writeln("ls            list the current directory");
    this.termcontext.writeln("touch [file]  create a new file named [file]");
    this.termcontext.writeln("open [app]    open the GUI application [app]");
    this.termcontext.writeln("              (i.e. one from the app drawer)");
  }
}
