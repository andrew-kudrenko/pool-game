export class ImageFactory {
  public create(path: string, width: number, height: number): Promise<HTMLImageElement> {
    const image = new Image(width, height);

    return new Promise((ok, fail) => {
      image.src = path;

      image.addEventListener("load", () => ok(image), { once: true });
      image.addEventListener("error", fail, { once: true });
    });
  }
}
