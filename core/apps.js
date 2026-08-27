import { AboutApp } from "../apps/about/index";
import { BrowserApp } from "../apps/browser";
import { ChangelogApp } from "../apps/changelog";
import { CubeApp } from "../apps/cube";
import { DialogApp } from "../apps/dialog";
import { TerminalApp } from "../apps/terminal";
import { ColoursApp } from "../apps/colours";

export const apps = {
  about: AboutApp,
  changelog: ChangelogApp,
  cube: CubeApp,
  terminal: TerminalApp,
  browser: BrowserApp,
  colours: ColoursApp,

  dialog: DialogApp
}
