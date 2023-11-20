import {RayCasterBuilder} from '../builder/raycaster.builder';
import {RayCasterArithmetic} from '../math/raycaster.math';
import {
  Camera,
  Canvas,
  Color,
  Intersection,
  Intersections,
  Light,
  Material,
  Matrix,
  Plane,
  Point,
  Ray,
  Shape,
  Sphere,
  TestShape,
  Tuple,
  Vector,
  World,
} from '../model/raycaster.model';

describe('raycaster.builder.spec', () => {
    it('create tuple as point', () => {
        // GIVEN a tuple
        const a: Tuple = RayCasterBuilder.createTuple(4.3, -4.2, 3.1, 1.0);
        // THEN
        expect(a.x).toEqual(4.3);
        expect(a.y).toEqual(-4.2);
        expect(a.z).toEqual(3.1);
        expect(a.w).toEqual(1.0);
    });

    it('created tuple as point is typeof point', () => {
        // GIVEN a tuple as point
        const a: Tuple = RayCasterBuilder.createTuple(4.3, -4.2, 3.1, 1.0);
        // THEN
        const typeofResult = typeof a;
        expect(a instanceof Point).toBeTruthy();
    });

    it('create tuple as vector', () => {
        // GIVEN a tuple
        const a: Tuple = RayCasterBuilder.createTuple(4.3, -4.2, 3.1, 0.0);
        // THEN
        expect(a.x).toEqual(4.3);
        expect(a.y).toEqual(-4.2);
        expect(a.z).toEqual(3.1);
        expect(a.w).toEqual(0.0);
    });

    it('created tuple as vector is typeof vector', () => {
        // GIVEN a tuple as vector
        const a: Tuple = RayCasterBuilder.createTuple(4.3, -4.2, 3.1, 0.0);
        // THEN
        const typeofResult = typeof a;
        expect(a instanceof Vector).toBeTruthy();
    });

    it('created tuple should be equal', () => {
        // GIVEN a tuple as vector
        const a: Tuple = RayCasterBuilder.createTuple(4.3, -4.2, 3.1, 0.0);
        const b: Tuple = RayCasterBuilder.createTuple(4.3, -4.2, 3.1, 0.0);

        // THEN
        expect(a.equals(b)).toBeTruthy();
    });

    it('created tuple should be equal', () => {
        // GIVEN a tuple as vector
        const a: Tuple = RayCasterBuilder.createTuple(
            0.1 + 0.2,
            0.1 + 0.1,
            1.5 + 1.5,
            0.0 + 0.0
        );
        const b: Tuple = RayCasterBuilder.createTuple(0.3, 0.2, 3.0, 0.0);

        // THEN
        const typeofResult = typeof a;
        expect(a.equals(b)).toBeTruthy();
    });

    it('create a color', () => {
        // GIVEN a Color
        const a: Color = RayCasterBuilder.createColor(0.5, 0.4, 1.7);
        // THEN
        expect(a.r).toEqual(0.5);
        expect(a.g).toEqual(0.4);
        expect(a.b).toEqual(1.7);
    });

    it('create a canvas', () => {
        // GIVEN canvas
        const a: Canvas = RayCasterBuilder.createCanvas(10, 20);

        // THEN
        expect(a.w === 10).toBeTruthy();
        expect(a.h === 20).toBeTruthy();
    });

    it('draw pixel at canvas', () => {
        // GIVEN canvas
        const canvas: Canvas = RayCasterBuilder.createCanvas(10, 20);
        const red: Color = RayCasterBuilder.createColor(1, 0, 0);
        canvas.setPixel(red, 2, 3);

        const pixel: Color = canvas.getPixel(2, 3);
        expect(pixel.equals(red)).toBeTruthy();
        expect(red instanceof Color).toBeTruthy();
    });

    it('creating a 4x4 matrix', () => {
        // GIVEN a matrix
        const matrixNumbers = [
            1, 2, 3, 4, 5.5, 6.5, 7.5, 8.5, 9, 10, 11, 12, 13.5, 14.4, 15.5, 16.5,
        ];
        const rows = 4;
        const columns = 4;
        const m: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );

        // THEN number should be on index
        expect(m.getNumber(0, 0)).toEqual(1);
        expect(m.getNumber(0, 3)).toEqual(4);
        expect(m.getNumber(1, 0)).toEqual(5.5);
        expect(m.getNumber(1, 2)).toEqual(7.5);
        expect(m.getNumber(2, 2)).toEqual(11);
        expect(m.getNumber(3, 0)).toEqual(13.5);
        expect(m.getNumber(3, 2)).toEqual(15.5);
    });

    it('creating a 2x2 matrix', () => {
        // GIVEN a matrix
        const matrixNumbers = [-3, 5, 1, -2];
        const rows = 2;
        const columns = 2;
        const m: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );

        // THEN number should be on index
        expect(m.getNumber(0, 0)).toEqual(-3);
        expect(m.getNumber(0, 1)).toEqual(5);
        expect(m.getNumber(1, 0)).toEqual(1);
        expect(m.getNumber(1, 1)).toEqual(-2);
    });

    it('creating a 3x3 matrix', () => {
        // GIVEN a matrix
        const matrixNumbers = [-3, 5, 0, 1, -2, -7, 0, 1, 1];
        const rows = 3;
        const columns = 3;
        const m: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );

        // THEN number should be on index
        expect(m.getNumber(0, 0)).toEqual(-3);
        expect(m.getNumber(1, 1)).toEqual(-2);
        expect(m.getNumber(2, 2)).toEqual(1);
    });

    it('check matrix equality on identical matrices 3x3', () => {
        // GIVEN a matrix
        const matrixNumbers = [-3, 5, 0, 1, -2, -7, 0, 1, 1];
        const rows = 3;
        const columns = 3;
        const mA: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );
        const mB: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );
        expect(mA.equals(mB)).toBeTruthy();
    });

    it('check matrix equality on identical matrices 4x4', () => {
        // GIVEN a matrix
        const matrixNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];
        const rows = 4;
        const columns = 4;
        const mA: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );
        const mB: Matrix = RayCasterBuilder.createMatrix(
            matrixNumbers,
            rows,
            columns
        );
        expect(mA.equals(mB)).toBeTruthy();
    });

    it('check matrix inequality on matrices 4x4', () => {
        // GIVEN a matrix
        const matrixNumbersA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2];
        const matrixNumbersB = [2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];
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
        expect(mA.equals(mB)).toBeFalsy();
    });

    it('Creating and querying a ray', () => {
        let origin: Point = RayCasterBuilder.createPoint(1, 2, 3);
        let direction: Vector = RayCasterBuilder.createVector(4, 5, 6);

        let ray: Ray = RayCasterBuilder.createRay(origin, direction);
        expect(ray.getOrigin().equals(origin)).toBeTruthy();
        expect(ray.getDirection().equals(direction)).toBeTruthy();
    });

    it('An instersection encapsulates t and object', () => {
        let sphere: Sphere = RayCasterBuilder.createSphere();
        let interSection: Intersection = RayCasterBuilder.createIntersection(
            3.5,
            sphere
        );

        expect(interSection.getT() === 3.5).toBeTruthy();
        expect(interSection.getShape().equals(sphere)).toBeTruthy();
    });

    it('Aggregating intersections', () => {
        let sphere: Sphere = RayCasterBuilder.createSphere();
        let interSectionA: Intersection = RayCasterBuilder.createIntersection(
            1,
            sphere
        );
        let interSectionB: Intersection = RayCasterBuilder.createIntersection(
            2,
            sphere
        );
        let intersections: Intersections = new Intersections(
            interSectionA,
            interSectionB
        );
        expect(intersections.getCount() === 2).toBeTruthy();
        expect(intersections.getIntersectionAt(0).getT() === 1).toBeTruthy();
        expect(intersections.getIntersectionAt(1).getT() === 2).toBeTruthy();
    });

    it('Intersects sets the object on the intersection', () => {
        let sphere: Sphere = RayCasterBuilder.createSphere();
        let ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -5),
            new Vector(0, 0, 1)
        );
        let interSections: Intersections = sphere.intersect(ray);
        expect(interSections.getCount() === 2).toBeTruthy();
        expect(
            interSections.getIntersectionAt(0).getShape().equals(sphere)
        ).toBeTruthy();
        expect(
            interSections.getIntersectionAt(1).getShape().equals(sphere)
        ).toBeTruthy();
    });

    it('Creating a world', () => {
        let world: World = RayCasterBuilder.createWorld();

        expect(world.getShapes().length === 0).toBeTruthy();
        expect(world.getLightSource() === null).toBeTruthy();
    });

    it('Creating a default world', () => {
        let world: World = RayCasterBuilder.createDefaultWorld();
        let light: Light = RayCasterBuilder.createPointLight(
            new Point(-10, 10, -10),
            new Color(1, 1, 1)
        );

        let sphereA: Sphere = RayCasterBuilder.createSphere();
        sphereA.setMaterial(
            new Material(0.1, 0.7, 0.2, 200, new Color(0.8, 1.0, 0.6))
        );

        let sphereB: Sphere = RayCasterBuilder.createSphere();
        sphereB.setTransform(RayCasterBuilder.getScalingMatrix(0.5, 0.5, 0.5));

        let worldLightSource = world.getLightSource();
        if (worldLightSource != null) {
            expect(worldLightSource.equals(light)).toBeTruthy();
            expect(world.getShapes().length === 2).toBeTruthy();
            expect(world.contains(sphereA)).toBeTruthy();
            expect(world.contains(sphereB)).toBeTruthy();
        } else {
            throw new Error('Default world should contain a light source...');
        }
    });

    it('Constructing a camera', () => {
        // GIVEN
        const hsize = 160;
        const vsize = 120;
        const fieldOfView = Math.PI / 2;

        // WHEN
        const camera: Camera = RayCasterBuilder.createCamera(
            hsize,
            vsize,
            fieldOfView
        );

        // THEN
        expect(camera.getHSize() === 160).toBeTruthy();
        expect(camera.getVSize() === 120).toBeTruthy();
        expect(camera.getFieldOfView() === Math.PI / 2).toBeTruthy();
        expect(
            camera.getTransform().equals(RayCasterBuilder.createIdentityMatrix(4))
        ).toBeTruthy();
    });

    it('The default transformation of the test shape', () => {
        // GIVEN a test shape
        const s: Shape = RayCasterBuilder.createTestShape();

        // THEN per default the matrix is the identity matrix
        expect(s.getTransform()).toEqual(RayCasterBuilder.createIdentityMatrix(4));
    });

    it('Assign a transformation', () => {
        // GIVEN a test shape
        const s: Shape = RayCasterBuilder.createTestShape();

        // WHEN the translation matrix is set
        s.setTransform(RayCasterBuilder.getTranslationMatrix(2, 3, 4));

        // THEN it should equal
        expect(s.getTransform()).toEqual(
            RayCasterBuilder.getTranslationMatrix(2, 3, 4)
        );
    });

    it('The default material', () => {
        // GIVEN a test shape
        const s: Shape = RayCasterBuilder.createTestShape();

        // WHEN material
        const m: Material = s.getMaterial();

        // THEN material should equal default material
        expect(m).toEqual(RayCasterBuilder.createDefaultMaterial());
    });

    it('Assigning a material', () => {
        // GIVEN a test shape
        const s: Shape = RayCasterBuilder.createTestShape();
        const m: Material = RayCasterBuilder.createDefaultMaterial();
        m.setAmbient(1);

        // WHEN material is assigned
        s.setMaterial(m);

        // THEN the materials should equal
        expect(s.getMaterial()).toEqual(m);
    });

    it('Intersecting a scaled shape with a ray', () => {
        // GIVEN a test shape
        const ray = RayCasterBuilder.createRay(
            new Point(0, 0, -5),
            new Vector(0, 0, 1)
        );

        // WHEN
        const testShape = new TestShape();
        testShape.setTransform(RayCasterBuilder.getScalingMatrix(2, 2, 2));
        testShape.intersect(ray);

        // THEN the materials should equal
        expect(
            testShape.savedRay?.getOrigin().equals(new Point(0, 0, -2.5))
        ).toBeTruthy();
        expect(
            testShape.savedRay?.getDirection().equals(new Vector(0, 0, 0.5))
        ).toBeTruthy();
    });

    it('Intersecting a translated shape with a ray', () => {
        // GIVEN a test shape
        const ray = RayCasterBuilder.createRay(
            new Point(0, 0, -5),
            new Vector(0, 0, 1)
        );

        // WHEN
        const testShape = RayCasterBuilder.createTestShape();
        testShape.setTransform(RayCasterBuilder.getTranslationMatrix(5, 0, 0));
        testShape.intersect(ray);

        // THEN the materials should equal

        expect(
            testShape.savedRay?.getOrigin().equals(new Point(-5, 0, -5))
        ).toBeTruthy();
        expect(
            testShape.savedRay?.getDirection().equals(new Vector(0, 0, 1))
        ).toBeTruthy();
    });

    it('Computing the normal on a translated shape', () => {
        // GIVEN a test shape
        const testShape = RayCasterBuilder.createTestShape();

        // WHEN
        testShape.setTransform(RayCasterBuilder.getTranslationMatrix(0, 1, 0));
        const n: Vector = testShape.normalAt(new Point(0, 1.70711, -0.70711));

        // THEN the materials should equal
        expect(n.equals(new Vector(0, 0.70711, -0.70711))).toBeTruthy();
    });

    it('Computing the normal on a transformed shape', () => {
        // GIVEN a test shape
        const testShape = RayCasterBuilder.createTestShape();

        // WHEN
        const m = RayCasterArithmetic.multiplyMatrix(
            RayCasterBuilder.getScalingMatrix(1, 0.5, 1),
            RayCasterBuilder.getRotationMatrixZ(Math.PI / 5)
        );
        testShape.setTransform(m);
        const n: Vector = testShape.normalAt(
            new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
        );

        // THEN the materials should equal
        expect(n.equals(new Vector(0, 0.97014, -0.24254))).toBeTruthy();
    });

    it('A normal of a plane is constant everywhere', () => {
        // GIVEN a plane
        const plane: Plane = RayCasterBuilder.createPlane();

        // WHEN
        const n1: Vector = plane.local_normal_at(new Point(0, 0, 0));
        const n2: Vector = plane.local_normal_at(new Point(10, 0, -10));
        const n3: Vector = plane.local_normal_at(new Point(-5, 0, 150));

        // THEN the normal vector is alway constant
        expect(n1.equals(new Vector(0, 1, 0))).toBeTruthy();
        expect(n2.equals(new Vector(0, 1, 0))).toBeTruthy();
        expect(n3.equals(new Vector(0, 1, 0))).toBeTruthy();
    });

    it('Intersect with a ray parallel to the plane', () => {
        // GIVEN a plane
        const plane: Plane = RayCasterBuilder.createPlane();

        // WHEN the ray is parallel
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 10, 0),
            new Vector(0, 0, 1)
        );
        const intersections: Intersections = plane.local_intersect(ray);

        // THEN it is empty
        expect(intersections.getCount() === 0).toBeTruthy();
    });

    it('Intersect with a coplanar ray', () => {
        // GIVEN a plane
        const plane: Plane = RayCasterBuilder.createPlane();

        // WHEN the ray is parallel
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, 0),
            new Vector(0, 0, 1)
        );
        const intersections: Intersections = plane.local_intersect(ray);

        // THEN it is empty
        expect(intersections.getCount() === 0).toBeTruthy();
    });

    it('Intersect with a plane from above', () => {
        // GIVEN a plane
        const plane: Plane = RayCasterBuilder.createPlane();

        // WHEN the ray is parallel
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 1, 0),
            new Vector(0, -1, 0)
        );
        const intersections: Intersections = plane.local_intersect(ray);

        // THEN it is empty
        expect(intersections.getCount() === 1).toBeTruthy();
        expect(intersections.getIntersectionAt(0).getT() === 1).toBeTruthy();
        expect(
            intersections.getIntersectionAt(0).getShape().equals(plane)
        ).toBeTruthy();
    });

    it('Intersect with a plane from below', () => {
        // GIVEN a plane
        const plane: Plane = RayCasterBuilder.createPlane();

        // WHEN the ray is parallel
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, -1, 0),
            new Vector(0, 1, 0)
        );
        const intersections: Intersections = plane.local_intersect(ray);

        // THEN it is empty
        expect(intersections.getCount() === 1).toBeTruthy();
        expect(intersections.getIntersectionAt(0).getT() === 1).toBeTruthy();
        expect(
            intersections.getIntersectionAt(0).getShape().equals(plane)
        ).toBeTruthy();
    });
});
