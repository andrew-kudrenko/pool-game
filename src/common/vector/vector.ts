export class Vector {
  constructor(protected _x: number = 0, protected _y: number = 0) {}

  public get x() {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }

  public get y() {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }

  public set(x: number, y: number): Vector {
    this.x = x;
    this.y = y;

    return this;
  }
}
