import { Vector } from "../common/vector";
import { Position } from "./position";

export class RectPosition extends Position {
  constructor(position = new Vector(), public readonly size = new Vector()) {
    super(position);
  }

  public static create(px: number, py: number, sx: number, sy: number) {
    return new RectPosition(new Vector(px, py), new Vector(sx, sy));
  }
}
