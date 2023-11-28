import {Color, Matrix, Point, Shape} from "../model/raycaster.model";
import {RayCasterArithmetic} from "../math/raycaster.math";
import {RayCasterBuilder} from "../builder/raycaster.builder";

export abstract class Pattern {

    matrix: Matrix = RayCasterBuilder.createIdentityMatrix(4);

    protected constructor() {
    }

    abstract colorAt(point: Point): Color;

    setTransform(matrix: Matrix) {
        this.matrix = matrix;
    }

    colorAtShape(shape: Shape, worldPoint: Point): Color {
        // what  could be the problem when the gradient is not covering the whole shape

        const objectPoint = RayCasterArithmetic.multiplyMatrixWithPoint(RayCasterArithmetic.inverse(shape.getTransform()), worldPoint);
        const patternPoint = RayCasterArithmetic.multiplyMatrixWithPoint(RayCasterArithmetic.inverse(this.matrix), objectPoint);
        return this.colorAt(patternPoint);
    }
}

export class TestPattern extends Pattern {

    constructor() {
        super();
    }

    colorAt(point: Point): Color {
        return new Color(point.x, point.y, point.z);
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
}

export class GradientPattern extends Pattern {

    constructor(public a: Color,
                public b: Color) {
        super();
    }

    colorAt(point: Point): Color {
        const distance: Color = RayCasterArithmetic.substractColors(this.b, this.a);
        const fraction: number = point.x - Math.floor(point.x);
        return RayCasterArithmetic.addColors(this.a, RayCasterArithmetic.multiplyColor(distance, fraction));
    }

    colorAtShape(shape: Shape, worldPoint: Point): Color {
        const objectPoint = RayCasterArithmetic.multiplyMatrixWithPoint(RayCasterArithmetic.inverse(shape.getTransform()), worldPoint);
        const patternPoint = RayCasterArithmetic.multiplyMatrixWithPoint(RayCasterArithmetic.inverse(this.matrix), objectPoint);
        return this.colorAt(patternPoint);
    }
}

export class RingPattern extends Pattern {

    constructor(public a: Color,
                public b: Color) {
        super();
    }

    colorAt(point: Point): Color {
        if (Math.floor(Math.sqrt(point.x * point.x + point.z * point.z)) % 2 === 0) {
            return this.a;
        }
        return this.b;
    }
}

export class CheckerPattern extends Pattern {

    constructor(public a: Color,
                public b: Color) {
        super();
    }

    colorAt(point: Point): Color {
        if ((Math.floor(point.x) + Math.floor(point.y) + Math.floor(point.z)) % 2 === 0) {
            return this.a;
        }
        return this.b;
    }
}

export class NestedPattern extends Pattern {

    constructor(public a: Pattern,
                public b: Pattern) {
        super();
    }

    colorAt(point: Point): Color {
        if ((Math.floor(point.x) + Math.floor(point.y) + Math.floor(point.z)) % 2 === 0) {
            return this.a.colorAt(point);
        }
        return this.b.colorAt(point);
    }
}

export class BlendedPattern extends Pattern {

    constructor(public a: Pattern,
                public b: Pattern) {
        super();
    }

    colorAt(point: Point): Color {
        const colorA = this.a.colorAt(point);
        const colorB = this.b.colorAt(point);
        return RayCasterArithmetic.addColors(colorA, colorB);
    }
}

export class PerturbedPattern extends Pattern {

    constructor(public pattern: Pattern) {
        super();
    }

    colorAt(point: Point): Color {
        const perturbedPoint = new Point(point.x + Math.sin(point.x * point.y * point.z), point.y + Math.sin(point.x * point.y * point.z), point.z + Math.sin(point.x * point.y * point.z));
        return this.pattern.colorAt(perturbedPoint);
    }
}
