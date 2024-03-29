import { MoveableCircle } from "../entity/entity.types";
import { CircleCollider } from "../physics/circle-collider";

export class ResolveCircleCollisionEffect {
  constructor(private readonly _collider: CircleCollider) {}

  public effect(a: MoveableCircle, b: MoveableCircle) {
    const at = this._collider.timeBeforeCollision(a, b);

    if (!Number.isNaN(at)) {
      a.position.coords.x -= a.movement.velocity.x + a.movement.velocity.x * at;
      a.position.coords.y -= a.movement.velocity.y + a.movement.velocity.y * at;

      return true;
    }

    return false;
  }
}
