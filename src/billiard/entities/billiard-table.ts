import { RectPosition } from "../../entity/rect-position";
import { BilliardBall } from "./billiard-ball";

export class BilliardTable {
  public readonly position = new RectPosition();
  public readonly balls: BilliardBall[] = [];
}
