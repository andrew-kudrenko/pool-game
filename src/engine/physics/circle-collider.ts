import { Vector } from "../common/vector";
import { MoveableCircle } from "../entity/entity.types";

export class CircleCollider {
  public timeBeforeCollision(c1: MoveableCircle, c2: MoveableCircle) {
    const { x: xV1, y: yV1 } = c1.movement.velocity;
    const { x: xV2, y: yV2 } = c2.movement.velocity;

    const R = c1.position.radius + c2.position.radius;

    const { x: x11, y: y11 } = c1.position.coords;
    const { x: x21, y: y21 } = c2.position.coords;

    const x12 = c1.position.coords.x + xV1;
    const y12 = c1.position.coords.y + yV1;
    const x22 = c2.position.coords.x + xV2;
    const y22 = c2.position.coords.y + yV2;

    const a =
      x11 * x11 +
      x12 * x12 +
      y11 * y11 +
      y12 * y12 +
      x21 * x21 +
      x22 * x22 +
      y21 * y21 +
      y22 * y22 +
      2 *
        (-x11 * x12 -
          x21 * x22 -
          y11 * y12 -
          y21 * y22 -
          x11 * x21 -
          y11 * y21 +
          x11 * x22 +
          y11 * y22 +
          x12 * x21 +
          y12 * y21 -
          x12 * x22 -
          y12 * y22);
    const b =
      2 *
      (-x11 * x11 -
        x21 * x21 -
        y11 * y11 -
        y21 * y21 +
        x11 * x12 +
        y11 * y12 +
        x21 * x22 +
        y21 * y22 -
        x11 * x22 -
        y11 * y22 -
        x12 * x21 -
        y12 * y21 +
        2 * x11 * x21 +
        2 * y11 * y21);
    const c = x11 * x11 - 2 * x11 * x21 + x21 * x21 + y11 * y11 - 2 * y11 * y21 + y21 * y21 - R * R;

    const D = b * b - 4 * a * c;

    if (D < 0) {
      return Number.NaN;
    }

    if (D === 0) {
      return -b / (2 * a);
    }

    const sqrt = Math.sqrt(D);
    const root1 = (-b + sqrt) / (2 * a);
    const root2 = (-b - sqrt) / (2 * a);

    const isInsideBound1 = root1 > 0 && root1 < 1;
    const isInsideBound2 = root2 > 0 && root2 < 1;

    if (isInsideBound1 || isInsideBound2) {
      if (isInsideBound1 && !isInsideBound2) {
        return root1;
      }

      if (isInsideBound2 && !isInsideBound1) {
        return root2;
      }

      return Math.min(root1, root2);
    }

    return Number.NaN;
  }

  public hasCollision(c1: MoveableCircle, c2: MoveableCircle) {
    return (
      this.fastDistance(c1.position.coords, c2.position.coords) -
        c1.position.radius -
        c2.position.radius <=
      0
    );
  }

  public hasCollisionWithPoint(circle: MoveableCircle, point: Vector) {
    return this.fastDistance(circle.position.coords, point) - circle.position.radius <= 0;
  }

  private fastDistance(c1: Vector, c2: Vector) {
    const x = Math.abs(c1.x - c2.x);
    const y = Math.abs(c1.y - c2.y);
    const min = Math.min(x, y);

    return x + y - (min >> 1) - (min >> 2) + (min >> 4);
  }
}
