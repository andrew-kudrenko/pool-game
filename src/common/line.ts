import { toRadians } from "../utils/math.utils";
import { Vector } from "./vector";

export class Line {
  public angle: number;

  constructor(public readonly start: Vector, public readonly end: Vector, angle = 0) {
    this.angle = toRadians(angle);
  }

  public static create(x0: number, y0: number, x1: number, y1: number, angle = 0) {
    return new Line(new Vector(x0, y0), new Vector(x1, y1), angle);
  }
}
