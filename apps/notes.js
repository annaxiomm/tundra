import { Window } from "../core/window.js";

export default class NotesApp extends Window {
  constructor(windowID) {
    super({
      title: "notes",
      id: "notes",
      width: 400,
      height: 300,
      x: 120,
      y: 80,
    }, windowID);

    let note_content = `
TODO:<br/>
- make everything look pretty<br/>
- add more apps<br/>
<br/>
CHANGELOG:<br/>
v0.1.0 (alpha)<br/><br/>
- this is the first version of tundra!<br/>
- added a windowing system (caribou)<br/>
- added 3 apps (welcome, notes, image of the day)<br/>
- added a sick wallpaper<br/>`

    this.content.innerHTML = `
<div contenteditable="true" class="notes-notes">
  ${note_content}
</div>
`;
  }
}
