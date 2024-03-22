import { IntVector } from "../common/vector/int-vector";

export class Sprite {
  public readonly size = new IntVector();
  public readonly coords = new IntVector();

  constructor(public source: HTMLImageElement) {}
}
