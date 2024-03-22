import { Vector } from "../common/vector/vector";

export class RigidBody {
  private _weight = 0;
  public readonly velocity = new Vector();

  public get weight() {
    return this._weight;
  }

  public set weight(value: number) {
    if (value >= 0) {
      this._weight = value;
    }
  }
}
