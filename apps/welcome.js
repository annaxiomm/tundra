import { Window } from "../core/window.js";

export default class WelcomeApp extends Window {
  constructor() {
    super({
      title: "welcome !",
      width: 500,
      height: 180,
      x: 120,
      y: 80,
    });

    this.content.innerHTML = `
<h1>welcome to tundra !</h1>
<p>the world's worst operating system, localised entirely within your web browser !</p>
`;
  }
}
