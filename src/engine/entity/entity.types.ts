import { CirclePosition } from "./circle-position";
import { Movement } from "./movement";
import { Position } from "./position";
import { RectPosition } from "./rect-position";

export interface Moveable {
  position: Position;
  movement: Movement;
}

export interface MoveableCircle extends Moveable {
  position: CirclePosition;
}

export interface MoveableRect extends Moveable {
  position: RectPosition;
}
