import { RayCasterImager } from '../imaging/raycaster.imaging';
import { RayCasterBuilder } from '../builder/raycaster.builder';
import { RayCasterArithmetic, RAYCASTER_EPSILON } from '../math/raycaster.math';
import {
  Camera,
  Canvas,
  Color,
  Computations,
  Environment,
  Intersection,
  Intersections,
  Light,
  Material,
  Matrix,
  Point,
  Projectile,
  Ray,
  Sphere,
  Tuple,
  Vector,
  World,
  Shape,
} from '../model/raycaster.model';

describe('raycaster.math.spec', () => {
  it('adding vector and point create point', () => {
    // GIVEN a tuple as vector
    const a: Tuple = RayCasterBuilder.createTuple(3, -2, 5, 1);
    const b: Tuple = RayCasterBuilder.createTuple(-2, 3, 1, 0);
    const c: Tuple = RayCasterBuilder.createTuple(1, 1, 6, 1);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.addTuples(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Point).toBeTruthy();
  });

  it('adding vector and vector create vector', () => {
    // GIVEN a tuple as vector
    const a: Tuple = RayCasterBuilder.createTuple(3, -2, 5, 0);
    const b: Tuple = RayCasterBuilder.createTuple(-2, 3, 1, 0);
    const c: Tuple = RayCasterBuilder.createTuple(1, 1, 6, 0);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.addTuples(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Vector).toBeTruthy();
  });

  it('substraction of points creates a vector', () => {
    // GIVEN a tuple as vector
    const a: Tuple = RayCasterBuilder.createTuple(3, 2, 1, 1);
    const b: Tuple = RayCasterBuilder.createTuple(5, 6, 7, 1);
    const c: Tuple = RayCasterBuilder.createTuple(-2, -4, -6, 0);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.substractPoints(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Vector).toBeTruthy();
  });

  it('substraction vector from a point creates a point', () => {
    // GIVEN a tuple as vector
    const a: Point = RayCasterBuilder.createTuple(3, 2, 1, 1);
    const b: Vector = RayCasterBuilder.createTuple(5, 6, 7, 0);
    const c: Point = RayCasterBuilder.createTuple(-2, -4, -6, 1);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.substractVectorFromPoint(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Point).toBeTruthy();
  });

  it('substraction of vectors creates a vector', () => {
    // GIVEN a tuple as vector
    const a: Vector = RayCasterBuilder.createTuple(3, 2, 1, 0);
    const b: Vector = RayCasterBuilder.createTuple(5, 6, 7, 0);
    const c: Point = RayCasterBuilder.createTuple(-2, -4, -6, 0);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.substractVectors(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Vector).toBeTruthy();
  });

  it('inversion of vectors creates a vector', () => {
    // GIVEN a tuple as vector
    const a: Vector = RayCasterBuilder.createTuple(1, -2, 3, 0);
    const b: Vector = RayCasterBuilder.createTuple(-1, 2, -3, 0);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.inverseVector(a);

    // THEN
    expect(d.equals(b)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Vector).toBeTruthy();
  });

  it('inversion of tuple creates a tupel', () => {
    // GIVEN a tuple as vector
    const a: Vector = RayCasterBuilder.createTuple(1, -2, 3, -4);
    const b: Vector = RayCasterBuilder.createTuple(-1, 2, -3, 4);

    // WHEN Tupels are added
    const d = RayCasterArithmetic.inverseTuple(a);

    // THEN
    expect(d.equals(b)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Tuple).toBeTruthy();
  });

  it('multiply a tuple by a scalar', () => {
    // GIVEN a tuple as vector
    const a: Tuple = RayCasterBuilder.createTuple(1, -2, 3, -4);
    const b: Tuple = RayCasterBuilder.createTuple(3.5, -7, 10.5, -14);

    // WHEN Tupels are added
    const d: Tuple = RayCasterArithmetic.multiplyTuple(a, 3.5);

    // THEN
    expect(d.equals(b)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Tuple).toBeTruthy();
  });

  it('multiply a tuple by a fraction', () => {
    // GIVEN a tuple as vector
    const a: Tuple = RayCasterBuilder.createTuple(1, -2, 3, -4);
    const b: Tuple = RayCasterBuilder.createTuple(0.5, -1, 1.5, -2);

    // WHEN Tupels are added
    const d: Tuple = RayCasterArithmetic.multiplyTuple(a, 0.5);

    // THEN
    expect(d.equals(b)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Tuple).toBeTruthy();
  });

  it('divide a tuple by a scalar', () => {
    // GIVEN a tuple as vector
    const a: Tuple = RayCasterBuilder.createTuple(1, -2, 3, -4);
    const b: Tuple = RayCasterBuilder.createTuple(0.5, -1, 1.5, -2);

    // WHEN Tupels are added
    const d: Tuple = RayCasterArithmetic.divideTuple(a, 2.0);

    // THEN
    expect(d.equals(b)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Tuple).toBeTruthy();
  });

  it('get the magnitude of a vector', () => {
    // GIVEN a tuple as vector
    const a: Vector = RayCasterBuilder.createVector(1, 0, 0);

    // WHEN calculating the length of a vector
    const n: number = RayCasterArithmetic.magnitudeOf(a);

    // THEN
    expect(RayCasterArithmetic.numberEquals(1.0, n)).toBeTruthy();
  });

  it('normalizing a scalar x vector', () => {
    // GIVEN a tuple as vector
    const a: Vector = RayCasterBuilder.createVector(4, 0, 0);

    // WHEN calculating the length of a vector
    const n: Vector = RayCasterArithmetic.normalize(a);

    // THEN
    expect(n.equals(RayCasterBuilder.createVector(1, 0, 0))).toBeTruthy();
  });

  it('normalizing a vector', () => {
    // GIVEN a tuple as vector
    const a: Vector = RayCasterBuilder.createVector(1, 2, 3);

    // WHEN calculating the length of a vector
    const n: Vector = RayCasterArithmetic.normalize(a);

    // THEN
    expect(
      n.equals(RayCasterBuilder.createVector(0.26726, 0.53452, 0.80178))
    ).toBeTruthy();
  });

  it('calculate the dot product of vector', () => {
    // GIVEN two vectors
    const a: Vector = RayCasterBuilder.createVector(1, 2, 3);
    const b: Vector = RayCasterBuilder.createVector(2, 3, 4);

    // WHEN calculating the dot product of a vector
    const n: number = RayCasterArithmetic.dotProduct(a, b);

    // THEN
    expect(RayCasterArithmetic.numberEquals(20, n)).toBeTruthy();
  });

  it('calculate the cross product of vectors', () => {
    // GIVEN two vectors
    const a: Vector = RayCasterBuilder.createVector(1, 2, 3);
    const b: Vector = RayCasterBuilder.createVector(2, 3, 4);

    // WHEN calculating the dot product of a vector
    const c: Vector = RayCasterArithmetic.crossProduct(a, b);
    const d: Vector = RayCasterBuilder.createVector(-1, 2, -1);

    // THEN
    expect(c.equals(d)).toBeTruthy();
  });

  it('calculate the cross product of vectors', () => {
    // GIVEN two vectors
    const a: Vector = RayCasterBuilder.createVector(1, 2, 3);
    const b: Vector = RayCasterBuilder.createVector(2, 3, 4);

    // WHEN calculating the dot product of a vector
    const c: Vector = RayCasterArithmetic.crossProduct(b, a);
    const d: Vector = RayCasterBuilder.createVector(1, -2, 1);

    // THEN
    expect(c.equals(d)).toBeTruthy();
  });

  it('trace projectile', () => {
    // GIVEN a projectile and an environment
    let p: Projectile = new Projectile(
      new Point(0, 1, 0),
      RayCasterArithmetic.normalize(new Vector(1, 1, 0))
    );
    const e: Environment = new Environment(
      new Vector(0, -0.1, 0),
      new Vector(-0.01, 0, 0)
    );
    const traceFunction = function () {
      //console.log('Projectile Position x/y: ' + p.position.x + '/' + p.position.y);
      p = RayCasterArithmetic.tick(e, p);
    };
    while (p.position.y > 0) {
      traceFunction();
    }
    // THEN
    expect(p.position.y <= 0).toBeTruthy();
  });

  it('add colors', () => {
    // GIVEN Colors
    const a: Color = RayCasterBuilder.createColor(0.9, 0.6, 0.75);
    const b: Color = RayCasterBuilder.createColor(0.7, 0.1, 0.25);
    const c: Color = RayCasterBuilder.createColor(1.6, 0.7, 1.0);

    // WHEN Colors are added
    const d: Color = RayCasterArithmetic.addColors(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Color).toBeTruthy();
  });

  it('substract colors', () => {
    // GIVEN Colors
    const a: Color = RayCasterBuilder.createColor(0.9, 0.6, 0.75);
    const b: Color = RayCasterBuilder.createColor(0.7, 0.1, 0.25);
    const c: Color = RayCasterBuilder.createColor(0.2, 0.5, 0.5);

    // WHEN Colors are substracted
    const d: Color = RayCasterArithmetic.substractColors(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Color).toBeTruthy();
  });

  it('multiply color by scalar', () => {
    // GIVEN colors
    const a: Color = RayCasterBuilder.createColor(0.2, 0.3, 0.4);
    const b: Color = RayCasterBuilder.createColor(0.4, 0.6, 0.8);

    // WHEN Color and scalar are multiplied
    const d: Color = RayCasterArithmetic.multiplyColor(a, 2.0);

    // THEN
    expect(d.equals(b)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Color).toBeTruthy();
  });

  it('multiply colors', () => {
    // GIVEN colors
    const a: Color = RayCasterBuilder.createColor(1, 0.2, 0.4);
    const b: Color = RayCasterBuilder.createColor(0.9, 1, 0.1);
    const c: Color = RayCasterBuilder.createColor(0.9, 0.2, 0.04);

    // WHEN Colors are multiplied
    const d: Color = RayCasterArithmetic.multiplyColors(a, b);

    // THEN
    expect(d.equals(c)).toBeTruthy();
    const typeofResult = typeof d;
    expect(d instanceof Color).toBeTruthy();
  });

  it('check matrix multiplication on matrices 4x4', () => {
    // GIVEN a matrix
    const matrixNumbersA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];
    const matrixNumbersB = [-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8];
    const expectedResult = [
      20, 22, 50, 48, 44, 54, 114, 108, 40, 58, 110, 102, 16, 26, 46, 42,
    ];
    const rows = 4;
    const columns = 4;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const mB: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersB,
      rows,
      columns
    );
    const mC: Matrix = RayCasterBuilder.createMatrix(
      expectedResult,
      rows,
      columns
    );

    const md: Matrix = RayCasterArithmetic.multiplyMatrix(mA, mB);
    expect(md.equals(mC)).toBeTruthy();
  });

  it('check matrix multiplication on matrices 3x3', () => {
    // GIVEN a matrix
    const matrixNumbersA = [-3, 5, 0, 1, -2, 7, 0, 1, 1];
    const matrixNumbersB = [-3, 5, 0, 1, -2, 7, 0, 1, 1];
    const rows = 3;
    const columns = 3;
    const expectedResult = [14, -25, 35, -5, 16, -7, 1, -1, 8];
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const mB: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersB,
      rows,
      columns
    );
    const mC: Matrix = RayCasterBuilder.createMatrix(
      expectedResult,
      rows,
      columns
    );

    const md: Matrix = RayCasterArithmetic.multiplyMatrix(mA, mB);
    expect(md.equals(mC)).toBeTruthy();
  });

  it('check creation of identity matrix', () => {
    const size = 4;
    const identityNumbers = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const mA: Matrix = RayCasterBuilder.createIdentityMatrix(size);
    const mB: Matrix = RayCasterBuilder.createMatrix(
      identityNumbers,
      size,
      size
    );
    expect(mA.equals(mB)).toBeTruthy();
  });

  it('check multiplication of identity matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [-3, 5, 0, 1, -2, 7, 0, 1, 1];
    const rows = 3;
    const columns = 3;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const mB: Matrix = RayCasterBuilder.createIdentityMatrix(rows);
    const md: Matrix = RayCasterArithmetic.multiplyMatrix(mA, mB);
    expect(md.equals(mA)).toBeTruthy();
  });

  it('transpose a matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8];
    const matrixNumbersB = [0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8];
    const rows = 4;
    const columns = 4;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const mC: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersB,
      rows,
      columns
    );
    const mT: Matrix = RayCasterArithmetic.transposeMatrix(mA);
    expect(mT.equals(mC)).toBeTruthy();
  });

  it('transpose a matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [1, 5, -3, 2];
    const rows = 2;
    const columns = 2;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const d: number = RayCasterArithmetic.getDeterminant(mA);
    expect(d === 17).toBeTruthy();
  });

  it('get the submatrix of matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [1, 5, 0, -3, 2, 7, 0, 6, -3];
    const subMatrixNumbers = [-3, 2, 0, 6];
    const rows = 3;
    const columns = 3;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    // WHEN
    const subB: Matrix = RayCasterArithmetic.getSubmatrix(mA, 0, 2);
    // THEN
    const subA: Matrix = RayCasterBuilder.createMatrix(subMatrixNumbers, 2, 2);
    expect(subA.equals(subB)).toBeTruthy();
  });

  it('get the submatrix of matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      -6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1,
    ];
    const subMatrixNumbers = [-6, 1, 6, -8, 8, 6, -7, -1, 1];
    const rows = 4;
    const columns = 4;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // WHEN
    const subA: Matrix = RayCasterArithmetic.getSubmatrix(mA, 2, 1);
    const subB: Matrix = RayCasterBuilder.createMatrix(subMatrixNumbers, 3, 3);

    // THEN
    expect(subA.equals(subB)).toBeTruthy();
  });

  it('get the minor of a matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [3, 5, 0, 2, -1, -7, 6, -1, 5];
    const rows = 3;
    const columns = 3;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // WHEN
    const subA: Matrix = RayCasterArithmetic.getSubmatrix(mA, 1, 0);

    // THEN
    const a: number = RayCasterArithmetic.getDeterminant(subA);
    const b: number = RayCasterArithmetic.getMinor(mA, 1, 0);
    expect(a === 25 && b === 25).toBeTruthy();
  });

  it('get the cofactors of a matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [3, 5, 0, 2, -1, -7, 6, -1, 5];
    const rows = 3;
    const columns = 3;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // THEN
    const a: number = RayCasterArithmetic.getMinor(mA, 0, 0);
    const b: number = RayCasterArithmetic.getCofactor(mA, 0, 0);
    const c: number = RayCasterArithmetic.getMinor(mA, 1, 0);
    const d: number = RayCasterArithmetic.getCofactor(mA, 1, 0);
    expect(a === -12).toBeTruthy();
    expect(b === -12).toBeTruthy();
    expect(c === 25).toBeTruthy();
    expect(d === -25).toBeTruthy();
  });

  it('cofactors and determinant 3x3', () => {
    // GIVEN a matrix
    const matrixNumbersA = [1, 2, 6, -5, 8, -4, 2, 6, 4];
    const rows = 3;
    const columns = 3;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // THEN
    const a: number = RayCasterArithmetic.getCofactor(mA, 0, 0);
    const b: number = RayCasterArithmetic.getCofactor(mA, 0, 1);
    const c: number = RayCasterArithmetic.getCofactor(mA, 0, 2);
    const d: number = RayCasterArithmetic.getDeterminant(mA);
    expect(a === 56).toBeTruthy();
    expect(b === 12).toBeTruthy();
    expect(c === -46).toBeTruthy();
    expect(d === -196).toBeTruthy();
  });

  it('cofactors and determinant 4x4', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      -2, -8, 3, 5, -3, 1, 7, 3, 1, 2, -9, 6, -6, 7, 7, -9,
    ];
    const rows = 4;
    const columns = 4;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // THEN
    const a: number = RayCasterArithmetic.getCofactor(mA, 0, 0);
    const b: number = RayCasterArithmetic.getCofactor(mA, 0, 1);
    const c: number = RayCasterArithmetic.getCofactor(mA, 0, 2);
    const d: number = RayCasterArithmetic.getCofactor(mA, 0, 3);
    const e: number = RayCasterArithmetic.getDeterminant(mA);
    expect(a === 690).toBeTruthy();
    expect(b === 447).toBeTruthy();
    expect(c === 210).toBeTruthy();
    expect(d === 51).toBeTruthy();
    expect(e === -4071).toBeTruthy();
  });

  it('check that determinant is invertible', () => {
    // GIVEN a matrix
    const matrixNumbersA = [6, 4, 4, 4, 5, 5, 7, 6, 4, -9, 3, -7, 9, 1, 7, -6];
    const rows = 4;
    const columns = 4;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // THEN
    const a: number = RayCasterArithmetic.getDeterminant(mA);
    expect(a === -2120).toBeTruthy();
    expect(RayCasterArithmetic.isInvertible(mA)).toBeTruthy();
  });

  it('check that determinant is not invertible', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      -4, 2, -2, -3, 9, 6, 2, 6, 0, -5, 1, -5, 0, 0, 0, 0,
    ];
    const rows = 4;
    const columns = 4;
    const mA: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );

    // THEN
    const a: number = RayCasterArithmetic.getDeterminant(mA);
    expect(a === 0).toBeTruthy();
    expect(RayCasterArithmetic.isInvertible(mA)).toBeFalsy();
  });

  it('calculate the inverse and cofactors of a 4x4 matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      -5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4,
    ];
    const matrixNumbersInverse = [
      0.21805, 0.45113, 0.2406, -0.04511, -0.80827, -1.45677, -0.44361, 0.52068,
      -0.07895, -0.22368, -0.05263, 0.19737, -0.52256, -0.81391, -0.30075,
      0.30639,
    ];
    const rows = 4;
    const columns = 4;
    const a: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const aExpectedInverse: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersInverse,
      rows,
      columns
    );

    // THEN
    const aInverse: Matrix = RayCasterArithmetic.inverse(a);

    const d = RayCasterArithmetic.getDeterminant(a);
    expect(d === 532).toBeTruthy();

    const e = RayCasterArithmetic.getCofactor(a, 2, 3);
    expect(e === -160).toBeTruthy();

    expect(
      RayCasterArithmetic.numberEquals(aInverse.getNumber(3, 2), -160 / 532)
    ).toBeTruthy();

    const f = RayCasterArithmetic.getCofactor(a, 3, 2);
    expect(f === 105).toBeTruthy();

    expect(
      RayCasterArithmetic.numberEquals(aInverse.getNumber(2, 3), 105 / 532)
    ).toBeTruthy();

    expect(aInverse.equals(aExpectedInverse)).toBeTruthy();
  });

  it('calculate the inverse of a 4x4 matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      8, -5, 9, 2, 7, 5, 6, 1, -6, 0, 9, 6, -3, 0, -9, -4,
    ];
    const matrixNumbersInverse = [
      -0.15385, -0.15385, -0.28205, -0.53846, -0.07692, 0.12308, 0.02564,
      0.03077, 0.35897, 0.35897, 0.4359, 0.92308, -0.69231, -0.69231, -0.76923,
      -1.92308,
    ];
    const rows = 4;
    const columns = 4;
    const a: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const aExpectedInverse: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersInverse,
      rows,
      columns
    );

    // THEN
    const aInverse: Matrix = RayCasterArithmetic.inverse(a);
    expect(aInverse.equals(aExpectedInverse)).toBeTruthy();
  });

  it('calculate the inverse of an other 4x4 matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      9, 3, 0, 9, -5, -2, -6, -3, -4, 9, 6, 4, -7, 6, 6, 2,
    ];
    const matrixNumbersInverse = [
      -0.04074, -0.07778, 0.14444, -0.22222, -0.07778, 0.03333, 0.36667,
      -0.33333, -0.02901, -0.1463, -0.10926, 0.12963, 0.17778, 0.06667,
      -0.26667, 0.33333,
    ];
    const rows = 4;
    const columns = 4;
    const a: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const aExpectedInverse: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersInverse,
      rows,
      columns
    );

    // THEN
    const aInverse: Matrix = RayCasterArithmetic.inverse(a);
    expect(aInverse.equals(aExpectedInverse)).toBeTruthy();
  });

  it('calculate with the inverse of an other 4x4 matrix', () => {
    // GIVEN a matrix
    const matrixNumbersA = [
      3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1,
    ];
    const matrixNumbersB = [8, 2, 2, 2, 3, -1, 7, 0, 7, 0, 5, 4, 6, -2, 0, 5];
    const rows = 4;
    const columns = 4;
    const a: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersA,
      rows,
      columns
    );
    const b: Matrix = RayCasterBuilder.createMatrix(
      matrixNumbersB,
      rows,
      columns
    );

    // THEN
    // c = a * b;
    const c: Matrix = RayCasterArithmetic.multiplyMatrix(a, b);
    const inverseB: Matrix = RayCasterArithmetic.inverse(b);
    // a = c * bI;
    const aResolved: Matrix = RayCasterArithmetic.multiplyMatrix(c, inverseB);
    expect(aResolved.equals(a)).toBeTruthy();
  });
  it('multiply by a translation matrix', () => {
    const translationMatrix: Matrix = RayCasterBuilder.getTranslationMatrix(
      5,
      -3,
      2
    );
    let point: Point = RayCasterBuilder.createPoint(-3, 4, 5);
    point = RayCasterArithmetic.multiplyMatrixWithPoint(
      translationMatrix,
      point
    );
    const pointB: Point = RayCasterBuilder.createPoint(2, 1, 7);
    expect(point.equals(pointB)).toBeTruthy();
  });

  it('multiply by the inverse of a translation matrix', () => {
    let translationMatrix: Matrix = RayCasterBuilder.getTranslationMatrix(
      5,
      -3,
      2
    );
    translationMatrix = RayCasterArithmetic.inverse(translationMatrix);
    let point: Point = RayCasterBuilder.createPoint(-3, 4, 5);
    point = RayCasterArithmetic.multiplyMatrixWithPoint(
      translationMatrix,
      point
    );
    const pointB: Point = RayCasterBuilder.createPoint(-8, 7, 3);
    expect(point.equals(pointB)).toBeTruthy();
  });

  it('translation does not affect vectors', () => {
    let translationMatrix: Matrix = RayCasterBuilder.getTranslationMatrix(
      5,
      -3,
      2
    );
    let vector: Vector = RayCasterBuilder.createVector(-3, 4, 5);
    let vectorB: Vector = RayCasterArithmetic.multiplyMatrixWithVector(
      translationMatrix,
      vector
    );
    expect(vector.equals(vectorB)).toBeTruthy();
  });

  it('a scaling matrix applied to a point', () => {
    let translationMatrix: Matrix = RayCasterBuilder.getScalingMatrix(2, 3, 4);
    let point: Point = RayCasterBuilder.createPoint(-4, 6, 8);
    point = RayCasterArithmetic.multiplyMatrixWithPoint(
      translationMatrix,
      point
    );
    const pointB: Point = RayCasterBuilder.createPoint(-8, 18, 32);
    expect(point.equals(pointB)).toBeTruthy();
  });

  it('a scaling matrix applied to a vector', () => {
    let translationMatrix: Matrix = RayCasterBuilder.getScalingMatrix(2, 3, 4);
    let vector: Vector = RayCasterBuilder.createVector(-4, 6, 8);
    vector = RayCasterArithmetic.multiplyMatrixWithVector(
      translationMatrix,
      vector
    );
    const vectorB: Vector = RayCasterBuilder.createVector(-8, 18, 32);
    expect(vector.equals(vectorB)).toBeTruthy();
  });

  it('multiplying by the inverse of a scaling matrix', () => {
    let translationMatrix: Matrix = RayCasterBuilder.getScalingMatrix(2, 3, 4);
    translationMatrix = RayCasterArithmetic.inverse(translationMatrix);
    let vectorA: Vector = RayCasterBuilder.createVector(-4, 6, 8);
    let vectorB: Vector = RayCasterBuilder.createVector(-2, 2, 2);
    let vectorC = RayCasterArithmetic.multiplyMatrixWithVector(
      translationMatrix,
      vectorA
    );
    expect(vectorB.equals(vectorC)).toBeTruthy();
  });

  it('reflection is scaling by a negative value', () => {
    let translationMatrix: Matrix = RayCasterBuilder.getScalingMatrix(-1, 1, 1);
    let point: Point = RayCasterBuilder.createPoint(2, 3, 4);
    point = RayCasterArithmetic.multiplyMatrixWithPoint(
      translationMatrix,
      point
    );
    const pointB: Point = RayCasterBuilder.createPoint(-2, 3, 4);
    expect(point.equals(pointB)).toBeTruthy();
  });

  it('rotation around the x axis', () => {
    let point: Point = RayCasterBuilder.createPoint(0, 1, 0);
    let rotationXMatrixA: Matrix = RayCasterBuilder.getRotationMatrixX(
      Math.PI / 4
    );
    let rotationXMatrixB: Matrix = RayCasterBuilder.getRotationMatrixX(
      Math.PI / 2
    );
    let pointARotated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationXMatrixA,
      point
    );
    let pointBRoatated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationXMatrixB,
      point
    );

    let pointA: Point = RayCasterBuilder.createPoint(
      0,
      Math.SQRT2 / 2,
      Math.SQRT2 / 2
    );
    let pointB: Point = RayCasterBuilder.createPoint(0, 0, 1);

    expect(pointARotated.equals(pointA)).toBeTruthy();
    expect(pointBRoatated.equals(pointB)).toBeTruthy();
  });

  it('rotation around the x axis', () => {
    let point: Point = RayCasterBuilder.createPoint(0, 1, 0);
    let rotationXMatrixA: Matrix = RayCasterBuilder.getRotationMatrixX(
      Math.PI / 4
    );
    rotationXMatrixA = RayCasterArithmetic.inverse(rotationXMatrixA);

    let pointARotated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationXMatrixA,
      point
    );

    let pointA: Point = RayCasterBuilder.createPoint(
      0,
      Math.SQRT2 / 2,
      -Math.SQRT2 / 2
    );

    expect(pointARotated.equals(pointA)).toBeTruthy();
  });

  it('rotation around the y axis', () => {
    let point: Point = RayCasterBuilder.createPoint(0, 0, 1);
    let rotationYMatrixA: Matrix = RayCasterBuilder.getRotationMatrixY(
      Math.PI / 4
    );
    let rotationYMatrixB: Matrix = RayCasterBuilder.getRotationMatrixY(
      Math.PI / 2
    );
    let pointARotated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationYMatrixA,
      point
    );
    let pointBRoatated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationYMatrixB,
      point
    );

    let pointA: Point = RayCasterBuilder.createPoint(
      Math.SQRT2 / 2,
      0,
      Math.SQRT2 / 2
    );
    let pointB: Point = RayCasterBuilder.createPoint(1, 0, 0);

    expect(pointARotated.equals(pointA)).toBeTruthy();
    expect(pointBRoatated.equals(pointB)).toBeTruthy();
  });

  it('rotation around the y axis', () => {
    let point: Point = RayCasterBuilder.createPoint(0, 1, 0);
    let rotationZMatrixA: Matrix = RayCasterBuilder.getRotationMatrixZ(
      Math.PI / 4
    );
    let rotationZMatrixB: Matrix = RayCasterBuilder.getRotationMatrixZ(
      Math.PI / 2
    );
    let pointARotated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationZMatrixA,
      point
    );
    let pointBRoatated: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      rotationZMatrixB,
      point
    );

    let pointA: Point = RayCasterBuilder.createPoint(
      -Math.SQRT2 / 2,
      Math.SQRT2 / 2,
      0
    );
    let pointB: Point = RayCasterBuilder.createPoint(-1, 0, 0);

    expect(pointARotated.equals(pointA)).toBeTruthy();
    expect(pointBRoatated.equals(pointB)).toBeTruthy();
  });

  it('A shearing transformation moves x in proportin to y', () => {
    let shearingMatrix: Matrix = RayCasterBuilder.getShearingMatrix(
      1,
      0,
      0,
      0,
      0,
      0
    );
    let pointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    let pointB: Point = RayCasterBuilder.createPoint(5, 3, 4);
    expect(
      pointB.equals(
        RayCasterArithmetic.multiplyMatrixWithPoint(shearingMatrix, pointA)
      )
    ).toBeTruthy();
  });

  it('A shearing transformation moves x in proportin to z', () => {
    let shearingMatrix: Matrix = RayCasterBuilder.getShearingMatrix(
      0,
      1,
      0,
      0,
      0,
      0
    );
    let pointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    let pointB: Point = RayCasterBuilder.createPoint(6, 3, 4);
    expect(
      pointB.equals(
        RayCasterArithmetic.multiplyMatrixWithPoint(shearingMatrix, pointA)
      )
    ).toBeTruthy();
  });

  it('A shearing transformation moves y in proportin to x', () => {
    let shearingMatrix: Matrix = RayCasterBuilder.getShearingMatrix(
      0,
      0,
      1,
      0,
      0,
      0
    );
    let pointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    let pointB: Point = RayCasterBuilder.createPoint(2, 5, 4);
    expect(
      pointB.equals(
        RayCasterArithmetic.multiplyMatrixWithPoint(shearingMatrix, pointA)
      )
    ).toBeTruthy();
  });

  it('A shearing transformation moves y in proportin to z', () => {
    let shearingMatrix: Matrix = RayCasterBuilder.getShearingMatrix(
      0,
      0,
      0,
      1,
      0,
      0
    );
    let pointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    let pointB: Point = RayCasterBuilder.createPoint(2, 7, 4);
    expect(
      pointB.equals(
        RayCasterArithmetic.multiplyMatrixWithPoint(shearingMatrix, pointA)
      )
    ).toBeTruthy();
  });

  it('A shearing transformation moves z in proportin to x', () => {
    let shearingMatrix: Matrix = RayCasterBuilder.getShearingMatrix(
      0,
      0,
      0,
      0,
      1,
      0
    );
    let pointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    let pointB: Point = RayCasterBuilder.createPoint(2, 3, 6);
    expect(
      pointB.equals(
        RayCasterArithmetic.multiplyMatrixWithPoint(shearingMatrix, pointA)
      )
    ).toBeTruthy();
  });

  it('A shearing transformation moves z in proportin to x', () => {
    let shearingMatrix: Matrix = RayCasterBuilder.getShearingMatrix(
      0,
      0,
      0,
      0,
      0,
      1
    );
    let pointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    let pointB: Point = RayCasterBuilder.createPoint(2, 3, 7);
    expect(
      pointB.equals(
        RayCasterArithmetic.multiplyMatrixWithPoint(shearingMatrix, pointA)
      )
    ).toBeTruthy();
  });

  it('Individual transformations are applied in sequence', () => {
    let rotationMatrix: Matrix = RayCasterBuilder.getRotationMatrixX(
      Math.PI / 2
    );
    let scalingMatrix: Matrix = RayCasterBuilder.getScalingMatrix(5, 5, 5);
    let translationMatrix: Matrix = RayCasterBuilder.getTranslationMatrix(
      10,
      5,
      7
    );
    // rotation first
    let point: Point = RayCasterBuilder.createPoint(1, 0, 1);
    point = RayCasterArithmetic.multiplyMatrixWithPoint(rotationMatrix, point);
    expect(RayCasterBuilder.createPoint(1, -1, 0).equals(point)).toBeTruthy();
    // scaling second
    point = RayCasterArithmetic.multiplyMatrixWithPoint(scalingMatrix, point);
    expect(RayCasterBuilder.createPoint(5, -5, 0).equals(point)).toBeTruthy();
    // finally translation
    point = RayCasterArithmetic.multiplyMatrixWithPoint(
      translationMatrix,
      point
    );
    expect(RayCasterBuilder.createPoint(15, 0, 7).equals(point)).toBeTruthy();
  });

  it('Chained transformations must be applied in reverse order', () => {
    let rotationMatrix: Matrix = RayCasterBuilder.getRotationMatrixX(
      Math.PI / 2
    );
    let scalingMatrix: Matrix = RayCasterBuilder.getScalingMatrix(5, 5, 5);
    let translationMatrix: Matrix = RayCasterBuilder.getTranslationMatrix(
      10,
      5,
      7
    );
    let transformation: Matrix = RayCasterArithmetic.multiplyMatrix(
      translationMatrix,
      RayCasterArithmetic.multiplyMatrix(scalingMatrix, rotationMatrix)
    );
    let point: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
      transformation,
      RayCasterBuilder.createPoint(1, 0, 1)
    );
    expect(RayCasterBuilder.createPoint(15, 0, 7).equals(point)).toBeTruthy();
  });

  it('Computing a point from time and ray', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(2, 3, 4),
      new Vector(1, 0, 0)
    );
    const referencePointA: Point = RayCasterBuilder.createPoint(2, 3, 4);
    const referencePointB: Point = RayCasterBuilder.createPoint(3, 3, 4);
    const referencePointC: Point = RayCasterBuilder.createPoint(1, 3, 4);
    const referencePointD: Point = RayCasterBuilder.createPoint(4.5, 3, 4);

    const posA = RayCasterArithmetic.getRayPosition(ray, 0);
    const posB = RayCasterArithmetic.getRayPosition(ray, 1);
    const posC = RayCasterArithmetic.getRayPosition(ray, -1);
    const posD = RayCasterArithmetic.getRayPosition(ray, 2.5);

    expect(posA.equals(referencePointA)).toBeTruthy();
    expect(posB.equals(referencePointB)).toBeTruthy();
    expect(posC.equals(referencePointC)).toBeTruthy();
    expect(posD.equals(referencePointD)).toBeTruthy();
  });

  it('A ray intersects a sphere at two points', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 2).toBeTruthy();
    expect(intersections.getIntersectionAt(0).getT() === 4.0).toBeTruthy();
    expect(intersections.getIntersectionAt(1).getT() === 6.0).toBeTruthy();
  });

  it('A ray tangents a sphere', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 1, -5),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 2).toBeTruthy();
    expect(intersections.getIntersectionAt(0).getT() === 5.0).toBeTruthy();
    expect(intersections.getIntersectionAt(1).getT() === 5.0).toBeTruthy();
  });

  it('A ray misses a sphere', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 2, -5),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 0).toBeTruthy();
  });

  it('A ray originates at the center of a sphere', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, 0),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 2).toBeTruthy();
    expect(intersections.getIntersectionAt(0).getT() === -1.0).toBeTruthy();
    expect(intersections.getIntersectionAt(1).getT() === 1.0).toBeTruthy();
  });

  it('A sphere is behind a ray', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, 5),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 2).toBeTruthy();
    expect(intersections.getIntersectionAt(0).getT() === -6.0).toBeTruthy();
    expect(intersections.getIntersectionAt(1).getT() === -4.0).toBeTruthy();
  });

  it('The hit, when all intersections have positive t', () => {
    let sphere: Sphere = RayCasterBuilder.createSphere();
    let i1: Intersection = RayCasterBuilder.createIntersection(1, sphere);
    let i2: Intersection = RayCasterBuilder.createIntersection(2, sphere);
    let intersections: Intersections = new Intersections(i1, i2);
    const intersectionResult: Intersection | null =
      RayCasterArithmetic.getHit(intersections);
    if(intersectionResult !== null) {
    expect(intersectionResult.equals(i1)).toBeTruthy();
    }
    else {
      expect(false).toBeTruthy();
    }
  });

  it('The hit, when some intersections have negative t', () => {
    let sphere: Sphere = RayCasterBuilder.createSphere();
    let i1: Intersection = RayCasterBuilder.createIntersection(-1, sphere);
    let i2: Intersection = RayCasterBuilder.createIntersection(2, sphere);
    let intersections: Intersections = new Intersections(i1, i2);
    const intersectionResult: Intersection | null =
      RayCasterArithmetic.getHit(intersections);
    if(intersectionResult !== null) {
      expect(intersectionResult.equals(i2)).toBeTruthy();
    }
    else {
      expect(false).toBeTruthy();
    }
  });

  it('The hit, when all intersections have negative t', () => {
    let sphere: Sphere = RayCasterBuilder.createSphere();
    let i1: Intersection = RayCasterBuilder.createIntersection(-1, sphere);
    let i2: Intersection = RayCasterBuilder.createIntersection(-2, sphere);
    let intersections: Intersections = new Intersections(i1, i2);
    const intersectionResult: Intersection | null =
    RayCasterArithmetic.getHit(intersections);
    expect(intersectionResult === null).toBeTruthy();
  });

  it('The hit is always the lowes nonegative intersection', () => {
    let sphere: Sphere = RayCasterBuilder.createSphere();
    let i1: Intersection = RayCasterBuilder.createIntersection(5, sphere);
    let i2: Intersection = RayCasterBuilder.createIntersection(7, sphere);
    let i3: Intersection = RayCasterBuilder.createIntersection(-3, sphere);
    let i4: Intersection = RayCasterBuilder.createIntersection(2, sphere);
    let intersections: Intersections = new Intersections(i1, i2, i3, i4);
    const intersectionResult: Intersection | null =
      RayCasterArithmetic.getHit(intersections);
    if(intersectionResult !== null) {
      expect(intersectionResult.equals(i4)).toBeTruthy();
    }
    else {
      expect(false).toBeTruthy();
    }
  });

  it('Translating a ray', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(1, 2, 3),
      new Vector(0, 1, 0)
    );
    const translationMatrix = RayCasterBuilder.getTranslationMatrix(3, 4, 5);
    const rayResult: Ray = RayCasterArithmetic.transform(
      ray,
      translationMatrix
    );
    expect(rayResult.getOrigin().equals(new Point(4, 6, 8))).toBeTruthy();
    expect(rayResult.getDirection().equals(new Vector(0, 1, 0))).toBeTruthy();
  });

  it('Scaling a ray', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(1, 2, 3),
      new Vector(0, 1, 0)
    );
    const scalingMatrix = RayCasterBuilder.getScalingMatrix(2, 3, 4);
    const rayResult: Ray = RayCasterArithmetic.transform(ray, scalingMatrix);
    expect(rayResult.getOrigin().equals(new Point(2, 6, 12))).toBeTruthy();
    expect(rayResult.getDirection().equals(new Vector(0, 3, 0))).toBeTruthy();
  });

  it('A spheres default transformation', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    expect(
      sphere.getMatrix().equals(RayCasterBuilder.createIdentityMatrix(4))
    ).toBeTruthy();
  });

  it('Changing a spheres transformations', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    sphere.setMatrix(RayCasterBuilder.getTranslationMatrix(2, 3, 4));
    const m: Matrix = RayCasterBuilder.getTranslationMatrix(2, 3, 4);
    expect(sphere.getMatrix().equals(m)).toBeTruthy();
  });

  it('Intersecting a scaled sphere with a ray', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    sphere.setMatrix(RayCasterBuilder.getScalingMatrix(2, 2, 2));
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 2).toBeTruthy();
    expect(intersections.getIntersectionAt(0).getT() === 3).toBeTruthy();
    expect(intersections.getIntersectionAt(1).getT() === 7).toBeTruthy();
  });

  it('Intersecting a translated sphere with a ray', () => {
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    const sphere: Sphere = RayCasterBuilder.createSphere();
    sphere.setMatrix(RayCasterBuilder.getTranslationMatrix(5, 0, 0));
    const intersections: Intersections = sphere.intersect(ray);
    expect(intersections.getCount() === 0).toBeTruthy();
  });

  it('The normal on a sphere at a point on the x axis', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const point: Point = RayCasterBuilder.createPoint(1, 0, 0);
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    const expectedVector: Vector = RayCasterBuilder.createVector(1, 0, 0);
    expect(normalVector.equals(expectedVector)).toBeTruthy();
  });

  it('The normal on a sphere at a point on the y axis', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const point: Point = RayCasterBuilder.createPoint(0, 1, 0);
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    const expectedVector: Vector = RayCasterBuilder.createVector(0, 1, 0);
    expect(normalVector.equals(expectedVector)).toBeTruthy();
  });

  it('The normal on a sphere at a point on the z axis', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const point: Point = RayCasterBuilder.createPoint(0, 0, 1);
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    const expectedVector: Vector = RayCasterBuilder.createVector(0, 0, 1);
    expect(normalVector.equals(expectedVector)).toBeTruthy();
  });

  it('The normal on a sphere at a point on the x axis', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const point: Point = RayCasterBuilder.createPoint(
      Math.sqrt(3) / 3,
      Math.sqrt(3) / 3,
      Math.sqrt(3) / 3
    );
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    const expectedVector: Vector = RayCasterBuilder.createVector(
      Math.sqrt(3) / 3,
      Math.sqrt(3) / 3,
      Math.sqrt(3) / 3
    );
    expect(normalVector.equals(expectedVector)).toBeTruthy();
  });

  it('The normal is a normalized vector', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const point: Point = RayCasterBuilder.createPoint(
      Math.sqrt(3) / 3,
      Math.sqrt(3) / 3,
      Math.sqrt(3) / 3
    );
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    expect(
      normalVector.equals(RayCasterArithmetic.normalize(normalVector))
    ).toBeTruthy();
  });

  it('Computing the normal on a translated sphere', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    sphere.setMatrix(RayCasterBuilder.getTranslationMatrix(0, 1, 0));
    const point: Point = RayCasterBuilder.createPoint(0, 1.70711, -0.70711);
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    const expectedVector: Vector = RayCasterBuilder.createVector(
      0,
      0.70711,
      -0.70711
    );
    expect(normalVector.equals(expectedVector)).toBeTruthy();
  });

  it('Computing the normal on a transformed sphere', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const transformationMatrix = RayCasterArithmetic.multiplyMatrix(
      RayCasterBuilder.getScalingMatrix(1, 0.5, 1),
      RayCasterBuilder.getRotationMatrixZ(Math.PI / 5)
    );
    sphere.setMatrix(transformationMatrix);
    const point: Point = RayCasterBuilder.createPoint(
      0,
      Math.sqrt(2) / 2,
      -Math.sqrt(2) / 2
    );
    const normalVector: Vector = RayCasterArithmetic.normalAt(sphere, point);
    const expectedVector: Vector = RayCasterBuilder.createVector(
      0,
      0.97014,
      -0.24254
    );
    expect(normalVector.equals(expectedVector)).toBeTruthy();
  });

  it('Reflecting a vector approaching at 45deg', () => {
    const vectorA = RayCasterBuilder.createVector(1, -1, 0);
    const normalV = RayCasterBuilder.createVector(0, 1, 0);

    const expectedResult: Vector = RayCasterBuilder.createVector(1, 1, 0);
    const reflectedVector: Vector = RayCasterArithmetic.reflect(
      vectorA,
      normalV
    );

    expect(reflectedVector.equals(expectedResult)).toBeTruthy();
  });

  it('Reflecting a vector of a slanted surface', () => {
    const vectorA = RayCasterBuilder.createVector(0, -1, 0);
    const normalV = RayCasterBuilder.createVector(
      Math.sqrt(2) / 2,
      Math.sqrt(2) / 2,
      0
    );

    const expectedResult: Vector = RayCasterBuilder.createVector(1, 0, 0);
    const reflectedVector: Vector = RayCasterArithmetic.reflect(
      vectorA,
      normalV
    );

    expect(reflectedVector.equals(expectedResult)).toBeTruthy();
  });

  it('A point light has a position and intensity', () => {
    const intensity: Color = RayCasterBuilder.createColor(1, 1, 1);
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    const light: Light = RayCasterBuilder.createPointLight(position, intensity);
    expect(light.getPosition().equals(position)).toBeTruthy();
    expect(light.getIntensity().equals(intensity)).toBeTruthy();
  });

  it('The default material', () => {
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    material.setColor(RayCasterBuilder.createColor(1, 1, 1));

    expect(material.getAmbient() === 0.1).toBeTruthy();
    expect(material.getDiffuse() === 0.9).toBeTruthy();
    expect(material.getSpecular() === 0.9).toBeTruthy();
    expect(material.getShininess() === 200.0).toBeTruthy();
  });

  it('A sphere has a default material', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    expect(sphere.getMaterial().equals(material)).toBeTruthy();
  });

  it('A sphere may be assigned a material', () => {
    const sphere: Sphere = RayCasterBuilder.createSphere();
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    material.setAmbient(1);
    sphere.setMaterial(material);
    expect(sphere.getMaterial().equals(material)).toBeTruthy();
  });

  it('Lighting with the eye between the light and the surface', () => {
    // default setup given
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    // GIVEN
    const eyev: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const normalv: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const light: Light = RayCasterBuilder.createPointLight(
      new Point(0, 0, -10),
      new Color(1, 1, 1)
    );

    // WHEN
    const lightingColor: Color = RayCasterArithmetic.lighting(
      material,
      light,
      position,
      eyev,
      normalv
    );

    // THEN
    const expectedColor: Color = RayCasterBuilder.createColor(1.9, 1.9, 1.9);
    expect(lightingColor.equals(expectedColor)).toBeTruthy();
  });

  it('Lighting with the surface in shadow', () => {
    // default setup given
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    // GIVEN
    const eyev: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const normalv: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const light: Light = RayCasterBuilder.createPointLight(
      new Point(0, 0, -10),
      new Color(1, 1, 1)
    );
    const inShadow = true;

    // WHEN
    const lightingColor: Color = RayCasterArithmetic.lighting(
      material,
      light,
      position,
      eyev,
      normalv,
      inShadow
    );

    // THEN
    const expectedColor: Color = RayCasterBuilder.createColor(0.1, 0.1, 0.1);
    expect(lightingColor.equals(expectedColor)).toBeTruthy();
  });

  it('Lighting with the eye between light and surface, eye offset 45deg', () => {
    // default setup given
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    // GIVEN
    const eyev: Vector = RayCasterBuilder.createVector(
      0,
      Math.sqrt(2) / 2,
      -Math.sqrt(2) / 2
    );
    const normalv: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const light: Light = RayCasterBuilder.createPointLight(
      new Point(0, 0, -10),
      new Color(1, 1, 1)
    );

    // WHEN
    const lightingColor: Color = RayCasterArithmetic.lighting(
      material,
      light,
      position,
      eyev,
      normalv
    );

    // THEN
    const expectedColor: Color = RayCasterBuilder.createColor(1.0, 1.0, 1.0);
    expect(lightingColor.equals(expectedColor)).toBeTruthy();
  });

  it('Lighting with the eye opposite surface, light offset 45deg', () => {
    // default setup given
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    // GIVEN
    const eyev: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const normalv: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const light: Light = RayCasterBuilder.createPointLight(
      new Point(0, 10, -10),
      new Color(1, 1, 1)
    );

    // WHEN
    const lightingColor: Color = RayCasterArithmetic.lighting(
      material,
      light,
      position,
      eyev,
      normalv
    );

    // THEN
    const expectedColor: Color = RayCasterBuilder.createColor(
      0.7364,
      0.7364,
      0.7364
    );
    expect(lightingColor.equals(expectedColor)).toBeTruthy();
  });

  it('Lighting with the eye in path of the refelction vector', () => {
    // default setup given
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    // GIVEN
    const eyev: Vector = RayCasterBuilder.createVector(
      0,
      -Math.sqrt(2) / 2,
      -Math.sqrt(2) / 2
    );
    const normalv: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const light: Light = RayCasterBuilder.createPointLight(
      new Point(0, 10, -10),
      new Color(1, 1, 1)
    );

    // WHEN
    const lightingColor: Color = RayCasterArithmetic.lighting(
      material,
      light,
      position,
      eyev,
      normalv
    );

    // THEN
    const expectedColor: Color = RayCasterBuilder.createColor(
      1.6364,
      1.6364,
      1.6364
    );
    expect(lightingColor.equals(expectedColor)).toBeTruthy();
  });

  it('Lighting with the light behind the surface', () => {
    // default setup given
    const material: Material = RayCasterBuilder.createDefaultMaterial();
    const position: Point = RayCasterBuilder.createPoint(0, 0, 0);

    // GIVEN
    const eyev: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const normalv: Vector = RayCasterBuilder.createVector(0, 0, -1);
    const light: Light = RayCasterBuilder.createPointLight(
      new Point(0, 0, 10),
      new Color(1, 1, 1)
    );

    // WHEN
    const lightingColor: Color = RayCasterArithmetic.lighting(
      material,
      light,
      position,
      eyev,
      normalv
    );

    // THEN
    const expectedColor: Color = RayCasterBuilder.createColor(0.1, 0.1, 0.1);
    expect(lightingColor.equals(expectedColor)).toBeTruthy();
  });

  it('Creating a default world pass an ray through it', () => {
    let world: World = RayCasterBuilder.createDefaultWorld();
    let ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    let intersections: Intersections = world.intersect(ray);
    expect(intersections.getCount() === 4).toBeTruthy();
    expect(intersections.getIntersectionAt(0).getT() === 4).toBeTruthy();
    expect(intersections.getIntersectionAt(1).getT() === 4.5).toBeTruthy();
    expect(intersections.getIntersectionAt(2).getT() === 5.5).toBeTruthy();
    expect(intersections.getIntersectionAt(3).getT() === 6).toBeTruthy();
  });

  it('Precomputing the state of an intersection', () => {
    // GIVEN
    let ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    let sphere = RayCasterBuilder.createSphere();
    let intersection = RayCasterBuilder.createIntersection(4, sphere);
    // WHEN
    let preparedComputations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );
    // THEN
    expect(preparedComputations.getT() === intersection.getT()).toBeTruthy();
    expect(
      preparedComputations.getObject().equals(intersection.getShape())
    ).toBeTruthy();
    expect(
      preparedComputations.getPoint().equals(new Point(0, 0, -1))
    ).toBeTruthy();
    expect(
      preparedComputations.getEyeV().equals(new Vector(0, 0, -1))
    ).toBeTruthy();
    expect(
      preparedComputations.getNormalV().equals(new Vector(0, 0, -1))
    ).toBeTruthy();
  });

  it('The hit, when an intersection occurs on the outside', () => {
    // GIVEN
    let ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    let sphere = RayCasterBuilder.createSphere();
    let intersection = RayCasterBuilder.createIntersection(4, sphere);
    // WHEN
    let preparedComputations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );
    // THEN
    expect(preparedComputations.isInside() === false).toBeTruthy();
  });

  it('The hit, when an intersection occurs on the inside', () => {
    // GIVEN
    let ray = RayCasterBuilder.createRay(
      new Point(0, 0, 0),
      new Vector(0, 0, 1)
    );
    let sphere = RayCasterBuilder.createSphere();
    let intersection = RayCasterBuilder.createIntersection(1, sphere);
    // WHEN
    let preparedComputations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );
    // THEN
    expect(preparedComputations.isInside() === true).toBeTruthy();
    expect(
      preparedComputations.getPoint().equals(new Point(0, 0, 1))
    ).toBeTruthy();
    expect(
      preparedComputations.getEyeV().equals(new Vector(0, 0, -1))
    ).toBeTruthy();
    expect(
      preparedComputations.getNormalV().equals(new Vector(0, 0, -1))
    ).toBeTruthy();
  });

  it('Shading an intersection', () => {
    // GIVEN
    const world = RayCasterBuilder.createDefaultWorld();
    const ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    const shape = world.getShapeAt(0);
    const intersection = RayCasterBuilder.createIntersection(4, shape);

    // WHEN
    const computations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );
    const color: Color = RayCasterArithmetic.shadeHit(world, computations);

    // THEN
    expect(
      color.equals(
        new Color(0.3801273947345622, 0.4751592434182027, 0.2850955460509216)
      )
    ).toBeTruthy();
  });

  it('Shading an intersection from the inside', () => {
    // GIVEN
    const world: World = RayCasterBuilder.createDefaultWorld();
    world.setLightSource(
      RayCasterBuilder.createPointLight(
        new Point(0, 0.25, 0),
        new Color(1, 1, 1)
      )
    );
    const ray = RayCasterBuilder.createRay(
      new Point(0, 0, 0),
      new Vector(0, 0, 1)
    );
    const shape = world.getShapeAt(1);
    const intersection = RayCasterBuilder.createIntersection(0.5, shape);

    // WHEN
    const computations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );
    const color: Color = RayCasterArithmetic.shadeHit(world, computations);

    // THEN
    expect(
      color.equals(
        new Color(0.4927858428956452, 0.4927858428956452, 0.4927858428956452)
      )
    ).toBeTruthy();
  });

  it('The color when a ray misses', () => {
    // GIVEN
    const world: World = RayCasterBuilder.createDefaultWorld();
    const ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 1, 0)
    );
    // WHEN
    const color: Color = RayCasterArithmetic.colorAt(world, ray);

    // THEN
    expect(color.equals(new Color(0, 0, 0))).toBeTruthy();
  });

  it('The color when a ray hits', () => {
    // GIVEN
    const world: World = RayCasterBuilder.createDefaultWorld();
    const ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );
    // WHEN
    const color: Color = RayCasterArithmetic.colorAt(world, ray);

    // THEN
    expect(
      color.equals(
        new Color(0.3801273947345622, 0.4751592434182027, 0.2850955460509216)
      )
    ).toBeTruthy();
  });

  it('The color with an intersection behind the ray', () => {
    // GIVEN
    const world: World = RayCasterBuilder.createDefaultWorld();
    const outerObject = world.getShapeAt(0);
    const outerMaterial = outerObject.getMaterial();
    outerMaterial.setAmbient(1);
    outerObject.setMaterial(outerMaterial);

    const innerObject = world.getShapeAt(1);
    const innerMaterial = innerObject.getMaterial();
    innerMaterial.setAmbient(1);
    innerObject.setMaterial(innerMaterial);

    const ray = RayCasterBuilder.createRay(
      new Point(0, 0, 0.75),
      new Vector(0, 0, -1)
    );

    // WHEN
    const color: Color = RayCasterArithmetic.colorAt(world, ray);

    // THEN
    expect(color.equals(innerObject.getMaterial().getColor())).toBeTruthy();
  });

  it('The transfomation matrix for the default orientation', () => {
    // GIVEN
    const from: Point = RayCasterBuilder.createPoint(0, 0, 0);
    const to: Point = RayCasterBuilder.createPoint(0, 0, -1);
    const up: Vector = RayCasterBuilder.createVector(0, 1, 0);

    // WHEN
    const t: Matrix = RayCasterArithmetic.viewTransform(from, to, up);

    // THEN
    expect(t.equals(RayCasterBuilder.createIdentityMatrix(4))).toBeTruthy();
  });

  it('A view transformation matrix looking in positive z direction', () => {
    // GIVEN
    const from: Point = RayCasterBuilder.createPoint(0, 0, 0);
    const to: Point = RayCasterBuilder.createPoint(0, 0, 1);
    const up: Vector = RayCasterBuilder.createVector(0, 1, 0);

    // WHEN
    const t: Matrix = RayCasterArithmetic.viewTransform(from, to, up);

    // THEN
    expect(t.equals(RayCasterBuilder.getScalingMatrix(-1, 1, -1)));
  });

  it('The view transformation moves the world', () => {
    // GIVEN
    const from: Point = RayCasterBuilder.createPoint(0, 0, 8);
    const to: Point = RayCasterBuilder.createPoint(0, 0, 0);
    const up: Vector = RayCasterBuilder.createVector(0, 1, 0);

    // WHEN
    const t: Matrix = RayCasterArithmetic.viewTransform(from, to, up);

    // THEN
    expect(t.equals(RayCasterBuilder.getTranslationMatrix(0, 0, -8)));
  });

  it('An arbitrary view transformation', () => {
    // GIVEN
    const from: Point = RayCasterBuilder.createPoint(1, 3, 2);
    const to: Point = RayCasterBuilder.createPoint(4, -2, 8);
    const up: Vector = RayCasterBuilder.createVector(1, 1, 0);

    // WHEN
    const t: Matrix = RayCasterArithmetic.viewTransform(from, to, up);

    const matrixNumbers: number[] = [
      -0.50709, 0.50709, 0.67612, -2.36643, 0.76772, 0.60609, 0.12122, -2.82843,
      -0.35857, 0.5971, -0.71714, 0.0, 0.0, 0.0, 0.0, 1.0,
    ];
    const s: Matrix = RayCasterBuilder.createMatrix(matrixNumbers, 4, 4);

    // THEN
    expect(t.equals(RayCasterBuilder.getTranslationMatrix(0, 0, -8)));
  });

  it('The pixel size for a horizontal canvas', () => {
    // GIVEN
    const camera: Camera = RayCasterBuilder.createCamera(200, 125, Math.PI / 2);

    // THEN

    expect(
      RayCasterArithmetic.numberEquals(camera.getPixelSize(), 0.01)
    ).toBeTruthy();
  });

  it('The pixel size for a vertical canvas', () => {
    // GIVEN
    const camera: Camera = RayCasterBuilder.createCamera(125, 200, Math.PI / 2);

    // THEN
    expect(
      RayCasterArithmetic.numberEquals(camera.getPixelSize(), 0.01)
    ).toBeTruthy();
  });

  it('Constructing a ray through the center of the canvas', () => {
    // GIVEN
    const c: Camera = RayCasterBuilder.createCamera(201, 101, Math.PI / 2);

    // WHEN
    const r: Ray = RayCasterArithmetic.rayForPixel(c, 100, 50);

    // THEN
    expect(r.getOrigin().equals(new Point(0, 0, 0))).toBeTruthy();
    expect(r.getDirection().equals(new Vector(0, 0, -1))).toBeTruthy();
  });

  it('Constructing a ray through the corner of the canvas', () => {
    // GIVEN
    const c: Camera = RayCasterBuilder.createCamera(201, 101, Math.PI / 2);

    // WHEN
    const r: Ray = RayCasterArithmetic.rayForPixel(c, 0, 0);

    // THEN
    expect(r.getOrigin().equals(new Point(0, 0, 0))).toBeTruthy();
    expect(
      r.getDirection().equals(new Vector(0.66519, 0.33259, -0.66851))
    ).toBeTruthy();
  });

  it('Constructing a ray when the camera is transformed', () => {
    // GIVEN
    const c: Camera = RayCasterBuilder.createCamera(201, 101, Math.PI / 2);
    c.setTranform(
      RayCasterArithmetic.multiplyMatrix(
        RayCasterBuilder.getRotationMatrixY(Math.PI / 4),
        RayCasterBuilder.getTranslationMatrix(0, -2, 5)
      )
    );

    // WHEN
    const r: Ray = RayCasterArithmetic.rayForPixel(c, 100, 50);

    // THEN
    expect(r.getOrigin().equals(new Point(0, 2, -5))).toBeTruthy();
    expect(
      r
        .getDirection()
        .equals(new Vector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2))
    ).toBeTruthy();
  });

  it('There is now shadow when nothing is collinear with point and light', () => {
    // GIVEN
    const world = RayCasterBuilder.createDefaultWorld();
    const point = RayCasterBuilder.createPoint(0, 10, 0);
    // WHEN
    const isShadowed = RayCasterArithmetic.isShadowed(world, point);
    // THEN
    expect(isShadowed).toBeFalsy();
  });

  it('The shadow when an object is between the point and the light', () => {
    // GIVEN
    const world = RayCasterBuilder.createDefaultWorld();
    const point = RayCasterBuilder.createPoint(10, -10, 10);
    // WHEN
    const isShadowed = RayCasterArithmetic.isShadowed(world, point);
    // THEN
    expect(isShadowed).toBeTruthy();
  });

  it('There is no shadow when an object is behind the light', () => {
    // GIVEN
    const world = RayCasterBuilder.createDefaultWorld();
    const point = RayCasterBuilder.createPoint(-20, 20, -20);
    // WHEN
    const isShadowed = RayCasterArithmetic.isShadowed(world, point);
    // THEN
    expect(isShadowed).toBeFalsy();
  });

  it('There is no shadow when an object is behind the point', () => {
    // GIVEN
    const world = RayCasterBuilder.createDefaultWorld();
    const point = RayCasterBuilder.createPoint(-2, 2, -2);
    // WHEN
    const isShadowed = RayCasterArithmetic.isShadowed(world, point);
    // THEN
    expect(isShadowed).toBeFalsy();
  });

  it('shade_hit() is given an intersection in shadow', () => {
    // GIVEN
    const world = RayCasterBuilder.createWorld();

    // WHEN
    world.setLightSource(
      RayCasterBuilder.createPointLight(
        new Point(0, 0, -10),
        new Color(1, 1, 1)
      )
    );

    const sphereA: Sphere = RayCasterBuilder.createSphere();
    const sphereB: Sphere = RayCasterBuilder.createSphere();
    sphereB.setMatrix(RayCasterBuilder.getTranslationMatrix(0, 0, 10));
    world.setShapes([sphereA, sphereB]);

    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, 5),
      new Vector(0, 0, 1)
    );
    const intersection: Intersection = RayCasterBuilder.createIntersection(
      4,
      sphereB
    );

    const computations: Computations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );
    const color: Color = RayCasterArithmetic.shadeHit(world, computations);

    // THEN
    expect(color.equals(new Color(0.1, 0.1, 0.1))).toBeTruthy();
  });

  it('the hit should offset the point', () => {
    // GIVEN
    const ray: Ray = RayCasterBuilder.createRay(
      new Point(0, 0, -5),
      new Vector(0, 0, 1)
    );

    const shape: Sphere = RayCasterBuilder.createSphere();
    shape.setMatrix(RayCasterBuilder.getTranslationMatrix(0, 0, 1));

    const intersection: Intersection = RayCasterBuilder.createIntersection(
      4,
      shape
    );

    const computations: Computations = RayCasterArithmetic.prepareComputations(
      intersection,
      ray
    );

    // THEN
    expect(computations.getOverPoint().z < -RAYCASTER_EPSILON / 2).toBeTruthy();
    expect(
      computations.getPoint().z > computations.getOverPoint().z
    ).toBeTruthy();
  });
});
