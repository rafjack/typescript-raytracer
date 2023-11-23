import {Color, Matrix, Point, Shape} from "../model/raycaster.model";
import {RayCasterArithmetic} from "../math/raycaster.math";
import {RayCasterBuilder} from "../builder/raycaster.builder";

export abstract class Pattern {

    matrix: Matrix = RayCasterBuilder.createIdentityMatrix(4);

    constructor() {
    }

    abstract colorAt(point: Point): Color;

    abstract colorAtShape(shape: Shape, point: Point): Color;

    setTransform(matrix: Matrix) {
        this.matrix = matrix;
    }
}

export class StripePattern extends Pattern {

    constructor(public a: Color,
                public b: Color) {
        super();
    }

    colorAt(point: Point): Color {
        if (Math.floor(point.x) % 2 === 0) {
            return this.a;
        }
        return this.b;
    }

    colorAtShape(shape: Shape, worldPoint: Point): Color {
        const objectPoint = RayCasterArithmetic.multiplyMatrixWithPoint(RayCasterArithmetic.inverse(shape.getTransform()), worldPoint);
        const patternPoint = RayCasterArithmetic.multiplyMatrixWithPoint(RayCasterArithmetic.inverse(this.matrix), objectPoint);
        return this.colorAt(patternPoint);
    }

}