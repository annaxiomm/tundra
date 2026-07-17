import { Window } from "../core/window.js";

export default class WelcomeApp extends Window {
  constructor() {
    super({
      title: "welcome !",
      id: "welcome",
      width: 500,
      height: 230,
      x: 120,
      y: 80,
    });

    this.content.innerHTML = `
<h1>welcome to tundra !</h1>
<p>the world's worst operating system, localised entirely within your web browser !</p>
<p>why don't you try hovering over <i>tundraOS v0.1.0 (alpha)</i> in the status bar to take a look at some apps?</p>
`;
  }
}
