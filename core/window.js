let highestZ = 1;

export class Window {
  constructor({
    title = "Untitled",
    width = 400,
    height = 300,
    x = 100,
    y = 100,
  } = {}) {
    // create DOM
    this.div = document.createElement("div");
    this.div.className = "window";

    this.div.innerHTML = `
<div class="header">
  <div class="window_title"></div>
  <div class="window_buttons">
    <span class="close_window">x</span>
  </div>
</div>
<div class="content"></div>
`;

    document.getElementById("desktop").appendChild(this.div);

    // elements
    this.header = this.div.querySelector(".header");
    this.closeButton = this.div.querySelector(".close_window");
    this.content = this.div.querySelector(".content");
    this.title = this.div.querySelector(".window_title");

    // position and width
    const rect = this.div.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.top;

    this.div.style.width = `${width}px`;
    this.div.style.height = `${height}px`;

    this.title.innerText = title;

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
