import { Window } from "../core/window.js";

export default class ImagesApp extends Window {
  constructor(windowID) {
    super({
      title: "random image",
      id: "images",
      width: 400,
      height: 400,
      x: 120,
      y: 80,
    }, windowID);

    let images = [
      "cow",
      "fire",
      "rightthatsit",
      "tweezer",
      "welterweight",
      "wlg"
    ]

    let currentImage = images[Math.floor(Math.random() * images.length)];
    this.content.innerHTML = `
<div>fun fact, all of these images were taken by me! (except for the minecraft one, that was made by <a href="https://cookistudios.com" target="_blank">CookiStudios</a>)</div>
<img src="images/other/${currentImage}.png" class="images-image" />
`;
  }
}
