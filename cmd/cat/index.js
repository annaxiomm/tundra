import { Cmd } from "../../core/cmd";
import { Directory, fs } from "../../core/fs";

export class CatCmd extends Cmd {
  constructor(termcontext, currentdir, argv) {
    super({
      name: "cat"
    }, termcontext, currentdir, argv)
  }

  async run() {
    if (this.argc == 0) {
      console.log("uhm");
      await this.interactive();
    } else {
      console.log(this.argv);
      let filepath = fs.resolvePath(this.currentdir, this.argv.join(" "));
      let file = fs.resolve(filepath);
      if (file == null) {
        this.termcontext.writeln(`cat: ${this.argv.join(" ")}: No such file or directory`);
        return;
      }
      if (file instanceof Directory) {
        this.termcontext.writeln(`cat: ${this.argv.join(" ")}: Is a directory`);
        return;
      }
      this.termcontext.writeln(file.contents);
    }
  }

  async interactive() {
    while (true) {
      let input = await this.termcontext.readline();
      this.termcontext.writeln(input);
    }
  }
}
