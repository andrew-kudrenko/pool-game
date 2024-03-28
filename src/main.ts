import { BilliardBall } from "./billiard/entities/billiard-ball";
import { CanvasRenderer } from "./graphics/canvas-renderer";
import { GameLoop } from "./engine/game-loop";
import { MoveEffect } from "./effects/move.effect";
import { FrictionForceEffect } from "./effects/friction-force.effect";
import { CircleCollider } from "./physics/circle-collider";
import { ResolveCircleCollisionEffect } from "./effects/resolve-circle-collision.effect";
import { KeyboardListener } from "./controls/keyboard-listener";
import { BilliardBallFactory } from "./billiard/entities/billiard-ball.factory";
import { RectPosition } from "./entity/rect-position";
import { Vector } from "./common/vector/vector";
import { BoundsCollisionEffect } from "./billiard/effects/bounds-collision.effect";

import "./style.css";

const area = new RectPosition(new Vector(), new Vector(800, 600));
const collider = new CircleCollider();
const ballFactory = new BilliardBallFactory(area, collider);

const balls: BilliardBall[] = [];

const canvas = new CanvasRenderer(
  (document.getElementById("balls-canvas") as HTMLCanvasElement).getContext(
    "2d"
  )!
);
canvas.setSize(area.size.x, area.size.y);

const move = new MoveEffect(0.045);
const frictionForce = new FrictionForceEffect(0.0025);
const resolveBallCollision = new ResolveCircleCollisionEffect(collider);
const boundsCollision = new BoundsCollisionEffect(area, 0.01);
const keyboard = new KeyboardListener();

const loop = new GameLoop(() => {
  keyboard.update();

  let ball: BilliardBall;

  for (let i = 0; i < balls.length; i++) {
    ball = balls[i];

    canvas.clearCircle(ball.position);
    boundsCollision.effect(ball);
    move.effect(ball);

    for (let j = 0; j < balls.length; j++) {
      if (j !== i) {
        if (resolveBallCollision.effect(balls[i], balls[j])) {
          balls[i].movement.velocity.invert();
        }
      }
    }

    frictionForce.effect(ball.movement);

    canvas.drawCircle(ball.position, ball.style);
  }
});

keyboard.onShort("p", () => loop.pause());
keyboard.onShort("o", () => loop.resume());
keyboard.onShort("s", () => loop.stop());
keyboard.onShort("b", () => {
  if (balls.length < 15) {
    balls.push(ballFactory.generate(balls));
  }
});

await loop.start();
