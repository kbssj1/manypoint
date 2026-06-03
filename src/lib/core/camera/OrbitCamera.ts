import { Mat4 } from "../math/mat4";
import { Vec3 } from "../math/vec3";
import BaseCamera from "./BaseCamera";

class OrbitCamera extends BaseCamera {
  public cameraDistance: number = 10;
  private target: Vec3 = new Vec3([0, 0, 0]);

  public onMove(_position: Vec3): void {
    // Reserved for panning support.
  }

  public onZoom(delta: number): void {
    this.cameraDistance += delta;
    if (this.cameraDistance < 0.0) this.cameraDistance = 0.0;
  }

  public onRotate(deltaX: number, deltaY: number): void {
    this.yaw -= deltaX / 100;
    this.pitch += deltaY / 100;
  }

  public getViewMatrix(): Mat4 {
    this.pitch = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.pitch));

    const radius = this.cameraDistance;
    const eye = new Vec3([
      this.localPosition.x + radius * Math.cos(this.pitch) * Math.sin(this.yaw),
      this.localPosition.y + radius * Math.sin(this.pitch),
      this.localPosition.z + radius * Math.cos(this.pitch) * Math.cos(this.yaw),
    ]);

    return Mat4.lookAt(eye, this.target, new Vec3([0, 1, 0]));
  }
}

export default OrbitCamera;
