import { MoveableCircle } from "../../entity/entity.types";
import { RectPosition } from "../../entity/rect-position";

export class BoundsCollisionEffect {
  private readonly _impact: number;

  constructor(private readonly _area: RectPosition, loss: number) {
    this._impact = 1 - loss;
  }

  public effect(ball: MoveableCircle) {
    if (
      ball.position.coords.intX - ball.position.radius <
      this._area.coords.x
    ) {
      ball.position.coords.x = this._area.coords.x + ball.position.radius;
      ball.movement.velocity.x *= -this._impact;
    } else if (
      ball.position.coords.intX + ball.position.radius >=
      this._area.coords.x + this._area.size.x
    ) {
      ball.position.coords.x =
        this._area.coords.x + this._area.size.x - ball.position.radius;
      ball.movement.velocity.x *= -this._impact;
    }

    if (
      ball.position.coords.intY - ball.position.radius <
      this._area.coords.y
    ) {
      ball.position.coords.y = this._area.coords.y + ball.position.radius;
      ball.movement.velocity.y *= -this._impact;
    } else if (
      ball.position.coords.intY + ball.position.radius >=
      this._area.coords.y + this._area.size.y
    ) {
      ball.position.coords.y =
        this._area.coords.y + this._area.size.y - ball.position.radius;
      ball.movement.velocity.y *= -this._impact;
    }
  }
}
