import {RayCasterBuilder} from '../builder/raycaster.builder';
import {RayCasterArithmetic} from '../math/raycaster.math';

export class Tuple {
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public w: number
    ) {
    }

    equals(t: Tuple): boolean {
        return (
            RayCasterArithmetic.numberEquals(t.x, this.x) &&
            RayCasterArithmetic.numberEquals(t.y, this.y) &&
            RayCasterArithmetic.numberEquals(t.z, this.z) &&
            RayCasterArithmetic.numberEquals(t.w, this.w)
        );
    }
}

export class Point {
    w = 1.0;

    constructor(public x: number, public y: number, public z: number) {
    }

    equals(t: Point): boolean {
        return (
            RayCasterArithmetic.numberEquals(t.x, this.x) &&
            RayCasterArithmetic.numberEquals(t.y, this.y) &&
            RayCasterArithmetic.numberEquals(t.z, this.z) &&
            RayCasterArithmetic.numberEquals(t.w, this.w)
        );
    }
}

export class Vector {
    w = 0.0;

    constructor(public x: number, public y: number, public z: number) {
    }

    equals(t: Tuple): boolean {
        return (
            RayCasterArithmetic.numberEquals(t.x, this.x) &&
            RayCasterArithmetic.numberEquals(t.y, this.y) &&
            RayCasterArithmetic.numberEquals(t.z, this.z) &&
            RayCasterArithmetic.numberEquals(t.w, this.w)
        );
    }
}

export class Color {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    equals(c: Color): boolean {
        return (
            RayCasterArithmetic.numberEquals(c.r, this.r) &&
            RayCasterArithmetic.numberEquals(c.g, this.g) &&
            RayCasterArithmetic.numberEquals(c.b, this.b)
        );
    }
}

export class Projectile {
    constructor(public position: Point, public velocity: Vector) {
    }
}

export class Environment {
    constructor(public gravity: Vector, public wind: Vector) {
    }
}

export class Canvas {
    private plane: Color[][];

    constructor(public w: number, public h: number) {
        this.plane = new Array<Color[]>(h);
        for (let i = 0; i < this.plane.length; i++) {
            this.plane[i] = new Array<Color>(w);
        }
        // rows => y
        for (let y = 0; y < h; y++) {
            // columns => x
            for (let x = 0; x < w; x++) {
                this.plane[y][x] = new Color(0, 0, 0);
            }
        }
    }

    fill(c: Color) {
        // rows => y
        for (let y = 0; y < this.plane.length; y++) {
            // columns => x
            for (let x = 0; x < this.plane[y].length; x++) {
                this.plane[y][x] = c;
            }
        }
    }

    setPixel(c: Color, x: number, y: number) {
        this.plane[y][x] = new Color(c.r, c.g, c.b);
    }

    getPixel(x: number, y: number): Color {
        if (this.plane[y][x]) {
            return new Color(
                this.plane[y][x].r,
                this.plane[y][x].g,
                this.plane[y][x].b
            );
        }
        return this.plane[y][x];
    }
}

export class Matrix {
    private matrix: number[][];

    constructor(
        numbers: number[],
        private rows: number,
        private columns: number
    ) {
        this.matrix = new Array<number[]>(rows);
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array<number>(columns);
        }
        let counter = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                this.matrix[r][c] = numbers[counter];
                counter += 1;
            }
        }
    }

    getNumber(i: number, j: number): number {
        if (this.matrix[i][j] != undefined || this.matrix[i][j] != null) {
            return this.matrix[i][j];
        }
        return NaN;
    }

    setNumber(r: number, c: number, value: number) {
        this.matrix[r][c] = value;
    }

    getRows(): number {
        return this.rows;
    }

    getColumns(): number {
        return this.columns;
    }

    getSize(): number {
        return this.rows * this.columns;
    }

    equals(m: Matrix): boolean {
        if (this.rows !== m.getRows() && this.columns !== m.getColumns()) {
            return false;
        }
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if (
                    !RayCasterArithmetic.numberEquals(
                        this.matrix[r][c],
                        m.getNumber(r, c)
                    )
                ) {
                    return false;
                }
            }
        }
        return true;
    }
}

export class Ray {
    constructor(private origin: Point, private direction: Vector) {
    }

    getOrigin(): Point {
        return new Point(this.origin.x, this.origin.y, this.origin.z);
    }

    getDirection(): Vector {
        return new Vector(this.direction.x, this.direction.y, this.direction.z);
    }

    equals(r: Ray): boolean {
        if (!r) {
            return false;
        }
        return (
            this.origin.equals(r.getOrigin()) &&
            this.direction.equals(r.getDirection())
        );
    }
}

export abstract class Shape {
    id: string;
    matrix: Matrix;
    material: Material;

    constructor() {
        this.matrix = RayCasterBuilder.createIdentityMatrix(4);
        this.material = RayCasterBuilder.createDefaultMaterial();
        this.id = RayCasterBuilder.uuid();
    }

