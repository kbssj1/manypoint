import Base3DClass from "../base3DClass";
import { Mat4 } from "../math/mat4";
import { Vec3 } from "../math/vec3";

abstract class BaseCamera extends Base3DClass {
  public yaw: number = 0;
  public pitch: number = 0;

  constructor(position: Vec3, name: string) {
    super(position, name);
  }

  public abstract onMove(position: Vec3): void;
  public abstract onZoom(delta: number): void;
  public abstract onRotate(deltaX: number, deltaY: number): void;
  public abstract getViewMatrix(): Mat4;
}

export default BaseCamera;
