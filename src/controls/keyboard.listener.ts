type KeyboardEventListener = (event: KeyboardEvent) => void;

export class KeyboardListener {
  private readonly _onLongKeyDown: KeyboardEventListener;
  private readonly _onLongKeyUp: KeyboardEventListener;
  private readonly _onShortKeyDown: KeyboardEventListener;

  private readonly _longHandlers = new Map<string, VoidFunction>();
  private readonly _shortHandlers = new Map<string, VoidFunction>();
  private readonly _pressedKeys = new Set<string>();

  constructor() {
    this._onLongKeyDown = ({ key }) => this._pressedKeys.add(key);
    this._onLongKeyUp = ({ key }) => this._pressedKeys.delete(key);
    window.addEventListener("keydown", this._onLongKeyDown);
    window.addEventListener("keyup", this._onLongKeyUp);

    this._onShortKeyDown = ({ key }) => this._shortHandlers.get(key)?.();
    window.addEventListener("keydown", this._onShortKeyDown);
  }

  public stop() {
    window.removeEventListener("keydown", this._onLongKeyDown);
    window.removeEventListener("keyup", this._onLongKeyUp);

    window.removeEventListener("keydown", this._onShortKeyDown);
  }

  public update() {
    for (const [key, handler] of this._longHandlers.entries()) {
      if (this._pressedKeys.has(key)) {
        handler();
      }
    }
  }

  public onLong(key: string, handler: VoidFunction) {
    this._longHandlers.set(key, handler);
  }

  public onShort(key: string, handler: VoidFunction) {
    this._shortHandlers.set(key, handler);
  }

  public offLong(key: string) {
    this._longHandlers.delete(key);
  }

  public offShort(key: string) {
    this._shortHandlers.delete(key);
  }
}
