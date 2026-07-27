import { Window } from "../../core/window";

export class AboutApp extends Window {
  constructor(windowID) {
    super({
      title: "about tundra",
      id: "about",
      width: 400,
      height: 150,
      x: 100,
      y: 100
    }, windowID)

    this.content.innerHTML = `
<div class="about-content" style="display: flex; align-items: center; gap: 10px; user-select: none;">
<img src="images/wally.png" style="image-rendering: pixelated; height: 75px;" />
<div class="about-text">
<strong>Tundra</strong><br/>
<span>Version 0.1.2-beta</span><br/>
<span>Made with <3 by <a href="https://github.com/annaxiomm">annaxiomm</a> :)</span>
</div>
</div>
`
  }
}
