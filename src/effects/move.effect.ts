import { Moveable } from "../entity/entity.types";

export class MoveEffect {
  constructor(private _epsilon: number) {}

  public effect(entity: Moveable) {
    entity.position.coords.add(
      entity.movement.velocity.x,
      entity.movement.velocity.y
    );

    if (Math.abs(entity.movement.velocity.x) <= this._epsilon) {
      entity.movement.velocity.x = 0;
    }

    if (Math.abs(entity.movement.velocity.y) <= this._epsilon) {
      entity.movement.velocity.y = 0;
    }
  }
}
