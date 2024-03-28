import { Vector } from "../common/vector/vector";
import { Position } from "./position";

export class RectPosition extends Position {
  constructor(position = new Vector(), public readonly size = new Vector()) {
    super(position);
  }
}
