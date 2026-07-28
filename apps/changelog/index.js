import { Window } from "../../core/window";
import { marked } from "marked";
import DOMPurify from "dompurify";

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

    this.containerdiv = document.createElement("div");
    this.containerdiv.style = "height: calc(100% - 10px); width: calc(100% - 10px); background: white; margin: 0; padding: 5px; overflow-y: scroll";
    this.containerdiv.innerText = "waiting for changelog...";

    this.content.appendChild(this.containerdiv);

    this.getChangelog();
  }

  async getChangelog() {
    const changelog = "";
    const url = "https://raw.githubusercontent.com/annaxiomm/tundra/refs/heads/main/CHANGELOG.md";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.text();
        const html = DOMPurify.sanitize(result.substring(result.indexOf('\n') + 1)); // Sanitize and remove the h1 in one step
        this.containerdiv.innerHTML = marked.parse(html);
      } catch (error) {
        this.containerdiv.innerText = "failed to fetch changelog :(";
      }
  }
}
