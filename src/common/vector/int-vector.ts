import { Vector } from "./vector";

export class IntVector extends Vector {
  public override get x() {
    return this._x;
  }

  public override set x(value: number) {
    this._x = Math.floor(value);
  }

  public override get y() {
    return this._y;
  }

  public override set y(value: number) {
    this._y = Math.floor(value);
  }
}
