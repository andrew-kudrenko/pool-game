import { Vector } from "../common/vector";

export class Sprite {
  public readonly size = new Vector();
  public readonly coords = new Vector();

  constructor(public source: HTMLImageElement) {}
}
