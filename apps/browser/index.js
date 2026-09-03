// browser - very very broken

import { Window } from "../../core/window";

export class BrowserApp extends Window {
  constructor(windowID) {
    super({
      title: "browser",
      id: "browser",
      width: 800,
      height: 600,
      x: 100,
      y: 100
    }, windowID);

    this.history = [];
    this.history_index = null;

    this.loaded = true;
    this.timeout = null;

    this.url = ""

    this.searchbar = document.createElement("input");
    let submit = document.createElement("button");
    let back = document.createElement("button");
    let forward = document.createElement("button");
    this.searchbar.className = "browser-input";
    this.searchbar.placeholder = "type a url..."
    submit.innerText = "Search";
    submit.className = "browser-submit browser-button";
    back.innerText = "<";
    back.className = "browser-back browser-button";
    forward.innerText = ">";
    forward.className = "browser-forward browser-button";

    this.browser_window = document.createElement("iframe");

    this.error = document.createElement("div");
    this.error.className = "browser-error";
    this.error.style.display = "none";
    this.error.innerHTML = `
      <h1>oops!</h1>
      <p>that website can't be loaded. iframes are really touchy so there's not much we can do about it.</p>
    `;

    let top_bar = document.createElement("div");
    top_bar.className = "browser-top-bar";
    top_bar.appendChild(back);
    top_bar.appendChild(forward);
    top_bar.appendChild(this.searchbar);
    top_bar.appendChild(submit);

    this.content.appendChild(top_bar);
    this.content.appendChild(this.browser_window);
    this.content.appendChild(this.error);

    submit.addEventListener("click", () => {
      this.navigate_to(this.searchbar.value);
    });

    back.addEventListener("click", () => {
      this.back();
    });

    forward.addEventListener("click", () => {
      this.forward();
    });

    this.searchbar.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        this.navigate_to(this.searchbar.value)
      }
    })

    this.browser_window.onload = () => {
      this.error.style.display = "none";
      this.browser_window.style.display = "block";
      this.loaded = true;
      clearTimeout(this.timeout);
      this.searchbar.value = this.browser_window.contentWindow.location.href;
    };

    this.browser_window.contentDocument.documentElement.innerHTML = `<!-- HOMEPAGE FOR THE TUNDRA BROWSER -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Tundra Browser</title>
    </head>
    <body>
	<h1>Welcome to Tundra Browser!</h1>
	<p>this browser uses <strong>iframe</strong>, so its functionality is pretty limited. <br/>any website which implements <strong>X-FRAME-OPTIONS: DENY</strong> or <strong>SAMEORIGIN</strong> won't be loaded.</p>
	<p>that also means that the search bar address won't be updated if you click a link, <br/>and back/forward only works for websites you manually type into the search bar</p>
	here is a small list of websites that are confirmed to load:
	<ul>
	    <li><a href="https://annaxiomm.github.io">annaxiomm.github.io</a></li>
		<li><a href="https://cookistudios.com">cookistudios.com</a></li>
		<li><a href="https://suckless.org">suckless.org</a></li>
	</ul>
	<p>happy browsing!</p>
    </body>
    </html>
`
  }

  navigate_to(url) {
    this.error.style.display = "none";
    this.browser_window.style.display = "block";

    this.loaded = false;

    if (!url.startsWith("https://")) {
      url = "https://" + url;
    }

    this.timeout = setTimeout(() => {
      if (!this.loaded) {
        this.display_error();
      }
    }, 2000);

    this.browser_window.src = url;
    this.history.slice(0, this.history_index - 1);
    this.history.push(url);
    if (this.history_index == null) { this.history_index = 0 } else { this.history_index++ };
  }

  display_error() {
    this.browser_window.style.display = "none";
    this.error.style.display = "block";
  }

  back() {
    console.log(this.history_index);
    if (this.history_index == 0) { return };
    this.history_index--;
    this.browser_window.src = this.history[this.history_index];
  }

  forward() {
    console.log(this.history_index);
    if (this.history_index == this.history.length ) { return };
    this.history_index++;
    this.browser_window.src = this.history[this.history_index];
  }
}
