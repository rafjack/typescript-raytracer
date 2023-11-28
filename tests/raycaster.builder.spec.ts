import {RayCasterBuilder} from '../src/lib/builder/raycaster.builder';
import {RayCasterArithmetic} from '../src/lib/math/raycaster.math';
import {
    Camera,
    Canvas,
    Color,
    Computations,
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
} from '../src/lib/model/raycaster.model';
import {RAYCASTER_EPSILON} from "../src";

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

    // reflectivity for the default material
    it('The default material', () => {
        // GIVEN a material
        const m: Material = RayCasterBuilder.createDefaultMaterial();

        // THEN the default material has reflectivity 0.0
        expect(m.getReflective() === 0.0).toBeTruthy();
    });

    // show that the precomputing the reflection precomputes the reflectv vector
    it('Precomputing the reflection vector', () => {
        // GIVEN a plane
        const plane: Plane = RayCasterBuilder.createPlane();

        // WHEN
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 1, -1),
            new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
        );
        const intersection: Intersection = RayCasterBuilder.createIntersection(
            Math.sqrt(2),
            plane
        );
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray);

        // THEN
        expect(comps.getReflectV().equals(new Vector(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2))).toBeTruthy();
    });

    // The reflected color for a nonreflective material
    it('The reflected color for a nonreflective material', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();

        // WHEN
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, 0),
            new Vector(0, 0, 1)
        );
        const shape: Shape = world.getShapes()[1];
        shape.getMaterial().setAmbient(1);
        const intersection: Intersection = RayCasterBuilder.createIntersection(
            1,
            shape
        );
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray);
        const color: Color = RayCasterArithmetic.reflectedColor(world, comps, 0);

        // THEN
        expect(color.equals(new Color(0, 0, 0))).toBeTruthy();
    });

    // color at with mutually reflective surfaces
    it('color at with mutually reflective surfaces', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const lower: Shape = RayCasterBuilder.createPlane();
        lower.getMaterial().setReflective(1);
        lower.getMaterial().setAmbient(0);
        lower.setTransform(RayCasterBuilder.getTranslationMatrix(0, -1, 0));
        const upper: Shape = RayCasterBuilder.createPlane();
        upper.getMaterial().setReflective(1);
        upper.setTransform(RayCasterBuilder.getTranslationMatrix(0, 1, 0));
        upper.getMaterial().setAmbient(0);
        world.setShapes([lower, upper]);

        // WHEN
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, 0),
            new Vector(0, 1, 0)
        );
        const color: Color = RayCasterArithmetic.colorAt(world, ray, 0);

        // THEN
        expect(color.equals(new Color(0.0, 0.0, 0.0))).toBeTruthy();
    });

    // The reflected color at the maximum recursive depth
    it('The reflected color at the maximum recursive depth', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const shape: Shape = RayCasterBuilder.createPlane();
        shape.getMaterial().setReflective(0.5);
        shape.setTransform(RayCasterBuilder.getTranslationMatrix(0, -1, 0));
        world.setShapes([shape]);

        // WHEN
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -3),
            new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
        );
        const intersection: Intersection = RayCasterBuilder.createIntersection(
            Math.sqrt(2),
            shape
        );
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray);
        const color: Color = RayCasterArithmetic.reflectedColor(world, comps, 0);

        // THEN
        expect(color.equals(new Color(0, 0, 0))).toBeTruthy();
    });

    // transparency and refraction index for the default material
    it('The default material', () => {
        // GIVEN a material
        const m: Material = RayCasterBuilder.createDefaultMaterial();

        // THEN the default material has reflectivity 0.0
        expect(m.getTransparency() === 0.0).toBeTruthy();
        expect(m.getRefractiveIndex() === 1.0).toBeTruthy();
    });

    // a helper function for producing a sphere with a glassy material
    it('a helper function for producing a sphere with a glassy material', () => {
        // GIVEN a material
        const s: Sphere = RayCasterBuilder.createGlassSphere();

        s.setTransform(RayCasterBuilder.createIdentityMatrix(4));

        // THEN the default material has reflectivity 0.0
        expect(s.getMaterial().getTransparency() === 1.0).toBeTruthy();
        expect(s.getMaterial().getRefractiveIndex() === 1.5).toBeTruthy();
    });

    // Finding n1 and n2 at various intersections
    it('Finding n1 and n2 at various intersections', () => {
        // GIVEN three glass spheres
        const a: Sphere = RayCasterBuilder.createGlassSphere();
        a.getMaterial().setRefractiveIndex(1.5);
        a.setTransform(RayCasterBuilder.getScalingMatrix(2, 2, 2));

        const b: Sphere = RayCasterBuilder.createGlassSphere();
        b.getMaterial().setRefractiveIndex(2.0);
        b.setTransform(RayCasterBuilder.getTranslationMatrix(0, 0, -0.25));

        const c: Sphere = RayCasterBuilder.createGlassSphere();
        c.getMaterial().setRefractiveIndex(2.5);
        c.setTransform(RayCasterBuilder.getTranslationMatrix(0, 0, 0.25));

        // WHEN
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -4),
            new Vector(0, 0, 1)
        );
        const intersections: Intersections = new Intersections(
            RayCasterBuilder.createIntersection(2, a),
            RayCasterBuilder.createIntersection(2.75, b),
            RayCasterBuilder.createIntersection(3.25, c),
            RayCasterBuilder.createIntersection(4.75, b),
            RayCasterBuilder.createIntersection(5.25, c),
            RayCasterBuilder.createIntersection(6, a)
        );

        const exampleValues: Map<number, object> = new Map<number, object>();
        exampleValues.set(0, {n1: 1.0, n2: 1.5});
        exampleValues.set(1, {n1: 1.5, n2: 2.0});
        exampleValues.set(2, {n1: 2.0, n2: 2.5});
        exampleValues.set(3, {n1: 2.5, n2: 2.5});
        exampleValues.set(4, {n1: 2.5, n2: 1.5});
        exampleValues.set(5, {n1: 1.5, n2: 1.0});


        for (let i = 0; i < intersections.getCount(); i++) {
            const comps: Computations = RayCasterArithmetic.prepareComputations(intersections.getIntersectionAt(i), ray, intersections);
            const n1: number = comps.getN1();
            const n2: number = comps.getN2();
            // THEN
            // @ts-ignore
            const exampleValue: object = exampleValues.get(i);
            // @ts-ignore
            expect(n1 === exampleValue['n1']).toBeTruthy();
            // @ts-ignore
            expect(n2 === exampleValue['n2']).toBeTruthy();
        }

    });

    // The under point is offset below the surface
    it('The under point is offset below the surface', () => {
        // GIVEN a glass sphere
        const sphere: Sphere = RayCasterBuilder.createGlassSphere();
        sphere.setTransform(RayCasterBuilder.getTranslationMatrix(0, 0, 1));

        // WHEN
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -5),
            new Vector(0, 0, 1)
        );
        const intersection: Intersection = RayCasterBuilder.createIntersection(5, sphere);
        const intersections: Intersections = new Intersections(intersection);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray, intersections);

        // THEN
        expect(comps.getUnderPoint().z > RAYCASTER_EPSILON / 2).toBeTruthy();
        expect(comps.getPoint().z < comps.getUnderPoint().z).toBeTruthy();
    });

    // the refracted color with an opaque surface
    it('the refracted color with an opaque surface', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const shape: Shape = world.getShapes()[0];
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -5),
            new Vector(0, 0, 1)
        );
        const intersection: Intersection = RayCasterBuilder.createIntersection(4, shape);
        const intersections: Intersections = new Intersections(intersection);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray, intersections);
        const c: Color = RayCasterArithmetic.refractedColor(world, comps, 5);

        // THEN
        expect(c.equals(new Color(0, 0, 0))).toBeTruthy();
    });

    // the refracted color at the maximum recursive depth
    it('the refracted color at the maximum recursive depth', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const shape: Shape = world.getShapes()[0];
        shape.getMaterial().setTransparency(1.0);
        shape.getMaterial().setRefractiveIndex(1.5);
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -5),
            new Vector(0, 0, 1)
        );
        const intersection: Intersection = RayCasterBuilder.createIntersection(4, shape);
        const intersections: Intersections = new Intersections(intersection);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray, intersections);
        const c: Color = RayCasterArithmetic.refractedColor(world, comps, 0);

        // THEN
        expect(c.equals(new Color(0, 0, 0))).toBeTruthy();
    });

    // the refracted color under total internal reflection
    it('the refracted color under total internal reflection', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const shape: Shape = world.getShapes()[0];
        shape.getMaterial().setTransparency(1.0);
        shape.getMaterial().setRefractiveIndex(1.5);
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, Math.sqrt(2) / 2),
            new Vector(0, 1, 0)
        );
        const intersectionA: Intersection = RayCasterBuilder.createIntersection(-Math.sqrt(2) / 2, shape);
        const intersectionB: Intersection = RayCasterBuilder.createIntersection(Math.sqrt(2) / 2, shape);
        const intersections: Intersections = new Intersections(intersectionA, intersectionB);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersectionB, ray, intersections);
        const c: Color = RayCasterArithmetic.refractedColor(world, comps, 5);

        // THEN
        expect(c.equals(new Color(0, 0, 0))).toBeTruthy();
    });

    // the refracted color with a refracted ray
    it('the refracted color with a refracted ray', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const a: Shape = world.getShapes()[0];
        a.getMaterial().pattern = RayCasterBuilder.createTestPattern();
        a.getMaterial().setAmbient(1.0);

        const b: Shape = world.getShapes()[1];
        b.getMaterial().setTransparency(1.0);
        b.getMaterial().setRefractiveIndex(1.5);

        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, 0.1),
            new Vector(0, 1, 0)
        );
        const intersectionA: Intersection = RayCasterBuilder.createIntersection(-0.9899, a);
        const intersectionB: Intersection = RayCasterBuilder.createIntersection(-0.4899, b);
        const intersectionC: Intersection = RayCasterBuilder.createIntersection(0.4899, b);
        const intersectionD: Intersection = RayCasterBuilder.createIntersection(0.9899, a);
        const intersections: Intersections = new Intersections(intersectionA, intersectionB, intersectionC, intersectionD);

        const comps: Computations = RayCasterArithmetic.prepareComputations(intersectionC, ray, intersections);
        const c: Color = RayCasterArithmetic.refractedColor(world, comps, 5);

        // THEN
        expect(c.equals(new Color(0, 0.99888, 0.04725))).toBeTruthy();
    });

    // shade_hit with a transparent material
    it('shade_hit with a transparent material', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const floor: Shape = RayCasterBuilder.createPlane();
        floor.setTransform(RayCasterBuilder.getTranslationMatrix(0, -1, 0));
        floor.getMaterial().setTransparency(0.5);
        floor.getMaterial().setRefractiveIndex(1.5);

        const ball: Shape = RayCasterBuilder.createSphere();
        ball.getMaterial().setColor(new Color(1, 0, 0));
        ball.getMaterial().setAmbient(0.5);
        ball.setTransform(RayCasterBuilder.getTranslationMatrix(0, -3.5, -0.5));

        world.setShapes([floor, ball]);


        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, -3),
            new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
        );
        const intersection: Intersection = RayCasterBuilder.createIntersection(Math.sqrt(2), floor);
        const intersections: Intersections = new Intersections(intersection);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray, intersections);
        const color: Color = RayCasterArithmetic.shadeHit(world, comps, 5);

        // THEN
        // expect(color.equals(new Color(0.93642, 0.68642, 0.68642))).toBeTruthy();
    });

    // the schlick approximation under total internal reflection
    it('the schlick approximation under total internal reflection', () => {
        // GIVEN a world
        const shape: Shape = RayCasterBuilder.createGlassSphere();
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, Math.sqrt(2) / 2),
            new Vector(0, 1, 0)
        );
        const intersectionA: Intersection = RayCasterBuilder.createIntersection(-Math.sqrt(2) / 2, shape);
        const intersectionB: Intersection = RayCasterBuilder.createIntersection(Math.sqrt(2) / 2, shape);
        const intersections: Intersections = new Intersections(intersectionA, intersectionB);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersectionB, ray, intersections);
        const reflectance: number = RayCasterArithmetic.schlick(comps);

        // THEN
        expect(reflectance === 1.0).toBeTruthy();
    });

    // the schlick approximation with a perpendicular viewing angle
    it('the schlick approximation with a perpendicular viewing angle', () => {
        // GIVEN a world
        const shape: Shape = RayCasterBuilder.createGlassSphere();
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0, 0),
            new Vector(0, 1, 0)
        );
        const intersectionA: Intersection = RayCasterBuilder.createIntersection(-1, shape);
        const intersectionB: Intersection = RayCasterBuilder.createIntersection(1, shape);
        const intersections: Intersections = new Intersections(intersectionA, intersectionB);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersectionB, ray, intersections);
        const reflectance: number = RayCasterArithmetic.schlick(comps);

        // THEN
        expect(RayCasterArithmetic.numberEquals(reflectance, 0.04)).toBeTruthy();
    });

    // the schlick approximation with small angle and n2 > n1
    it('the schlick approximation with small angle and n2 > n1', () => {
        // GIVEN a world
        const shape: Shape = RayCasterBuilder.createGlassSphere();
        const ray: Ray = RayCasterBuilder.createRay(
            new Point(0, 0.99, -2),
            new Vector(0, 0, 1)
        );
        const intersectionA: Intersection = RayCasterBuilder.createIntersection(1.8589, shape);
        const intersections: Intersections = new Intersections(intersectionA);
        const comps: Computations = RayCasterArithmetic.prepareComputations(intersectionA, ray, intersections);
        const reflectance: number = RayCasterArithmetic.schlick(comps);

        // THEN
        expect(RayCasterArithmetic.numberEquals(reflectance, 0.48873)).toBeTruthy();
    });

    // shade_hit with a reflective, transparent material
    it('shade_hit with a reflective, transparent material', () => {
        // GIVEN a world
        const world: World = RayCasterBuilder.createDefaultWorld();
        const ray: Ray = RayCasterBuilder.createRay(new Point(0, 0, -3), new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2));
        const floor: Shape = RayCasterBuilder.createPlane();
        floor.setTransform(RayCasterBuilder.getTranslationMatrix(0, -1, 0));
        floor.getMaterial().setReflective(0.5);
        floor.getMaterial().setTransparency(0.5);
        floor.getMaterial().setRefractiveIndex(1.5);

        const ball: Shape = RayCasterBuilder.createSphere();
        ball.getMaterial().setColor(new Color(1, 0, 0));
        ball.getMaterial().setAmbient(0.5);
        ball.setTransform(RayCasterBuilder.getTranslationMatrix(0, -3.5, -0.5));

        world.setShapes([floor, ball]);

        const intersection: Intersection = RayCasterBuilder.createIntersection(Math.sqrt(2), floor);
        const intersections: Intersections = new Intersections(intersection);

        const comps: Computations = RayCasterArithmetic.prepareComputations(intersection, ray, intersections);
        const color: Color = RayCasterArithmetic.shadeHit(world, comps, 5);

        // THEN
        // expect(color.equals(new Color(0.93391, 0.69643, 0.69243))).toBeTruthy();

    });

});
