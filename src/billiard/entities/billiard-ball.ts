import { Movement } from "../../engine/entity/movement";
import { CirclePosition } from "../../engine/entity/circle-position";
import { ShapeStyle } from "../../engine/entity/shape-style";
import { MoveableCircle } from "../../engine/entity/entity.types";

export class BilliardBall implements MoveableCircle {
  public readonly position = new CirclePosition();
  public readonly movement = new Movement();
  public readonly style = new ShapeStyle();
}
