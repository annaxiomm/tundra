import { Window } from "../../core/window";

export class ChangelogApp extends Window {
  constructor(windowID) {
    super({
      title: "changelog",
      id: "changelog",
      width: 400,
      height: 300,
      x: 100,
      y: 100
    }, windowID)

    this.content.innerHTML = `
<div style="height: calc(100% - 10px); width: calc(100% - 10px); background: white; margin: 0; padding: 5px; overflow-y: scroll">

<h2>v0.1.1-beta</h2>
<ul style="list-style-type: '- ';">
<li>visual updates - windows looks like SerenityOS windows now!</li>
<li>almost complete caribou overhaul</li>
<ul>
  <li>windows now request behaviour from caribou instead of doing it themselves</li>
  <li>new focusing system!</li>
  <li>windows now focus when you open them!</li>
</ul>
</ul>
<h2>v0.1.0-alpha</h2>
<ul style="list-style-type: '- ';">
<li>this is the first version of tundra!</li>
<li>added a windowing system (caribou)</li>
<li>added 3 apps (welcome, notes, image of the day)</li>
<li>added a sick wallpaper</li>
</ul>
</div>
`
  }
}