    getId(): string {
        return this.id;
    }

    getTransform(): Matrix {
        return this.matrix;
    }

    setTransform(m: Matrix) {
        this.matrix = m;
    }

    getMaterial(): Material {
        return RayCasterBuilder.createMaterial(
            this.material.getAmbient(),
            this.material.getDiffuse(),
            this.material.getSpecular(),
            this.material.getShininess(),
            this.material.getColor()
        );
    }

    setMaterial(material: Material) {
        this.material = RayCasterBuilder.createMaterial(
            material.getAmbient(),
            material.getDiffuse(),
            material.getSpecular(),
            material.getShininess(),
            material.getColor()
        );
    }

    normalAt(point: Point): Vector {
        const local_point: Point = this.world_to_object(point);
        const local_normal: Vector = this.local_normal_at(local_point);
        return this.normal_to_world(local_normal);
    }

    intersect(ray: Ray): Intersections {
        const transformedRay: Ray = RayCasterArithmetic.transform(
            ray,
            RayCasterArithmetic.inverse(this.getTransform())
        );
        const result = this.local_intersect(transformedRay);
        return result;
    }

    world_to_object(point: Point): Point {
        return RayCasterArithmetic.multiplyMatrixWithPoint(
            RayCasterArithmetic.inverse(this.getTransform()),
            point
        );
    }

    normal_to_world(normal: Vector): Vector {
        normal = RayCasterArithmetic.multiplyMatrixWithVector(
            RayCasterArithmetic.transpose(
                RayCasterArithmetic.inverse(this.getTransform())
            ),
            normal
        );
        normal = RayCasterArithmetic.normalize(normal);
        return normal;
    }

    abstract local_normal_at(point: Point): Vector;

    abstract local_intersect(ray: Ray): Intersections;

    equals(otherSphere: Shape): boolean {
        return (
            this.material.equals(otherSphere.getMaterial()) &&
            this.matrix.equals(otherSphere.getTransform())
        );
    }
}

export class TestShape extends Shape {
    savedRay: Ray | null;

    constructor(origin: Point = new Point(0, 0, 0)) {
        super();
        this.savedRay = null;
    }

    local_normal_at(point: Point): Vector {
        return new Vector(point.x, point.y, point.z);
    }

    local_intersect(ray: Ray): Intersections {
        this.savedRay = ray;
        return new Intersections();
    }
}

export class Plane extends Shape {
    constructor(origin: Point = new Point(0, 0, 0)) {
        super();
    }

    local_normal_at(point: Point): Vector {
        return new Vector(0, 1, 0);
    }

    local_intersect(ray: Ray): Intersections {
        if (
            Math.abs(ray.getDirection().y) < 0.00000000000000000000000000000000000001
        ) {
            return new Intersections();
        }
        const t = -ray.getOrigin().y / ray.getDirection().y;
        return new Intersections(new Intersection(t, this));
    }
}

export class Sphere extends Shape {
    origin: Point;

    constructor(origin: Point = new Point(0, 0, 0)) {
        super();
        this.origin = origin;
    }

    local_normal_at(point: Point): Vector {
        return RayCasterArithmetic.substractPoints(point, this.origin);
    }

    local_intersect(transformedRay: Ray): Intersections {
        const shapeToRay: Vector = RayCasterArithmetic.substractVectors(
            new Vector(
                transformedRay.getOrigin().x,
                transformedRay.getOrigin().y,
                transformedRay.getOrigin().z
            ),
            new Vector(0, 0, 0)
        );
        const a = RayCasterArithmetic.dotProduct(
            transformedRay.getDirection(),
            transformedRay.getDirection()
        );
        const b =
            2 *
            RayCasterArithmetic.dotProduct(transformedRay.getDirection(), shapeToRay);
        const c = RayCasterArithmetic.dotProduct(shapeToRay, shapeToRay) - 1;
        const discriminant = Math.pow(b, 2) - 4 * a * c;
        if (discriminant < 0) {
            return new Intersections();
        }
        const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        return new Intersections(
            new Intersection(t1, this),
            new Intersection(t2, this)
        );
    }
}

export class Intersection {
    constructor(private t: number, private shape: Shape) {
    }

    getT(): number {
        return this.t;
    }

    getShape(): Shape {
        return this.shape;
    }

    equals(o: Intersection): boolean {
        return o.getT() === this.t && o.getShape().equals(this.shape);
    }
}

export class Intersections {
    private intersections: Intersection[];

    constructor(...args: Intersection[]) {
        this.intersections = args;
    }

    getCount() {
        return this.intersections.length;
    }

    getIntersections(): Intersection[] {
        return this.intersections;
    }

    getIntersectionAt(i: number) {
        return this.intersections[i];
    }
}

export class Light {
    constructor(private position: Point, private intensity: Color) {
    }

