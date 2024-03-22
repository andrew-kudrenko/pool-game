export class GameLoop {
  public isRunning = false;

  public run(loop: VoidFunction) {
    this.isRunning = true;

    let execute = () => {
      loop();
      requestAnimationFrame(execute);
    };

    return new Promise<void>((ok) => {
      if (!this.isRunning) {
        ok();
      }

      execute();
    });
  }

  public stop() {
    this.isRunning = false;
  }
}
