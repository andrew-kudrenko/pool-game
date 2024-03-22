import { BaseEntity } from "../entity/base.entity";

export abstract class Collider {
  protected entities = new Set<BaseEntity>();

  public add(entity: BaseEntity) {
    this.entities.add(entity);
  }

  public remove(entity: BaseEntity) {
    this.entities.delete(entity);
  }

  public hasAny(a: BaseEntity) {
    for (const b of this.entities) {
      if (
        Collider.isLeftBottomCornerInside(a, b) ||
        Collider.isRightBottomCornerInside(a, b) ||
        Collider.isLeftTopCornerInside(a, b) ||
        Collider.isRightTopCornerInside(a, b) ||
        Collider.isLeftTopCornerInside(b, a) ||
        Collider.isRightTopCornerInside(b, a) ||
        Collider.isLeftTopCornerInside(b, a) ||
        Collider.isRightTopCornerInside(b, a)
      ) {
        return true;
      }
    }

    return false;
  }

  protected static isLeftTopCornerInside(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, this.getX(a)) && this.isInsideByY(b, this.getY(a));
  }

  protected static isLeftBottomCornerInside(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, this.getX(a)) && this.isInsideByY(b, this.getYBottom(a));
  }

  protected static isRightTopCornerInside(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, this.getXRight(a)) && this.isInsideByY(b, this.getY(a));
  }

  protected static isRightBottomCornerInside(a: BaseEntity, b: BaseEntity) {
    return this.isInsideByX(b, this.getXRight(a)) && this.isInsideByY(b, this.getYBottom(a));
  }

  protected static getX(a: BaseEntity) {
    return a.coords.x + a.collisionFrame.x;
  }

  protected static getXRight(a: BaseEntity) {
    return a.coords.x + a.collisionFrame.x + a.collisionFrame.width;
  }

  protected static getY(a: BaseEntity) {
    return a.coords.y + a.collisionFrame.y;
  }

  protected static getYBottom(a: BaseEntity) {
    return a.coords.y + a.collisionFrame.y + a.collisionFrame.height;
  }

  protected static isInsideByX(entity: BaseEntity, x: number) {
    const start = entity.coords.x + entity.collisionFrame.x;
    return x >= start && x <= start + entity.collisionFrame.width;
  }

  protected static isInsideByY(entity: BaseEntity, y: number) {
    const start = entity.coords.y + entity.collisionFrame.y;
    return y >= start && y <= start + entity.collisionFrame.height;
  }
}
