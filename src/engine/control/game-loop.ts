export const enum GameLoopState {
  Idle = "idle",
  Running = "running",
  Paused = "paused",
  Done = "done",
}

export class GameLoop {
  private _state = GameLoopState.Idle;
  private _executor: VoidFunction;
  private _done?: VoidFunction;
  private _rafId?: number;

  constructor(executor: VoidFunction) {
    this._executor = () => {
      executor();

      if (this._state === GameLoopState.Running) {
        this._rafId = requestAnimationFrame(this._executor);
      }
    };
  }

  public start() {
    if (this._state === GameLoopState.Idle || this._state === GameLoopState.Done) {
      this._state = GameLoopState.Running;

      return new Promise<void>((ok) => {
        this._done = ok;
        this._executor();
      });
    }

    throw new Error("Game Loop can't be started");
  }

  public resume() {
    if (this._state === GameLoopState.Paused) {
      this._state = GameLoopState.Running;
      this._executor();
    }
  }

  public pause() {
    if (this._state === GameLoopState.Running) {
      this._state = GameLoopState.Paused;
    }
  }

  public stop() {
    if (this._state !== GameLoopState.Done) {
      this._state = GameLoopState.Done;

      if (this._rafId !== undefined) {
        cancelAnimationFrame(this._rafId);
      }

      this._done?.();
    }
  }
}
