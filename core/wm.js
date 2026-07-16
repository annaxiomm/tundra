// caribou - the official window manager of tundra

export let windows = {};
let highestZ = 1;

class Window {
  constructor(div, open = false) {
    // elements
    this.div = div;
    this.header = div.children[0];
    this.closeButton = this.header.children[1].children[0];

    // position metadata
    const rect = div.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.top;

    // other stuff
    this.open = open;
    if (!this.open) {
      this.div.style.display = "none";
    }

    // click events
    this.header.addEventListener("mousedown", (e) => {
      this.startDrag(e);
    });

    document.addEventListener("mouseup", () => {
      this.stopDrag();
    });

    this.closeButton.addEventListener("click", () => {
      this.closeWindow();
    });

    this.div.addEventListener("mousedown", () => {
      console.log("clicked!");
      this.div.style.zIndex = ++highestZ; // highest Z index increases arbitrarily
    });
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.div.style.left = String(this.x) + "px";
    this.div.style.top = String(this.y) + "px";
  }

  startDrag(initialEvent) {
    let offsetX = initialEvent.clientX - this.x;
    let offsetY = initialEvent.clientY - this.y;
    document.onmousemove = (e) => {
      this.move(e.clientX - offsetX, e.clientY - offsetY);
    };
  }

  stopDrag() {
    document.onmousemove = null;
  }

  openWindow() {
    this.open = true;
    this.div.style.display = "block";
  }

  closeWindow() {
    this.open = false;
    this.div.style.display = "none";
    console.log("wow");
  }
}

export function initCaribou() {
  windows["welcome"] = new Window(
    document.getElementById("welcome_window"),
    true,
  );

  windows["other"] = new Window(document.getElementById("other_window"), true);
}
