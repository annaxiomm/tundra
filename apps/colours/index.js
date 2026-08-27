import { Window } from "../../core/window";

export class ColoursApp extends Window {
  constructor(windowID) {
    super({
      title: "colour picker",
      id: "colours",
      width: 200,
      height: 250,
      x: 100,
      y: 100
    }, windowID)

    this.colour = document.createElement("div");
    this.colour.style.height = "200px";
    this.colour.style.width = "200px";
    this.content.append(this.colour);
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    this.rgb = document.createElement("span");
    this.rgb.innerHTML = `<strong>RGB: </strong>${r}, ${g}, ${b}<br/>`;
    this.content.append(this.rgb);

    this.hex = document.createElement("span");
    this.hex.innerHTML = `<strong>hex: </strong>#${this.tohex(r)}${this.tohex(g)}${this.tohex(b)}`;
    this.content.append(this.hex);

    this.colour.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

    document.addEventListener("keydown", (e) => {
      r = Math.floor(Math.random() * 255);
      g = Math.floor(Math.random() * 255);
      b = Math.floor(Math.random() * 255);

      this.colour.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
      this.rgb.innerHTML = `<strong>RGB: </strong>${r}, ${g}, ${b}<br/>`;
      this.hex.innerHTML = `<strong>hex: </strong>#${this.tohex(r)}${this.tohex(g)}${this.tohex(b)}`;
    })
  }

  tohex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}
