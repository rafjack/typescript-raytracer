import {RayCasterBuilder} from '../src/lib/builder/raycaster.builder';
import {BLACK, WHITE} from "../src/lib/constants/raycaster.constants";
import {Pattern, StripePattern} from "../src/lib/feature/raycaster.pattern";
import {Color, Light, Material, Point} from "../src/lib/model/raycaster.model";
import {RayCasterArithmetic} from "../src/lib/math/raycaster.math";

describe('raycaster.pattern.spec', () => {

    it('creating a black and white stripe pattern', () => {
        // GIVEN, a stripe pattern
        const pattern: StripePattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.a).toEqual(WHITE);
        expect(pattern.b).toEqual(BLACK);

    });

    it('a stripe pattern is constant in y', () => {
        // GIVEN, a stripe pattern
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, -10))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 1, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 2, 0))).toEqual(WHITE);
    });

    it('a stripe pattern is constant in z', () => {
        // GIVEN, a stripe pattern
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, -10))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 0, 1))).toEqual(WHITE);
    });

    it('a stripe pattern alternates in x', () => {
        // GIVEN, a stripe pattern
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, -10))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0.9, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(1, 0, 0))).toEqual(BLACK);
        expect(pattern.colorAt(new Point(-0.1, 0, 0))).toEqual(BLACK);
        expect(pattern.colorAt(new Point(-1, 0, 0))).toEqual(BLACK);
        expect(pattern.colorAt(new Point(-1.1, 0, 0))).toEqual(WHITE);
    });

    // Ligthing with a pattern applied
    it('lighting with a pattern applied', () => {
        // GIVEN, a stripe pattern
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);

        const material = new Material()
        material.pattern = pattern;
        material.setAmbient(1);
        material.setDiffuse(0);
        material.setSpecular(0);

        // AND, a lighting with a pattern applied
        const eyeVector: Point = new Point(0, 0, -1);
        const normalVector: Point = new Point(0, 0, -1);
        const light: Light = RayCasterBuilder.createPointLight(new Point(0, 0, -10), WHITE);

        const c1: Color = RayCasterArithmetic.lighting(material, RayCasterBuilder.createSphere(), light, new Point(0.9, 0, 0), eyeVector, normalVector, false);
        const c2: Color = RayCasterArithmetic.lighting(material, RayCasterBuilder.createSphere(), light, new Point(1.1, 0, 0), eyeVector, normalVector, false);

        // THEN, the pattern is black and white
        expect(c1).toEqual(WHITE);
        expect(c2).toEqual(BLACK);
    });

    // Stripes with an object transformation
    it('pattern with an object transformation', () => {
        // GIVEN, a sphere
        const sphere = RayCasterBuilder.createSphere();
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);
        sphere.material.pattern = pattern;

        // WHEN, the sphere is scaled
        sphere.setTransform(RayCasterBuilder.getScalingMatrix(2, 2, 2));

        // THEN, the pattern is transformed
        const c = pattern.colorAtShape(sphere, new Point(1.5, 0, 0));
        expect(c).toEqual(WHITE);
    });

    // Stripes with a pattern transformation
    it('stripes with a pattern transformation', () => {
        // GIVEN, a sphere
        const sphere = RayCasterBuilder.createSphere();
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);
        sphere.material.pattern = pattern;

        // WHEN, the pattern is scaled
        pattern.setTransform(RayCasterBuilder.getScalingMatrix(2, 2, 2));

        // THEN, the pattern is transformed
        const c = pattern.colorAtShape(sphere, new Point(1.5, 0, 0));
        expect(c).toEqual(WHITE);
    });

    // Stripes with both an object and a pattern transformation
    it('stripes with both an object and a pattern transformation', () => {
        // GIVEN, a sphere
        const sphere = RayCasterBuilder.createSphere();
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);
        sphere.material.pattern = pattern;

        // WHEN, the sphere is scaled
        sphere.setTransform(RayCasterBuilder.getScalingMatrix(2, 2, 2));

        // AND, the pattern is translated
        pattern.setTransform(RayCasterBuilder.getTranslationMatrix(0.5, 0, 0));

        // THEN, the pattern is transformed
        const c = pattern.colorAtShape(sphere, new Point(2.5, 0, 0));
        expect(c).toEqual(WHITE);
    });

    // The default pattern transformation
    it('the default pattern transformation', () => {
        // GIVEN, a sphere
        const sphere = RayCasterBuilder.createSphere();
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);
        sphere.material.pattern = pattern;

        // THEN, the pattern transformation matrix is the identity
        expect(pattern.matrix.equals(RayCasterBuilder.createIdentityMatrix(4))).toBeTruthy();
    });

    // Assigning a transformation
    it('assigning a transformation', () => {
        // GIVEN, a sphere
        const sphere = RayCasterBuilder.createSphere();
        const pattern: Pattern = RayCasterBuilder.buildStripePattern(WHITE, BLACK);
        sphere.material.pattern = pattern;

        // WHEN, the pattern transformation matrix is set
        pattern.setTransform(RayCasterBuilder.getTranslationMatrix(1, 2, 3));

        // THEN, the pattern transformation matrix is set
        expect(pattern.matrix.equals(RayCasterBuilder.getTranslationMatrix(1, 2, 3))).toBeTruthy();
    });

    // A gradient linearly interpolates between colors
    it('a gradient linearly interpolates between colors', () => {
        // GIVEN, a gradient pattern
        const pattern: Pattern = RayCasterBuilder.createGradientPattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0.25, 0, 0))).toEqual(new Color(0.75, 0.75, 0.75));
        expect(pattern.colorAt(new Point(0.5, 0, 0))).toEqual(new Color(0.5, 0.5, 0.5));
        expect(pattern.colorAt(new Point(0.75, 0, 0))).toEqual(new Color(0.25, 0.25, 0.25));
    });

    // A ring should extend in both x and z
    it('a ring should extend in both x and z', () => {
        // GIVEN, a ring pattern
        const pattern: Pattern = RayCasterBuilder.createRingPattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(1, 0, 0))).toEqual(BLACK);
        expect(pattern.colorAt(new Point(0, 0, 1))).toEqual(BLACK);
        expect(pattern.colorAt(new Point(0.708, 0, 0.708))).toEqual(BLACK);
    });

    // Checkers should repeat in x
    it('checkers should repeat in x', () => {
        // GIVEN, a checkers pattern
        const pattern: Pattern = RayCasterBuilder.createCheckersPattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0.99, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(1.01, 0, 0))).toEqual(BLACK);
    });

    // Checkers should repeat in y
    it('checkers should repeat in y', () => {
        // GIVEN, a checkers pattern
        const pattern: Pattern = RayCasterBuilder.createCheckersPattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 0.99, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 1.01, 0))).toEqual(BLACK);
    });

    // Checkers should repeat in z
    it('checkers should repeat in z', () => {
        // GIVEN, a checkers pattern
        const pattern: Pattern = RayCasterBuilder.createCheckersPattern(WHITE, BLACK);

        // THEN, the pattern is black and white
        expect(pattern.colorAt(new Point(0, 0, 0))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 0, 0.99))).toEqual(WHITE);
        expect(pattern.colorAt(new Point(0, 0, 1.01))).toEqual(BLACK);
    });


});
