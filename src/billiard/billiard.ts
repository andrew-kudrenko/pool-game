import { FrictionForceEffect } from "../engine/effects/friction-force.effect";
import { MoveEffect } from "../engine/effects/move.effect";
import { ResolveCircleCollisionEffect } from "../engine/effects/resolve-circle-collision.effect";
import { RectPosition } from "../engine/entity/rect-position";
import { CanvasRenderer } from "../engine/graphics/canvas-renderer";
import { CircleCollider } from "../engine/physics/circle-collider";
import { BallClickListener } from "./listeners/ball-click.listener";
import { BallsCollisionEffect } from "./effects/balls-collision.effect";
import { BoundsCollisionEffect } from "./effects/bounds-collision.effect";
import { BilliardBall } from "./entities/billiard-ball";
import { BilliardBallFactory } from "./entities/billiard-ball.factory";
import { GameLoop } from "../engine/control/game-loop";
import { KeyboardListener } from "../engine/listeners/keyboard.listener";

export class Billiard {
  private static readonly MAX_BALLS_COUNT = 35;
  private readonly _balls: BilliardBall[] = [];
  private readonly _collider: CircleCollider;
  private readonly _ballFactory: BilliardBallFactory;
  private readonly _effects;
  private _shoundGenerateBallsCount = 0;

  public readonly clickListener: BallClickListener;
  public readonly loop: GameLoop;

  constructor(
    private readonly _canvas: CanvasRenderer,
    private readonly _keyboard: KeyboardListener,
    area: RectPosition
  ) {
    this._collider = new CircleCollider();
    this._ballFactory = new BilliardBallFactory(area, this._collider);
    this._effects = {
      move: new MoveEffect(0.045),
      frictionForce: new FrictionForceEffect(0.0025),
      resolveBallCollision: new ResolveCircleCollisionEffect(this._collider),
      boundsCollision: new BoundsCollisionEffect(area, 0.01),
      ballsCollision: new BallsCollisionEffect(0.3),
    } as const;
    this.clickListener = new BallClickListener(_canvas.ctx.canvas, this._balls, this._collider);

    this.initBalls();

    this.loop = new GameLoop(() => {
      this._keyboard.update();
      this.update();
    });
  }

  public restart() {
    this.loop.stop();
    this._canvas.clearAll();

    this.initBalls();

    return this.loop.start();
  }

  public scheduleGenerateRandomBall() {
    if (this._balls.length < Billiard.MAX_BALLS_COUNT) {
      this._shoundGenerateBallsCount++;
    } else if (this._shoundGenerateBallsCount !== 0) {
      this._shoundGenerateBallsCount = 0;
    }
  }

  public setRandomVelocity(ball: BilliardBall) {
    this._ballFactory.setRandomVelocity(ball);
  }

  private update() {
    for (let i = 0; i < this._balls.length; i++) {
      this._canvas.clearCircle(this._balls[i].position);

      this._effects.boundsCollision.effect(this._balls[i]);
      this._effects.move.effect(this._balls[i]);

      for (let j = 0; i !== j && j < this._balls.length; j++) {
        if (this._effects.resolveBallCollision.effect(this._balls[i], this._balls[j])) {
          this._effects.ballsCollision.effect(this._balls[i], this._balls[j]);
        }
      }

      this._effects.frictionForce.effect(this._balls[i].movement);
      this._canvas.drawCircle(this._balls[i].position, this._balls[i].style);

      this.tryAddRandomBall();
    }
  }

  private tryAddRandomBall() {
    if (this._shoundGenerateBallsCount > 0) {
      this._balls.push(this._ballFactory.generate(this._balls));
      this._shoundGenerateBallsCount = 0;
    }
  }

  private initBalls() {
    this._balls.length = 0;

    for (let i = 0; i < Billiard.MAX_BALLS_COUNT / 3; i++) {
      this._balls.push(this._ballFactory.generate(this._balls));
    }
  }
}
