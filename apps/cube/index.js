import { Window } from "../../core/window";

import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export class CubeApp extends Window {
  constructor(windowID) {
    super({
      title: "cube",
      id: "cube",
      width: 200,
      height: 200,
      x: 100,
      y: 100
    }, windowID)

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new WebGLRenderer({
      antialias: true
    });
    renderer.setSize(196, 196);
    this.content.appendChild(renderer.domElement);

    const geometry = new BoxGeometry(1, 1, 1);
    const materials = [
        new MeshBasicMaterial({ color: 0xff0000 }), // Right side (+)X)
        new MeshBasicMaterial({ color: 0x00ff00 }), // Left side (-X)
        new MeshBasicMaterial({ color: 0x0000ff }), // Top side (+Y)
        new MeshBasicMaterial({ color: 0xffff00 }), // Bottom side (-Y)
        new MeshBasicMaterial({ color: 0xff00ff }), // Front side (+Z)
        new MeshBasicMaterial({ color: 0x00ffff })  // Back side (-Z)
    ];

    const cube = new Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 1.75;
    camera.aspect = 1;

    const offset = Math.random() * Math.PI * 2;

    function animate(time) {
        cube.rotation.x = time / 2000 + offset;
        cube.rotation.y = time / 1000 + offset;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
  }
}
