import { Canvas } from "./render/canvas";
import { IntVector } from "./common/vector/int-vector";

export class World {
  public readonly canvases = {
    doodler: new Canvas(document.getElementById("balls-canvas") as HTMLCanvasElement),
    platforms: new Canvas(document.getElementById("table-canvas") as HTMLCanvasElement),
  } as const;
  private readonly size = new IntVector();

  public setSize(x: number, y: number) {
    this.size.set(x, y);

    this.canvases.doodler.setSize(this.size.x, this.size.y);
    this.canvases.platforms.setSize(this.size.x, this.size.y);
  }
}
