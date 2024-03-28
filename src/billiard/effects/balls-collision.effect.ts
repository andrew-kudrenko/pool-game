import { BilliardBall } from "../entities/billiard-ball";

export class BallsCollisionEffect {
  public readonly _impact: number;

  constructor(loss: number) {
    this._impact = 1 - loss;
  }

  public effect(a: BilliardBall, b: BilliardBall) {
    const { x: aX, y: aY } = a.movement.velocity;
    const { x: bX, y: bY } = b.movement.velocity;

    a.movement.velocity.set(bX * this._impact, bY * this._impact);
    b.movement.velocity.set(aX * this._impact, aY * this._impact);
  }
}
