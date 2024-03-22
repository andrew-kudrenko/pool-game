import { Position } from "../entity/position";
import { Sprite } from "../graphics/sprite";

export class SpriteRenderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  public draw(sprite: Sprite, position: Position) {
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

  public clear(position: Position) {
    this.ctx.clearRect(position.coords.x, position.coords.y, position.size.x, position.size.y);
  }
}
