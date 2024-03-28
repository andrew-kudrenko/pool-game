import { RectPosition } from "../../entity/rect-position";
import { CircleCollider } from "../../physics/circle-collider";
import {
  randomDouble,
  randomFromArray,
  randomInt,
} from "../../utils/random.utils";
import { BilliardBall } from "./billiard-ball";

export class BilliardBallFactory {
  private readonly _colors = ["red", "yellow", "white", "purple", "cyan"];
  private _speedLimit = 7;

  constructor(
    private readonly _area: RectPosition,
    private readonly _collider: CircleCollider
  ) {}

  public generate(balls: BilliardBall[]) {
    const ball = new BilliardBall();

    ball.style.fillStyle = randomFromArray(this._colors);
    ball.movement.velocity.set(
      randomDouble(-this._speedLimit, this._speedLimit),
      randomDouble(-this._speedLimit, this._speedLimit)
    );

    ball.position.radius = randomInt(10, 25);

    do {
      ball.position.coords.set(
        randomInt(
          this._area.coords.x + ball.position.radius,
          this._area.coords.x + this._area.size.x - ball.position.radius
        ),
        randomInt(
          this._area.coords.y + ball.position.radius,
          this._area.coords.y + this._area.size.y - ball.position.radius
        )
      );
    } while (this.hasCollisions(ball, balls));

    return ball;
  }

  private hasCollisions(ball: BilliardBall, balls: BilliardBall[]) {
    return balls.some((b) => this._collider.hasCollision(ball, b));
  }
}
