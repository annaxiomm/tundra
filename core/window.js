/*
APP CREATION RULES
------------------

- all apps must have a unique ID that is all lowercase without spaces
(i.e. able to be used as a CSS class)
- all classes used within an app must follow the form [id]-[classname]
  - e.g. notes-note, welcome-header, image-imagecontent etc



OTHER WINDOW STUFF
------------------
- windows should not manage themselves: they should send a request to the windowmanager first
*/

const windowsChangedEvent = new CustomEvent("windowschanged", {
  bubbles: true
})

export class Window {
  constructor({
    title = "Untitled",
    id = "untitled-window",
    width = 400,
    height = 300,
    x = 100,
    y = 100,
    list_visible = true, // is it visible in the window list?
  } = {}, windowID, params) {
    this.windowID = windowID;
    this.params = params;

    // create DOM
    this.div = document.createElement("div");
    this.div.className = `window ${id}`;

    this.div.innerHTML = `
<div class="header">
  <div class="window-title"></div>
  <div class="window-buttons">
    <span class="close-window window-button">×</span>
  </div>
</div>
<div class="content"></div>
`;

    document.getElementById("desktop").appendChild(this.div);

    // elements
    this.header = this.div.querySelector(".header");
    this.closeButton = this.div.querySelector(".close-window");
    this.content = this.div.querySelector(".content");
    this.titleElement = this.div.querySelector(".window-title");

    // position, width, and other metadata
    const rect = this.div.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.top;
    this.title = title;

    this.div.style.width = `${width}px`;
    this.div.style.height = `${height + 28}px`;
    this.width = width;
    this.height = height;

    this.list_visible = list_visible;

    this.titleElement.innerText = title;

    // click events
    this.header.addEventListener("mousedown", (e) => {
      this.startDrag(e);
    });

    document.addEventListener("mouseup", () => {
      this.stopDrag();
    });

    this.closeButton.addEventListener("mousedown", (e) => {
      e.stopPropagation(); // so that the window doesn't focus just before being closed
    })

    this.closeButton.addEventListener("click", (e) => {
      this.closeWindow();
    });

    this.div.addEventListener("mousedown", () => {

      this.div.dispatchEvent(new CustomEvent("requestfocus", {
        bubbles: true,
        detail: {window: this.windowID}
      }))
    });
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.div.style.left = String(this.x) + "px";
    this.div.style.top = String(this.y) + "px";
  }

  resize(width, height) {
    this.div.style.width = `${width}px`;
    this.div.style.height = `${height + 28}px`;
    this.width = width;
    this.height = height;
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
    this.onClose();
    this.div.dispatchEvent(new CustomEvent("requestclose", {
      bubbles: true,
      detail: {
        window: this.windowID,
      }
    }))
  }

  setTitle(title) {
    this.title = title;
    this.titleElement.innerText = this.title;
    document.dispatchEvent(windowsChangedEvent);
  }

  setContent(content) {
    this.content.innerHTML = content;
  }

  addClass(classname) {
    this.div.classList.add(classname);
  }

  onClose() {
    // to be implemented by apps
  }
}
