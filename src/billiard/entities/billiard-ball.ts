import { Movement } from "../../entity/movement";
import { CirclePosition } from "../../entity/circle-position";
import { ShapeStyle } from "../../entity/shape-style";
import { MoveableCircle } from "../../entity/entity.types";

export class BilliardBall implements MoveableCircle {
  public readonly position = new CirclePosition();
  public readonly movement = new Movement();
  public readonly style = new ShapeStyle();
}
