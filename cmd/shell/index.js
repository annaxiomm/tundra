import { Cmd } from "../../core/cmd";
import { fs, Directory } from "../../core/fs";

export class ShellCmd extends Cmd {
  constructor(termcontext, currentdir, argv) {
    super({
      name: "shell"
    }, termcontext, currentdir, argv)
  }

  async run() {
    while (true) {
      this.termcontext.setTitle(this.currentdir);
      this.termcontext.write(`anon@tundra ${this.currentdir} $ `);
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
          this.lsdir();
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

  lsdir() {
    let dircontents = fs.ls(this.currentdir);
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

  help() {
    this.termcontext.writeln("tundra-shell version 0.1");
    this.termcontext.writeln("this is a list of internally defined commands;\nsee /bin for all commands\n");
    this.termcontext.writeln("help          show this menu");
    this.termcontext.writeln("exit          quit this tundra-shell session");
    this.termcontext.writeln("cd [dir]      change directory to [dir]");
    this.termcontext.writeln("mkdir [dir]   make a new directory named [dir]");
    this.termcontext.writeln("ls            list the current directory");
    this.termcontext.writeln("touch [file]  create a new file named [file]");

  }
}
