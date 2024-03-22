export class KeyboardListener {
  private readonly handlers = new Map<string, VoidFunction>();
  private readonly pressedKeys = new Set<string>();

  public listen() {
    window.addEventListener("keydown", ({ key }) => this.pressedKeys.add(key));
    window.addEventListener("keyup", ({ key }) => this.pressedKeys.delete(key));
  }

  public update() {
    for (const [key, handler] of this.handlers.entries()) {
      if (this.isPressed(key)) {
        handler();
      }
    }
  }

  public on(key: string, handler: VoidFunction) {
    this.handlers.set(key, handler);
  }

  public isPressed(key: string) {
    return this.pressedKeys.has(key);
  }
}
