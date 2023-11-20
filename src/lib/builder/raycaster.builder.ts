import { RayCasterArithmetic } from '../math/raycaster.math';
import {
  Canvas,
  Color,
  Intersection,
  Light,
  Material,
  Matrix,
  Point,
  Ray,
  Shape,
  Sphere,
  Tuple,
  Vector,
  World,
  Camera,
  TestShape,
  Plane,
} from '../model/raycaster.model';

export class RayCasterBuilder {
  static createMatrix(
    matrixNumbers: number[],
    rows: number,
    columns: number
  ): Matrix {
    return new Matrix(matrixNumbers, rows, columns);
  }

  static getTranslationMatrix(x: number, y: number, z: number): Matrix {
    const translationMatrix: Matrix = this.createIdentityMatrix(4);
    translationMatrix.setNumber(0, 3, x);
    translationMatrix.setNumber(1, 3, y);
    translationMatrix.setNumber(2, 3, z);
    return translationMatrix;
  }

  static getScalingMatrix(x: number, y: number, z: number): Matrix {
    const scalingMatrix: Matrix = this.createIdentityMatrix(4);
    scalingMatrix.setNumber(0, 0, x);
    scalingMatrix.setNumber(1, 1, y);
    scalingMatrix.setNumber(2, 2, z);
    return scalingMatrix;
  }

  static getRotationMatrixX(radians: number): Matrix {
    const rotationX: Matrix = this.createIdentityMatrix(4);
    rotationX.setNumber(1, 1, Math.cos(radians));
    rotationX.setNumber(1, 2, -Math.sin(radians));
    rotationX.setNumber(2, 1, Math.sin(radians));
    rotationX.setNumber(2, 2, Math.cos(radians));
    return rotationX;
  }

  static getRotationMatrixY(radians: number): Matrix {
    const rotationY: Matrix = this.createIdentityMatrix(4);
    rotationY.setNumber(0, 0, Math.cos(radians));
    rotationY.setNumber(0, 2, Math.sin(radians));
    rotationY.setNumber(2, 0, -Math.sin(radians));
    rotationY.setNumber(2, 2, Math.cos(radians));
    return rotationY;
  }

  static getRotationMatrixZ(radians: number): Matrix {
    const rotationZ: Matrix = this.createIdentityMatrix(4);
    rotationZ.setNumber(0, 0, Math.cos(radians));
    rotationZ.setNumber(0, 1, -Math.sin(radians));
    rotationZ.setNumber(1, 0, Math.sin(radians));
    rotationZ.setNumber(1, 1, Math.cos(radians));
    return rotationZ;
  }

  static getShearingMatrix(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number
  ): Matrix {
    const shearingMatrix: Matrix = this.createIdentityMatrix(4);
    shearingMatrix.setNumber(0, 1, xy);
    shearingMatrix.setNumber(0, 2, xz);
    shearingMatrix.setNumber(1, 0, yx);
    shearingMatrix.setNumber(1, 2, yz);
    shearingMatrix.setNumber(2, 0, zx);
    shearingMatrix.setNumber(2, 1, zy);
    return shearingMatrix;
  }

  static createIdentityMatrix(size: number): Matrix {
    if (size < 0) {
      throw new Error(`Size must be positive`);
    }
    const matrixNumbers: number[] = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === j) {
          matrixNumbers.push(1);
        } else {
          matrixNumbers.push(0);
        }
      }
    }
    return new Matrix(matrixNumbers, size, size);
  }

  static createTuple(x: number, y: number, z: number, w: number): Tuple {
    if (RayCasterArithmetic.numberEquals(w, 1.0)) {
      return new Point(x, y, z);
    } else if (RayCasterArithmetic.numberEquals(w, 0.0)) {
      return new Vector(x, y, z);
    }
    return new Tuple(x, y, z, w);
  }

  static createPoint(x: number, y: number, z: number): Point {
    return new Point(x, y, z);
  }

  static createVector(x: number, y: number, z: number): Vector {
    return new Vector(x, y, z);
  }

  static createColor(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }

  static createCanvas(w: number, h: number): Canvas {
    return new Canvas(w, h);
  }

  static createRay(origin: Point, direction: Vector): Ray {
    return new Ray(origin, direction);
  }

  static createIntersection(t: number, shape: Shape): Intersection {
    return new Intersection(t, shape);
  }

  static createSphere(): Sphere {
    return new Sphere();
  }

  static createPlane(): Plane {
    return new Plane();
  }

  static createTestShape(): TestShape {
    return new TestShape();
  }

  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static createPointLight(position: Point, intensity: Color): Light {
    return new Light(position, intensity);
  }

  static createDefaultMaterial(): Material {
    return new Material();
  }

  static createMaterial(
    ambient: number,
    diffuse: number,
    specular: number,
    shininess: number,
    color: Color
  ): Material {
    return new Material(ambient, diffuse, specular, shininess, color);
  }

  static createWorld(): World {
    return new World();
  }

  static createDefaultWorld(): World {
    const defaultLight: Light = RayCasterBuilder.createPointLight(
      new Point(-10, 10, -10),
      new Color(1, 1, 1)
    );
    const defaultOuterSphere: Sphere = new Sphere();
    defaultOuterSphere.setMaterial(
      new Material(0.1, 0.7, 0.2, 200, new Color(0.8, 1.0, 0.6))
    );
    const defaultInnerSphere: Sphere = new Sphere();
    defaultInnerSphere.setMatrix(
      RayCasterBuilder.getScalingMatrix(0.5, 0.5, 0.5)
    );
    return new World(defaultLight, [defaultOuterSphere, defaultInnerSphere]);
  }

  static createCamera(
    hsize: number,
    vsize: number,
    fieldOfView: number
  ): Camera {
    return new Camera(hsize, vsize, fieldOfView);
  }
}