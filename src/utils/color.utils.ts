import { randomInt } from "./random.utils";

export function randomRgb() {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
}
