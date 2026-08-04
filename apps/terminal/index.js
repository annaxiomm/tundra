import { ShellCmd } from "../../cmd/shell";
import { CatCmd } from "../../cmd/cat";
import { Window } from "../../core/window";
import { FetchCmd } from "../../cmd/fetch";

const cmds = {
  shell: ShellCmd,
  cat: CatCmd,
  fetch: FetchCmd
}

export class TerminalApp extends Window {
  constructor(windowID) {
    super({
      title: "~",
      id: "terminal",
      width: 400,
      height: 300,
      x: 100,
      y: 100
    }, windowID)

    this.terminal = document.createElement("div");
    this.terminal.className = "terminal-term";
    this.content.appendChild(this.terminal);

    this.terminal.addEventListener("click", () => {
      this.terminal.querySelector(".terminal-input").focus();
    })

    this.exec("shell", "/home/anon", []);
  }

  write(text) {
    let output = document.createElement("span");
    output.className = "terminal-output-line";
    output.innerText = text;
    this.terminal.appendChild(output);
  }

  writeln(text) {
    this.write(text + "\n");
  }

  async exec(cmd, cwd, args) {
    if (!(cmd in cmds)) {
      return 999; // not found
    }
    let process = new cmds[cmd](this, cwd, args);
    await process.run();
  }

  readline() {
    return new Promise((resolve) => {
      let input = document.createElement("span");
      input.className = "terminal-input";
      input.contentEditable = true;

      this.terminal.appendChild(input);
      input.focus();

      input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          e.preventDefault();
          let value = input.innerText;

          input.remove();
          this.writeln(value);

          resolve(value);
        }
      })
    })
  }
}
