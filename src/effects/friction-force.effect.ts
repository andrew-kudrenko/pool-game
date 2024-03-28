import { Movement } from "../entity/movement";

export class FrictionForceEffect {
  constructor(private _ratio: number) {}

  public effect(body: Movement) {
    body.velocity.set(
      this.decrease(body.velocity.x),
      this.decrease(body.velocity.y)
    );
  }

  private decrease(value: number) {
    const diff = Math.abs(value * this._ratio);
    return value >= 0 ? value - diff : value + diff;
  }
}
