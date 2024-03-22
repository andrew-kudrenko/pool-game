import { BilliardBall } from "../entities/billiard-ball";

const FULL_ROUND_ANGLE = Math.PI * 2;

export class BilliardBallRenderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  public draw(ball: BilliardBall) {
    this.ctx.save();

    this.ctx.lineWidth = ball.borderWidth;
    this.ctx.fillStyle = ball.color;
    this.ctx.strokeStyle = ball.borderColor;

    this.ctx.beginPath();
    this.ctx.arc(
      ball.position.coords.x,
      ball.position.coords.y,
      ball.radius,
      0,
      FULL_ROUND_ANGLE,
      false
    );
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.restore();
  }

  public clear(ball: BilliardBall) {
    this.ctx.save();

    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.beginPath();
    this.ctx.arc(
      ball.position.coords.x,
      ball.position.coords.y,
      ball.radius + ball.borderWidth * 2,
      0,
      FULL_ROUND_ANGLE,
      false
    );
    this.ctx.fill();

    this.ctx.restore();
  }
}
