import { RectPosition } from "../../engine/entity/rect-position";
import { CircleCollider } from "../../engine/physics/circle-collider";
import { randomRgb } from "../../engine/utils/color.utils";
import { randomDouble, randomInt } from "../../engine/utils/random.utils";
import { BilliardBall } from "./billiard-ball";

export class BilliardBallFactory {
  private static readonly SPEED_LIMIT = 8;

  constructor(private readonly _area: RectPosition, private readonly _collider: CircleCollider) {}

  public generate(balls: BilliardBall[]) {
    const ball = new BilliardBall();

    ball.style.fillStyle = randomRgb();
    this.setRandomVelocity(ball);

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

  public setRandomVelocity(ball: BilliardBall) {
    ball.movement.velocity.set(
      randomDouble(-BilliardBallFactory.SPEED_LIMIT, BilliardBallFactory.SPEED_LIMIT),
      randomDouble(-BilliardBallFactory.SPEED_LIMIT, BilliardBallFactory.SPEED_LIMIT)
    );
  }

  private hasCollisions(ball: BilliardBall, balls: BilliardBall[]) {
    return balls.some((b) => this._collider.hasCollision(ball, b));
  }
}
