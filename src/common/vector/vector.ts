export class Vector {
  constructor(protected _x: number = 0, protected _y: number = 0) {}

  public get intX() {
    return Math.floor(this._x);
  }

  public get intY() {
    return Math.floor(this._y);
  }

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

  public decrease(x: number, y: number) {
    this._x = this._x >= 0 ? this._x - x : this._x + x;
    this._y = this._y >= 0 ? this._y - y : this._y + y;
  }

  public set(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public add(x: number, y: number) {
    this._x += x;
    this._y += y;
  }

  public mul(x: number, y: number) {
    this._x *= x;
    this._y *= y;
  }

  public sub(x: number, y: number) {
    this._x -= x;
    this._y -= y;
  }

  public div(x: number, y: number) {
    this._x /= x;
    this._y /= y;
  }

  public invert() {
    this._x = -this._x;
    this._y = -this._y;
  }
}
