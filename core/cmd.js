// command-line applications for use in a terminal

export class Cmd {
  constructor({
    name = "unnamed-cmd",
  } = {}, termcontext, currentdir, argv) {
    this.termcontext = termcontext
    this.currentdir = currentdir
    this.argv = argv
    this.argc = argv.length
  }
}
