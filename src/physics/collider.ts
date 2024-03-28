import { Line } from "../common/line";

export class Collider {
  private _lines = new Set<Line>();

  public add(line: Line) {
    this._lines.add(line);
  }
}
