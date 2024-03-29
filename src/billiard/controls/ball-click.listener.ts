import { Vector } from "../../common/vector";
import { CircleCollider } from "../../physics/circle-collider";
import { BilliardBall } from "../entities/billiard-ball";

const enum BallEventKind {
  LeftClick = "ball-left-click",
  RightClick = "ball-rigth-click",
}

interface BallEventPayload {
  ball: BilliardBall;
}

type BallEventHandler = (event: CustomEvent<BallEventPayload>) => void;

export class BallClickListener {
  constructor(
    private readonly _canvas: HTMLCanvasElement,
    private readonly _balls: BilliardBall[],
    private readonly _collider: CircleCollider
  ) {
    this.initEventListeners();
  }

  public onLeftClick(handler: BallEventHandler) {
    this._canvas.addEventListener<any>(BallEventKind.LeftClick, handler);
  }

  public onRightClick(handler: BallEventHandler) {
    this._canvas.addEventListener<any>(BallEventKind.RightClick, handler);
  }

  private initEventListeners() {
    this._canvas.addEventListener("click", (event) => {
      const ball = this.findBallByMousePosition(event);

      if (ball) {
        this._canvas.dispatchEvent(new CustomEvent(BallEventKind.LeftClick, { detail: { ball } }));
      }
    });

    this._canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const ball = this.findBallByMousePosition(event);

      if (ball) {
        this._canvas.dispatchEvent(new CustomEvent(BallEventKind.RightClick, { detail: { ball } }));
      }
    });
  }

  private findBallByMousePosition(event: MouseEvent) {
    const rect = this._canvas.getBoundingClientRect();
    const point = new Vector(event.pageX - rect.x, event.pageY - rect.y);

    return this._balls.find((b) => this._collider.hasCollisionWithPoint(b, point));
  }
}
