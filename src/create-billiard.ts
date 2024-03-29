import { CanvasRenderer } from "./engine/graphics/canvas-renderer";
import { RectPosition } from "./engine/entity/rect-position";
import { Billiard } from "./billiard/billiard";
import { KeyboardListener } from "./engine/listeners/keyboard.listener";

export function createBilliard(canvasElement: HTMLCanvasElement) {
  const tableArea = RectPosition.create(0, 0, 800, 600);
  const canvas = new CanvasRenderer(canvasElement.getContext("2d")!);
  canvas.setSize(tableArea.size.x, tableArea.size.y);

  const keyboard = new KeyboardListener();
  const billiard = new Billiard(canvas, keyboard, tableArea);

  billiard.clickListener.onLeftClick((event) => billiard.setRandomVelocity(event.detail.ball));

  keyboard.onShort("p", () => billiard.loop.pause());
  keyboard.onShort("o", () => billiard.loop.resume());
  keyboard.onShort("s", () => billiard.loop.stop());
  keyboard.onShort("b", () => billiard.scheduleGenerateRandomBall());
  keyboard.onShort("r", () => billiard.restart());

  return billiard;
}
