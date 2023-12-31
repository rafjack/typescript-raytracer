import {RayCasterBuilder} from '../builder/raycaster.builder';
import {
    Camera,
    Color,
    Computations,
    Environment,
    Intersection,
    Intersections,
    Light,
    Material,
    Matrix,
    Plane,
    Point,
    Projectile,
    Ray,
    Shape,
    Tuple,
    Vector,
    World,
} from '../model/raycaster.model';
import {RAYCASTER_EPSILON, RECURSION_DEPTH} from "../constants/raycaster.constants";

export class RayCasterArithmetic {
    static addPoints(a: Point, b: Point): Vector {
        return RayCasterBuilder.createPoint(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static substractPoints(a: Point, b: Vector): Vector {
        return RayCasterBuilder.createTuple(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z,
            a.w - b.w
        );
    }

    static substractVectors(a: Vector, b: Vector): Vector {
        return RayCasterBuilder.createTuple(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z,
            a.w - b.w
        );
    }

    static substractVectorFromPoint(a: Vector, b: Point): Vector {
        return RayCasterBuilder.createTuple(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z,
            a.w - b.w
        );
    }

    static addTuples(a: Point, b: Vector): Point {
        return RayCasterBuilder.createTuple(
            a.x + b.x,
            a.y + b.y,
            a.z + b.z,
            a.w + b.w
        );
    }

    static substractTuples(a: Point, b: Vector): Point {
        return RayCasterBuilder.createPoint(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static addVectors(a: Vector, b: Vector): Vector {
        return RayCasterBuilder.createTuple(
            a.x + b.x,
            a.y + b.y,
            a.z + b.z,
            a.w + b.w
        );
    }

    static addColors(a: Color, b: Color): Color {
        return RayCasterBuilder.createColor(a.r + b.r, a.g + b.g, a.b + b.b);
    }

    static substractColors(a: Color, b: Color): Color {
        return RayCasterBuilder.createColor(a.r - b.r, a.g - b.g, a.b - b.b);
    }

    static multiplyColor(a: Color, n: number): Color {
        return RayCasterBuilder.createColor(a.r * n, a.g * n, a.b * n);
    }

    static multiplyColors(a: Color, b: Color): Color {
        return RayCasterBuilder.createColor(a.r * b.r, a.g * b.g, a.b * b.b);
    }

    static inverseVector(a: Vector): Vector {
        return RayCasterBuilder.createTuple(0 - a.x, 0 - a.y, 0 - a.z, 0 - a.w);
    }

    static inverseTuple(a: Tuple): Vector {
        return RayCasterBuilder.createTuple(0 - a.x, 0 - a.y, 0 - a.z, 0 - a.w);
    }

    static multiplyTuple(a: Tuple, n: number): Tuple {
        return RayCasterBuilder.createTuple(a.x * n, a.y * n, a.z * n, a.w * n);
    }

    static multiplyPoint(a: Point, n: number): Point {
        return RayCasterBuilder.createPoint(a.x * n, a.y * n, a.z * n);
    }

    static multiplyVector(a: Vector, n: number): Tuple {
        return RayCasterBuilder.createVector(a.x * n, a.y * n, a.z * n);
    }

    static divideTuple(a: Tuple, n: number): Tuple {
        return RayCasterBuilder.createTuple(a.x / n, a.y / n, a.z / n, a.w / n);
    }

    static magnitudeOf(a: Vector): number {
        return Math.sqrt(
            Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2) + Math.pow(a.w, 2)
        );
    }

    static normalize(a: Vector): Vector {
        return this.divideTuple(a, this.magnitudeOf(a));
    }

    static dotProduct(a: Vector, b: Vector): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    static crossProduct(a: Vector, b: Vector): Vector {
        return new Vector(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    static multiplyMatrix(a: Matrix, b: Matrix): Matrix {
        const multiplicationResultNumbers: number[] = [];
        for (let r = 0; r < a.getRows(); r++) {
            for (let c = 0; c < b.getColumns(); c++) {
                let result = 0;
                for (let i = 0; i < a.getColumns(); i++) {
                    result += a.getNumber(r, i) * b.getNumber(i, c);
                }
                multiplicationResultNumbers.push(result);
            }
        }
        return RayCasterBuilder.createMatrix(
            multiplicationResultNumbers,
            a.getRows(),
            b.getColumns()
        );
    }

    static transpose(a: Matrix): Matrix {
        const numbers: number[] = [];
        for (let r = 0; r < a.getRows(); r++) {
            for (let c = 0; c < a.getColumns(); c++) {
                numbers.push(a.getNumber(c, r));
            }
        }
        return RayCasterBuilder.createMatrix(numbers, a.getColumns(), a.getRows());
    }

    static getDeterminant(m: Matrix): number {
        if (m.getRows() === 2 && m.getColumns() === 2) {
            return m.getNumber(0, 0) * m.getNumber(1, 1) - m.getNumber(0, 1) * m.getNumber(1, 0);
        }
        let determinant = 0;
        for (let c = 0; c < m.getColumns(); c++) {
            determinant += m.getNumber(0, c) * this.getCofactor(m, 0, c);
        }
        return determinant;
    }

    static isInvertible(m: Matrix): boolean {
        return this.getDeterminant(m) !== 0;
    }

    static inverse(m: Matrix): Matrix {
        if (!this.isInvertible(m)) {
            throw new Error(`This matrix is not invertible`);
        }
        const inverse = this.nullMatrix(m);
        const determinant = this.getDeterminant(m);
        for (let r = 0; r < m.getRows(); r++) {
            for (let c = 0; c < m.getColumns(); c++) {
                const cofactor = this.getCofactor(m, r, c);
                inverse.setNumber(c, r, cofactor / determinant);
            }
        }
        return inverse;
    }

    static getCofactor(m: Matrix, row: number, column: number): number {
        const minor = this.getMinor(m, row, column);
        if (this.isOdd(row + column)) {
            return 0 - minor;
        }
        return minor;
    }

    static isOdd(n: number) {
        return n % 2 === 1;
    }

    static getMinor(m: Matrix, row: number, column: number): number {
        const submatrix = this.getSubmatrix(m, row, column);
        return this.getDeterminant(submatrix);
    }

    static getSubmatrix(m: Matrix, skipRow: number, skipColumn: number): Matrix {
        const numbers: number[] = [];
        for (let r = 0; r < m.getRows(); r++) {
            if (r !== skipRow) {
                for (let c = 0; c < m.getColumns(); c++) {
                    if (c !== skipColumn) {
                        numbers.push(m.getNumber(r, c));
                    }
                }
            }
        }
        return RayCasterBuilder.createMatrix(numbers, m.getRows() - 1, m.getColumns() - 1);
    }

    static cloneMatrix(m: Matrix): Matrix {
        const numbers: number[] = [];
        for (let r = 0; r < m.getRows(); r++) {
            for (let c = 0; c < m.getColumns(); c++) {
                numbers.push(m.getNumber(r, c));
            }
        }
        return RayCasterBuilder.createMatrix(numbers, m.getRows(), m.getColumns());
    }

    static multiplyMatrixWithPoint(transM: Matrix, point: Point): Point {
        const pM: Matrix = RayCasterBuilder.createMatrix(
            [point.x, point.y, point.z, point.w],
            4,
            1
        );
        const resultM: Matrix = this.multiplyMatrix(transM, pM);
        return new Point(
            resultM.getNumber(0, 0),
            resultM.getNumber(1, 0),
            resultM.getNumber(2, 0)
        );
    }

    static multiplyMatrixWithVector(transM: Matrix, vector: Vector): Vector {
        const vM: Matrix = RayCasterBuilder.createMatrix(
            [vector.x, vector.y, vector.z, vector.w],
            4,
            1
        );
        const resultM: Matrix = this.multiplyMatrix(transM, vM);
        return new Vector(
            resultM.getNumber(0, 0),
            resultM.getNumber(1, 0),
            resultM.getNumber(2, 0)
        );
    }

    static nullMatrix(m: Matrix): Matrix {
        const numbers: number[] = [];
        for (let r = 0; r < m.getRows(); r++) {
            for (let c = 0; c < m.getColumns(); c++) {
                numbers.push(0);
            }
        }
        return RayCasterBuilder.createMatrix(numbers, m.getRows(), m.getColumns());
    }

    static tick(environment: Environment, projectile: Projectile): Projectile {
        const newPosition: Point = this.addTuples(
            projectile.position,
            projectile.velocity
        );
        const newVelocity: Vector = this.addVectors(
            projectile.velocity,
            this.addVectors(environment.gravity, environment.wind)
        );
        return new Projectile(newPosition, newVelocity);
    }

    static getRadians(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }

    static getRayPosition(ray: Ray, t: number): Point {
        return this.addTuples(ray.getOrigin(), this.multiplyVector(ray.getDirection(), t));
    }

    static numberEquals(x: number, y: number) {
        return Math.abs(x - y) < RAYCASTER_EPSILON;
    }

    static getHit(intersections: Intersections): Intersection | null {
        const candidates: Intersection[] = [];
        for (const intersection of intersections.getIntersections()) {
            if (intersection.getT() >= 0) {
                candidates.push(intersection);
            }
        }
        candidates.sort((a, b) => a.getT() - b.getT());
        if (candidates.length === 0) {
            return null;
        }
        return candidates[0];
    }

    static transform(ray: Ray, translationMatrix: Matrix): Ray {
        const resultRay: Ray = RayCasterBuilder.createRay(
            this.multiplyMatrixWithPoint(translationMatrix, ray.getOrigin()),
            this.multiplyMatrixWithVector(translationMatrix, ray.getDirection())
        );
        return resultRay;
    }

    static normalAtPlane(worldObject: Shape, world_point: Point): Vector {

        const object_point: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
            RayCasterArithmetic.inverse(worldObject.getTransform()),
            world_point
        );
        const object_normal: Vector = worldObject.normalAt(object_point);
        const world_normal: Vector = RayCasterArithmetic.multiplyMatrixWithVector(
            RayCasterArithmetic.transpose(
                RayCasterArithmetic.inverse(worldObject.getTransform())
            ),
            object_normal
        );
        world_normal.w = 0;
        return RayCasterArithmetic.normalize(world_normal);
    }

    static normalAt(worldObject: Shape, world_point: Point): Vector {
        if (worldObject instanceof Plane) {
            return this.normalAtPlane(worldObject, world_point);
        }

        const worldObjectOrigin = RayCasterBuilder.createPoint(0, 0, 0);

        const object_point = RayCasterArithmetic.multiplyMatrixWithPoint(
            RayCasterArithmetic.inverse(worldObject.getTransform()),
            world_point
        );
        const object_normal: Vector = RayCasterArithmetic.substractPoints(
            object_point,
            worldObjectOrigin
        );
        const world_normal: Vector = RayCasterArithmetic.multiplyMatrixWithVector(
            RayCasterArithmetic.transpose(
                RayCasterArithmetic.inverse(worldObject.getTransform())
            ),
            object_normal
        );
        world_normal.w = 0;
        return RayCasterArithmetic.normalize(world_normal);
    }

    static reflect(input: Vector, normal: Vector): Vector {
        const dotProduct = RayCasterArithmetic.dotProduct(input, normal) * 2;
        const a = RayCasterArithmetic.multiplyVector(normal, dotProduct);
        return RayCasterArithmetic.substractVectors(input, a);
    }

    static lighting(
        material: Material,
        shape: Shape,
        light: Light,
        point: Point,
        eyeVector: Vector,
        normalVector: Vector,
        inShadow = false
    ): Color {
        let color: Color;

        if (material.pattern) {
            color = material.pattern.colorAtShape(shape, point);
        } else {
            color = material.getColor();
        }

        // find the direction to the light source
        const lightVector: Vector = RayCasterArithmetic.normalize(
            RayCasterArithmetic.substractPoints(light.getPosition(), point)
        );

        // compute the ambient contribution
        const ambient: Color = RayCasterArithmetic.multiplyColor(
            color,
            material.getAmbient()
        );

        // lightDotNormal represents the cosine of the angle between the
        // light vector and the normal vector. A negative number means the
        // light is on the other side of the surface.
        const lightDotNormal: number = RayCasterArithmetic.dotProduct(
            lightVector,
            normalVector
        );

        if (lightDotNormal < 0 || inShadow) {
            color = ambient;
        } else {
            // compute the diffuse contribution
            const diffuse: Color = RayCasterArithmetic.multiplyColor(
                color,
                material.getDiffuse() * lightDotNormal
            );

            // reflectDotEye represents the cosine of the angle between the
            // reflection vector and the eye vector. A negative number means the
            // light reflects away from the eye.
            const reflectVector: Vector = RayCasterArithmetic.reflect(
                RayCasterArithmetic.inverseVector(lightVector),
                normalVector
            );
            const reflectDotEye: number = RayCasterArithmetic.dotProduct(
                reflectVector,
                eyeVector
            );

            if (reflectDotEye <= 0) {
                color = RayCasterArithmetic.addColors(ambient, diffuse);
            } else {
                // compute the specular contribution
                const factor: number = Math.pow(reflectDotEye, material.getShininess());
                const specular: Color = RayCasterArithmetic.multiplyColor(
                    light.getIntensity(),
                    material.getSpecular() * factor
                );
                color = RayCasterArithmetic.addColors(
                    RayCasterArithmetic.addColors(ambient, diffuse),
                    specular
                );
            }
        }
        if (inShadow) {
            return ambient
        }
        return color;
    }

    static prepareComputations(
        intersection: Intersection,
        ray: Ray,
        intersections: Intersections = new Intersections()
    ): Computations {
        // precompute some useful values
        const point: Point = RayCasterArithmetic.getRayPosition(
            ray,
            intersection.getT()
        );

        const eyeV: Vector = RayCasterArithmetic.multiplyVector(
            ray.getDirection(),
            -1
        );

        let normalV: Vector = RayCasterArithmetic.normalAt(
            intersection.getShape(),
            point
        );

        let inside = false;
        if (RayCasterArithmetic.dotProduct(normalV, eyeV) < 0) {
            inside = true;
            normalV = RayCasterArithmetic.multiplyVector(normalV, -1);
        }

        const overPoint = RayCasterArithmetic.addTuples(
            point,
            RayCasterArithmetic.multiplyPoint(normalV, RAYCASTER_EPSILON)
        );

        const underPoint: Point = RayCasterArithmetic.substractTuples(
            point,
            RayCasterArithmetic.multiplyPoint(normalV, RAYCASTER_EPSILON)
        );

        let reflectV: Vector = RayCasterArithmetic.reflect(ray.getDirection(), normalV);

        let n1: number = 1;
        let n2: number = 1;
        const containers: Shape[] = [];
        for (const i of intersections.getIntersections()) {
            if (i === intersection) {
                if (containers.length === 0) {
                    n1 = 1;
                } else {
                    n1 = containers[containers.length - 1].getMaterial().getRefractiveIndex();
                }
            }
            if (containers.includes(i.getShape())) {
                containers.splice(containers.indexOf(i.getShape()), 1);
            } else {
                containers.push(i.getShape());
            }
            if (i === intersection) {
                if (containers.length === 0) {
                    n2 = 1;
                } else {
                    n2 = containers[containers.length - 1].getMaterial().getRefractiveIndex();
                }
                break;
            }
        }

        return new Computations(
            intersection.getT(),
            intersection.getShape(),
            point,
            overPoint,
            underPoint,
            eyeV,
            normalV,
            inside,
            reflectV,
            n1,
            n2
        );
    }

    static shadeHit(world: World, computations: Computations, remaining = RECURSION_DEPTH): Color {
        // NOTE: at the moment there is only support for one light source
        // to support multiple light source iterate over all the light
        // sources and add the colors together
        // this will increase the calculation time, especially when shadow are present
        const lightSource = world.getLightSource();
        if (lightSource) {
            const isShadowed: boolean = RayCasterArithmetic.isShadowed(
                world,
                computations.getOverPoint()
            );

            let surfaceColor: Color = RayCasterArithmetic.lighting(
                computations.getObject().getMaterial(),
                computations.getObject(),
                lightSource,
                computations.getOverPoint(),
                computations.getEyeV(),
                computations.getNormalV(),
                isShadowed
            );

            let reflectedColor = RayCasterArithmetic.reflectedColor(world, computations, remaining);
            let refractedColor = RayCasterArithmetic.refractedColor(world, computations, remaining);

            const material = computations.getObject().getMaterial();
            if (material.getReflective() > 0 && material.getTransparency() > 0) {
                const reflectance: number = RayCasterArithmetic.schlick(computations);
                reflectedColor = RayCasterArithmetic.multiplyColor(reflectedColor, reflectance);
                refractedColor = RayCasterArithmetic.multiplyColor(refractedColor, 1 - reflectance);
                return RayCasterArithmetic.addColors(RayCasterArithmetic.addColors(surfaceColor, reflectedColor), refractedColor);
            } else {
                return RayCasterArithmetic.addColors(RayCasterArithmetic.addColors(surfaceColor, reflectedColor), refractedColor);
            }
        }
        throw new Error('Unable to calculate shade without lightSource in world');
    }

    static colorAt(world: World, ray: Ray, remaining = RECURSION_DEPTH): Color {
        const intersections: Intersections = world.intersect(ray);
        const intersectionResult: Intersection | null =
            RayCasterArithmetic.getHit(intersections);
        if (intersectionResult) {
            const preparedComputations = RayCasterArithmetic.prepareComputations(
                intersectionResult,
                ray
            );
            return RayCasterArithmetic.shadeHit(world, preparedComputations, remaining);
        } else {
            return new Color(0, 0, 0);
        }
    }

    static viewTransform(from: Point, to: Point, up: Vector): Matrix {
        const forward: Vector = RayCasterArithmetic.normalize(
            RayCasterArithmetic.substractPoints(to, from)
        );
        const upN = RayCasterArithmetic.normalize(up);
        const left = RayCasterArithmetic.crossProduct(forward, upN);
        const trueUp = RayCasterArithmetic.crossProduct(left, forward);
        const orientationNumbers: number[] = [
            left.x,
            left.y,
            left.z,
            0,
            trueUp.x,
            trueUp.y,
            trueUp.z,
            0,
            -forward.x,
            -forward.y,
            -forward.z,
            0,
            0,
            0,
            0,
            1,
        ];
        const orientationMatrix: Matrix = RayCasterBuilder.createMatrix(
            orientationNumbers,
            4,
            4
        );
        const result = RayCasterArithmetic.multiplyMatrix(
            orientationMatrix,
            RayCasterBuilder.getTranslationMatrix(-from.x, -from.y, -from.z)
        );
        return result;
    }

    static rayForPixel(camera: Camera, px: number, py: number): Ray {
        // the offset from the edge of the canvas to the pixels center
        const xoffset = (px + 0.5) * camera.getPixelSize();
        const yoffset = (py + 0.5) * camera.getPixelSize();

        // the untransformed coordinates of the pixel in world space.
        // (remember that the camera looks toward -z, so +x is to the "left")
        const worldX = camera.getHalfWidth() - xoffset;
        const worldY = camera.getHalfHeight() - yoffset;

        // using the camera matrix, transform the canvas point and the origin,
        // and then compute the rays direction vector.
        // (remember that the canvas is at z=-1)
        const pixel: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
            RayCasterArithmetic.inverse(camera.getTransform()),
            new Point(worldX, worldY, -1)
        );
        const origin: Point = RayCasterArithmetic.multiplyMatrixWithPoint(
            RayCasterArithmetic.inverse(camera.getTransform()),
            new Point(0, 0, 0)
        );
        const direction: Vector = RayCasterArithmetic.normalize(
            RayCasterArithmetic.substractPoints(pixel, origin)
        );

        return RayCasterBuilder.createRay(origin, direction);
    }

    static isShadowed(world: World, point: Point): boolean {
        const lightSource = world.getLightSource();
        if (lightSource) {
            // measure distance from point to light source
            const v: Vector = RayCasterArithmetic.substractPoints(
                lightSource.getPosition(),
                point
            );
            const vDistance: number = RayCasterArithmetic.magnitudeOf(v);
            const vDirection: Vector = RayCasterArithmetic.normalize(v);

            // create a ray from point twoards light source
            const shadowRay: Ray = RayCasterBuilder.createRay(point, vDirection);

            // intersect the world with the array
            const interSections: Intersections = world.intersect(shadowRay);

            // check if there was a hit
            const hit: Intersection | null = RayCasterArithmetic.getHit(interSections);

            // when the hit is smaller then the distance point is shadowed
            if (hit && hit.getT() < vDistance) {
                return true;
            }
            return false;
        }
        throw new Error('Error there is no light source is present in this world');
    }

    static reflectedColor(world: World, comps: Computations, remaining: number): Color {
        if (remaining <= 0) {
            return new Color(0, 0, 0);
        }
        if (comps.getObject().getMaterial().getReflective() === 0) {
            return new Color(0, 0, 0);
        }
        const reflectRay = RayCasterBuilder.createRay(
            comps.getOverPoint(),
            comps.getReflectV()
        );
        const color = RayCasterArithmetic.colorAt(world, reflectRay, remaining - 1);
        return RayCasterArithmetic.multiplyColor(
            color,
            comps.getObject().getMaterial().getReflective()
        );
    }

    static refractedColor(world: World, comps: Computations, remaining: number): Color {
        // return black if the recursion limit has been reached
        if (remaining <= 0) {
            return new Color(0, 0, 0);
        }

        // return black if the material is not transparent
        if (comps.getObject().getMaterial().getTransparency() === 0) {
            return new Color(0, 0, 0);
        }

        // find the ratio of first index of refraction to the second
        // and the angle of incidence
        const nRatio = comps.getN1() / comps.getN2();
        const cosI = RayCasterArithmetic.dotProduct(comps.getEyeV(), comps.getNormalV());
        // sin2_t is the "sine squared" of the angle of refraction
        const sin2_t = Math.pow(nRatio, 2) * (1 - Math.pow(cosI, 2));
        // return black if the angle of refraction is greater than 1
        if (sin2_t > 1) {
            return new Color(0, 0, 0);
        }

        // find the cosine of theta_t using trigonometric identity
        const cosT = Math.sqrt(1.0 - sin2_t);

        // compute the direction of the refracted ray
        const direction = RayCasterArithmetic.substractVectors(
            RayCasterArithmetic.multiplyVector(comps.getNormalV(), nRatio * cosI - cosT),
            RayCasterArithmetic.multiplyVector(comps.getEyeV(), nRatio)
        );

        // create the refracted ray
        const refractRay = RayCasterBuilder.createRay(comps.getUnderPoint(), direction);

        // find the color of the refracted ray, making sure to multiply
        // by the transparency value to account for any opacity
        const color = RayCasterArithmetic.colorAt(world, refractRay, remaining - 1);

        return RayCasterArithmetic.multiplyColor(
            color,
            comps.getObject().getMaterial().getTransparency()
        );
    }

    static schlick(comps: Computations) {
        // find the cosine of the angle between the eye and normal vectors
        let cos = RayCasterArithmetic.dotProduct(comps.getEyeV(), comps.getNormalV());

        // total internal reflection can only occur if n1 > n2
        if (comps.getN1() > comps.getN2()) {
            const n = comps.getN1() / comps.getN2();
            const sin2_t = Math.pow(n, 2) * (1 - Math.pow(cos, 2));
            if (sin2_t > 1) {
                return 1;
            }

            // compute cosine of theta_t using trigonometric identity
            const cos_t = Math.sqrt(1.0 - sin2_t);

            // when n1 > n2, use cos(theta_t) instead
            cos = cos_t;
        }

        const r0 = Math.pow((comps.getN1() - comps.getN2()) / (comps.getN1() + comps.getN2()), 2);
        return r0 + (1 - r0) * Math.pow(1 - cos, 5);
    }
}
