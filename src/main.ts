import { Billiard } from "./billiard/billiard";
import { BilliardBall } from "./billiard/entities/billiard-ball";
import { BilliardTable } from "./billiard/entities/billiard-table";
import { BilliardBallRenderer } from "./billiard/render/ball-renderer";

import "./style.css";
import { randomFromArray, randomInt } from "./utils/random";

const colors = ["red", "yellow", "white", "purple", "cyan"];

const billiard = new Billiard(await BilliardTable.create(800));
const balls = [
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
  new BilliardBall(),
];

for (const ball of balls) {
  ball.position.coords.set(randomInt(50, 700), randomInt(30, 600));
  ball.color = randomFromArray(colors);
  ball.borderColor = randomFromArray(colors);
}

const ballCanvas = document.getElementById("balls-canvas") as HTMLCanvasElement;
ballCanvas.width = ballCanvas.height = 800;

const ballRenderer = new BilliardBallRenderer(ballCanvas.getContext("2d")!);

for (const ball of balls) {
  ballRenderer.draw(ball);
}

document.onclick = () => {
  if (balls.length) {
    const ball = balls.pop();
    ballRenderer.clear(ball!);
  }
};

document.onkeydown = () => {
  const ball = new BilliardBall();

  ball.position.coords.set(randomInt(50, 700), randomInt(30, 600));
  ball.color = randomFromArray(colors);
  ball.borderColor = randomFromArray(colors);

  balls.push(ball);
  ballRenderer.draw(ball);
};
