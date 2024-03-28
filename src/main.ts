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
import { BallsCollisionEffect } from "./billiard/effects/balls-collision.effect";

import "./style.css";

const area = new RectPosition(new Vector(), new Vector(800, 600));
const collider = new CircleCollider();
const ballFactory = new BilliardBallFactory(area, collider);

const balls: BilliardBall[] = [];

for (let i = 0; i < 10; i++) {
  balls.push(ballFactory.generate(balls));
}

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
const ballsCollision = new BallsCollisionEffect(0.3);
const keyboard = new KeyboardListener();

const loop = new GameLoop(() => {
  keyboard.update();

  for (let i = 0; i < balls.length; i++) {
    canvas.clearCircle(balls[i].position);

    boundsCollision.effect(balls[i]);
    move.effect(balls[i]);

    for (let j = 0; i !== j && j < balls.length; j++) {
      if (resolveBallCollision.effect(balls[i], balls[j])) {
        ballsCollision.effect(balls[i], balls[j]);
      }
    }

    frictionForce.effect(balls[i].movement);

    canvas.drawCircle(balls[i].position, balls[i].style);
  }
});

keyboard.onShort("p", () => loop.pause());
keyboard.onShort("o", () => loop.resume());
keyboard.onShort("s", () => loop.stop());
keyboard.onShort("b", () => {
  if (balls.length < 20) {
    balls.push(ballFactory.generate(balls));
  }
});

await loop.start();
