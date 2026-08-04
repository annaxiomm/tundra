import { Cmd } from "../../core/cmd";
import { syscall } from "../../core/kernel";
import pkg from "../../package.json" with { type: "json" };

export class FetchCmd extends Cmd {
  constructor(termcontext, currentdir, argv) {
    super({
      name: "fetch"
    }, termcontext, currentdir, argv)
  }

  async run() {
    let host = syscall("info");

    this.termcontext.writeln("\n    ██████    anon@tundra");
    this.termcontext.writeln("  ██      ██  os      tundra");
    this.termcontext.writeln(`          ██  host    ${host.browser}`);
    this.termcontext.writeln("        ██    shell   tundra-shell 0.1");
    this.termcontext.writeln("      ██      wm      caribou 0.3");
    this.termcontext.writeln("              arch    wasm32-js");
    this.termcontext.writeln(`      ██      kernel  tundraJS-${pkg.version}\n`);
  }
}
