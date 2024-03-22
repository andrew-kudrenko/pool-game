import { ImageFactory } from "../graphics/image-factory";
import { GameLoop } from "./game-loop";

export class Engine {
  public readonly imageFactory = new ImageFactory();
  public readonly loop = new GameLoop();
}

export const engine = new Engine();
