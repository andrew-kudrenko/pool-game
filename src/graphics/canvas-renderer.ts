import { Line } from "../common/line";
import { CirclePosition } from "../entity/circle-position";
import { RectPosition } from "../entity/rect-position";
import { ShapeStyle } from "../entity/shape-style";
import { Sprite } from "./sprite";

const FULL_ROUND_ANGLE = Math.PI * 2;

export class CanvasRenderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  public setSize(width: number, height: number) {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }

  public drawCircle(position: CirclePosition, style: ShapeStyle) {
    this.ctx.save();

    this.ctx.fillStyle = style.fillStyle;
    this.ctx.strokeStyle = style.strokeStyle;
    this.ctx.lineWidth = style.lineWidth;

    this.ctx.beginPath();
    this.ctx.arc(
      position.coords.intX,
      position.coords.intY,
      position.radius,
      0,
      FULL_ROUND_ANGLE,
      false
    );
    this.ctx.fill();

    this.ctx.restore();
  }

  public clearCircle(position: CirclePosition) {
    this.ctx.save();

    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.beginPath();
    this.ctx.arc(
      position.coords.intX,
      position.coords.intY,
      position.radius + this.ctx.lineWidth,
      0,
      FULL_ROUND_ANGLE,
      false
    );
    this.ctx.fill();

    this.ctx.restore();
  }

  public drawLine(line: Line) {
    this.ctx.save();

    this.ctx.strokeStyle = "red";
    if (line.angle) {
      this.ctx.rotate(line.angle);
    }

    this.ctx.beginPath();
    this.ctx.moveTo(line.start.x, line.start.y);
    this.ctx.lineTo(line.end.x, line.end.y);
    this.ctx.stroke();

    this.ctx.restore();
  }

  public drawSprite(sprite: Sprite, position: RectPosition) {
    this.ctx.drawImage(
      sprite.source,
      sprite.coords.x,
      sprite.coords.y,
      sprite.size.x,
      sprite.size.y,
      position.coords.x,
      position.coords.y,
      position.size.x,
      position.size.y
    );
  }

  public clearRect(position: RectPosition) {
    this.ctx.clearRect(
      position.coords.x,
      position.coords.y,
      position.size.x,
      position.size.y
    );
  }
}
