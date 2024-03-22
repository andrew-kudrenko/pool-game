import { engine } from "../../engine/engine";
import { Position } from "../../entity/position";
import { Sprite } from "../../graphics/sprite";

export class BilliardTable {
  public readonly position = new Position();
  constructor(public readonly sprite: Sprite) {}

  public static async create(width: number) {
    const ORIGINAL_WIDTH = 352;
    const ORIGINAL_HEIGHT = 179;

    const ratio = ORIGINAL_HEIGHT / ORIGINAL_WIDTH;

    const image = await engine.imageFactory.create(
      "/src/assets/billiard-table.png",
      ORIGINAL_WIDTH,
      ORIGINAL_WIDTH
    );
    const sprite = new Sprite(image);
    sprite.size.set(ORIGINAL_WIDTH, ORIGINAL_HEIGHT);

    const instance = new BilliardTable(sprite);
    instance.position.size.set(width, ratio * width);

    return instance;
  }
}