    getIntensity(): Color {
        return RayCasterBuilder.createColor(
            this.intensity.r,
            this.intensity.g,
            this.intensity.b
        );
    }

    getPosition(): Point {
        return RayCasterBuilder.createPoint(
            this.position.x,
            this.position.y,
            this.position.z
        );
    }

    equals(o: Light): boolean {
        return (
            this.position.equals(o.position) && this.intensity.equals(o.intensity)
        );
    }
}

export class Material {
    constructor(
        private ambient = 0.1,
        private diffuse = 0.9,
        private specular = 0.9,
        private shininess = 200.0,
        private color = new Color(1, 1, 1)
    ) {
        if (ambient < 0 || diffuse < 0 || specular < 0 || shininess < 0) {
            throw new Error('Material value < 0 is invalid');
        }
    }

    getAmbient(): number {
        return this.ambient;
    }

    setAmbient(ambient: number) {
        this.ambient = ambient;
    }

    getDiffuse(): number {
        return this.diffuse;
    }

    setDiffuse(diffuse: number) {
        this.diffuse = diffuse;
    }

    getSpecular(): number {
        return this.specular;
    }

    setSpecular(specular: number) {
        this.specular = specular;
    }

    getShininess(): number {
        return this.shininess;
    }

    setShininess(shininess: number) {
        this.shininess = shininess;
    }

    getColor(): Color {
        return RayCasterBuilder.createColor(
            this.color.r,
            this.color.g,
            this.color.b
        );
    }

    setColor(color: Color) {
        this.color = color;
    }

    equals(o: Material): boolean {
        return (
            RayCasterArithmetic.numberEquals(o.ambient, this.ambient) &&
            RayCasterArithmetic.numberEquals(o.diffuse, this.diffuse) &&
            RayCasterArithmetic.numberEquals(o.specular, this.specular) &&
            RayCasterArithmetic.numberEquals(o.shininess, this.shininess) &&
            o.color.equals(this.color)
        );
    }
}

export class World {
    constructor(
        private lightSource: Light | null = null,
        private shapes: Shape[] = []
    ) {
    }

    getShapeAt(index: number): Shape {
        return this.shapes[index];
    }

    getShapes(): Shape[] {
        return this.shapes;
    }

    getLightSource(): Light | null {
        return this.lightSource;
    }

    setLightSource(lightSource: Light) {
        this.lightSource = lightSource;
    }

    setShapes(shapes: Shape[]) {
        this.shapes = shapes;
    }

    intersect(ray: Ray): Intersections {
        const allShapeIntersections: Intersection[] = [];
        this.shapes.forEach((shape: Shape) => {
            const shapeIntersections = shape.intersect(ray);
            allShapeIntersections.push(...shapeIntersections.getIntersections());
        });
        allShapeIntersections.sort((a, b) => {
            return a.getT() - b.getT();
        });
        return new Intersections(...allShapeIntersections);
    }

    contains(shape: Shape): boolean {
        let result = false;
        this.shapes.forEach((x) => {
            if (x.equals(shape)) {
                result = true;
                return;
            }
        });
        return result;
    }
}

export class Computations {
    constructor(
        private t: number,
        private object: Shape,
        private point: Point,
        private overPoint: Point,
        private eyeV: Vector,
        private normalV: Vector,
        private inside: boolean
    ) {
    }

    getT(): number {
        return this.t;
    }

    getObject(): Shape {
        return this.object;
    }

    getPoint(): Point {
        return this.point;
    }

    getEyeV(): Vector {
        return this.eyeV;
    }

    getNormalV(): Vector {
        return this.normalV;
    }

    isInside(): boolean {
        return this.inside;
    }

    getOverPoint(): Point {
        return this.overPoint;
    }
}

export class Camera {
    private pixelSize = -1;
    private halfWidth = -1;
    private halfHeight = -1;

    constructor(
        private hsize: number,
        private vsize: number,
        private fieldOfView: number,
        private transform = RayCasterBuilder.createIdentityMatrix(4)
    ) {
        this.calculatePixelSize();
    }

    getHSize(): number {
        return this.hsize;
    }

    getVSize(): number {
        return this.vsize;
    }

    getFieldOfView(): number {
        return this.fieldOfView;
    }

    getTransform(): Matrix {
        return this.transform;
    }

    setTranform(transform: Matrix) {
        this.transform = transform;
    }

    getPixelSize(): number {
        return this.pixelSize;
    }

    getHalfWidth() {
        return this.halfWidth;
    }

    getHalfHeight() {
        return this.halfHeight;
    }

    private calculatePixelSize() {
        const halfView = Math.tan(this.fieldOfView / 2);
        const aspect = this.hsize / this.vsize;
        if (aspect >= 1) {
            this.halfWidth = halfView;
            this.halfHeight = halfView / aspect;
        } else {
            this.halfWidth = halfView * aspect;
            this.halfHeight = halfView;
        }
        this.pixelSize = (this.halfWidth * 2) / this.hsize;
    }
}
