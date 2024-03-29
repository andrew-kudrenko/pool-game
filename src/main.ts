import { CanvasRenderer } from "./graphics/canvas-renderer";
import { GameLoop } from "./engine/game-loop";
import { KeyboardListener } from "./controls/keyboard.listener";
import { RectPosition } from "./entity/rect-position";
import { randomRgb } from "./utils/color.utils";
import { Billiard } from "./billiard/billiard";

import "./style.css";

const tableArea = RectPosition.create(0, 0, 800, 600);

const canvasElement = document.getElementById("balls-canvas") as HTMLCanvasElement;
const canvas = new CanvasRenderer(canvasElement.getContext("2d")!);
canvas.setSize(tableArea.size.x, tableArea.size.y);

let billiard = new Billiard(canvas, tableArea);

billiard.clickListener.onLeftClick((event) => billiard.setRandomVelocity(event.detail.ball));
billiard.clickListener.onRightClick((event) => (event.detail.ball.style.fillStyle = randomRgb()));

const keyboard = new KeyboardListener();

let loop = new GameLoop(() => {
  keyboard.update();
  billiard.update();
});

keyboard.onShort("p", () => loop.pause());
keyboard.onShort("o", () => loop.resume());
keyboard.onShort("s", () => loop.stop());
keyboard.onShort("b", () => billiard.scheduleGenerateRandomBall());
keyboard.onShort("r", () => {
  loop.stop();
  canvas.clearAll();

  return start();
});

await start();

async function start() {
  billiard = new Billiard(canvas, tableArea);
  loop = new GameLoop(() => {
    keyboard.update();
    billiard.update();
  });

  await loop.start();
}
