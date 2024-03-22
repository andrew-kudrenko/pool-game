import { Position } from "../../entity/position";

export class BilliardBall {
  public readonly position = new Position();
  public radius: number = 20;
  public color = "red";
  public borderColor = "cyan";
  public borderWidth = 2;
}
