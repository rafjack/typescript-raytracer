import { RayCasterImager } from '../imaging/raycaster.imaging';
import { RayCasterBuilder } from '../builder/raycaster.builder';
import { RayCasterArithmetic } from '../math/raycaster.math';
import {
  Camera,
  Canvas,
  Color,
  Environment,
  Intersection,
  Intersections,
  Light,
  Material,
  Point,
  Projectile,
  Sphere,
  Tuple,
  Vector,
  World,
} from '../model/raycaster.model';
import { ImagingTestResults } from './raycaster.imaging.test.results';

describe('raycaster.imaging.spec', () => {
  it('create a ppm', () => {
    // GIVEN canvas
    const canvas: Canvas = RayCasterBuilder.createCanvas(5, 3);
    const ppmString: string = RayCasterImager.getPpmHeader(canvas);

    expect(ppmString).toEqual('P3\n5 3\n255');
  });

  it('create a canvas with colors and ppm', () => {
    // GIVEN canvas
    const canvas: Canvas = RayCasterBuilder.createCanvas(5, 3);
    const c1: Color = RayCasterBuilder.createColor(1.5, 0, 0);
    const c2: Color = RayCasterBuilder.createColor(0, 0.5, 0);
    const c3: Color = RayCasterBuilder.createColor(-0.5, 0, 1);

    canvas.setPixel(c1, 0, 0);
    canvas.setPixel(c2, 2, 1);
    canvas.setPixel(c3, 4, 2);

    const expectedPPMString =
      'P3\n5 3\n255\n255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 -127 0 255\n';

    const ppmString: string = RayCasterImager.getPpmString(canvas);

    expect(ppmString).toEqual(expectedPPMString);
  });

  it('expect PPM lines max length 70', () => {
    // GIVEN canvas
    const canvas: Canvas = RayCasterBuilder.createCanvas(10, 2);
    const c1: Color = RayCasterBuilder.createColor(1, 0.8, 0.6);

    canvas.fill(c1);

    const expectedPPMString =
      'P3\n10 2\n255\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n';
    ('');
    const ppmString: string = RayCasterImager.getPpmString(canvas);

    expect(ppmString).toEqual(expectedPPMString);
  });

  it('expect PPM ends with newline character', () => {
    // GIVEN canvas
    const canvas: Canvas = RayCasterBuilder.createCanvas(10, 2);
    const c1: Color = RayCasterBuilder.createColor(1, 0.8, 0.6);

    canvas.fill(c1);

    const expectedPPMString =
      'P3\n10 2\n255\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n';
    ('');
    const ppmString: string = RayCasterImager.getPpmString(canvas);

    expect(ppmString).toEqual(expectedPPMString);
  });

  it('trace trajectory on canvas', () => {
    const width = 40;
    const height = 40;
    const canvas: Canvas = RayCasterBuilder.createCanvas(width, height);
    const background: Color = RayCasterBuilder.createColor(0, 0, 0);
    canvas.fill(background);
    const c1: Color = RayCasterBuilder.createColor(1, 0.8, 0.6);

    let p: Projectile = new Projectile(
      new Point(0, 1, 0),
      RayCasterArithmetic.multiplyVector(
        RayCasterArithmetic.normalize(new Vector(1, 1.8, 0)),
        2.2 //
      )
    );

    const e: Environment = new Environment(
      new Vector(0, -0.1, 0),
      new Vector(-0.01, 0, 0)
    );

    const traceFunction = function () {
      //console.log('Projectile Position x/y: ' + p.position.x + '/' + p.position.y);
      //(height - 1)
      canvas.setPixel(
        c1,
        Math.round(p.position.x),
        height - 1 - Math.round(p.position.y)
      );
      p = RayCasterArithmetic.tick(e, p);
    };
    while (p.position.y > 0) {
      traceFunction();
    }

    const ppmString: string = RayCasterImager.getPpmString(canvas);
    const expectedString = ImagingTestResults.trajectoryPPM;
    expect(ppmString === expectedString).toBeTruthy();
  });

  /*
  it('trace clock face on canvas', () => {
    const width = 100;
    const height = 100;
    const canvas: Canvas = RayCasterBuilder.createCanvas(width, height);
    const background: Color = RayCasterBuilder.createColor(0, 0, 0);
    canvas.fill(background);
    const c1: Color = RayCasterBuilder.createColor(1, 0.8, 0.6);
    const radius = width / 5;
    const hourRotation = Math.PI / 6;

    let p: Point = RayCasterBuilder.createPoint(0, 1, 0);
    let radiusTranslator = RayCasterBuilder.getTranslationMatrix(0, radius, 0);
    let rotationTransformation =
      RayCasterBuilder.getRotationMatrixZ(hourRotation);

    p = RayCasterArithmetic.multiplyMatrixWithPoint(radiusTranslator, p);
    canvas.setPixel(
      c1,
      Math.round(width / 2 - p.x),
      Math.round(height / 2 - p.y)
    );

    for (let i = 0; i < 11; i++) {
      p = RayCasterArithmetic.multiplyMatrixWithPoint(
        rotationTransformation,
        p
      );
      canvas.setPixel(
        c1,
        Math.round(width / 2 - p.x),
        Math.round(height / 2 - p.y)
      );
    }

    const ppmString: string = RayCasterImager.getPpmString(canvas);
    const expectedString = ImagingTestResults.clockFacePPM;
    expect(ppmString === expectedString).toBeTruthy();
  });

  it('Ray caster draw sphere', () => {
    let ray_Origin = RayCasterBuilder.createPoint(0, 0, -5);
    const wall_z = 10;
    const wall_size = 7;
    const canvas_pixel = 100;
    const pixel_size = wall_size / canvas_pixel;
    const half = wall_size / 2;

    const canvas = RayCasterBuilder.createCanvas(canvas_pixel, canvas_pixel);
    const color = RayCasterBuilder.createColor(1, 0, 0);
    const sphere = RayCasterBuilder.createSphere();

    // for each row of pixels in the canvas
    for (let y = 0; y < canvas_pixel - 1; y++) {
      // compute the world y coordinate (top = +half, bottom = -half)
      const world_y = half - pixel_size * y;

      // for each pixel in the row
      for (let x = 0; x < canvas_pixel - 1; x++) {
        // compute the world x coordinate (left = -half, right = half)
        const world_x = -half + pixel_size * x;

        // descripe the poit on the wall that the will target
        let position = RayCasterBuilder.createPoint(world_x, world_y, wall_z);

        let ray = RayCasterBuilder.createRay(
          ray_Origin,
          RayCasterArithmetic.normalize(
            RayCasterArithmetic.substractPoints(position, ray_Origin)
          )
        );
        const intersections: Intersections = RayCasterArithmetic.intersections(
          sphere,
          ray
        );
        const intersectionResult: Intersection =
          RayCasterArithmetic.getHit(intersections);
        if (intersectionResult) {
          canvas.setPixel(color, x, y);
        }
      }
    }

    const ppmString: string = RayCasterImager.getPpmString(canvas);
    const expectedString = ImagingTestResults.circlePPM;
    expect(ppmString === expectedString).toBeTruthy();
  });

  it('Ray caster draw a shaded sphere', () => {
    let ray_Origin = RayCasterBuilder.createPoint(0, 0, -5);
    const wall_z = 10;
    const wall_size = 7;
    const canvas_pixel = 100;
    const pixel_size = wall_size / canvas_pixel;
    const half = wall_size / 2;

    const canvas = RayCasterBuilder.createCanvas(canvas_pixel, canvas_pixel);
    const sphere = RayCasterBuilder.createSphere();
    const m = sphere.getMaterial();
    m.setColor(RayCasterBuilder.createColor(1, 0.2, 1));
    sphere.setMaterial(m);

    // add a white light behind, above and to the left of the eye
    const lightPosition: Point = RayCasterBuilder.createPoint(-10, 10, -10);
    const lightColor: Color = RayCasterBuilder.createColor(1, 1, 1);
    const pointLight: Light = RayCasterBuilder.createPointLight(
      lightPosition,
      lightColor
    );

    // for each row of pixels in the canvas
    for (let y = 0; y < canvas_pixel - 1; y++) {
      // compute the world y coordinate (top = +half, bottom = -half)
      const world_y = half - pixel_size * y;

      // for each pixel in the row
      for (let x = 0; x < canvas_pixel - 1; x++) {
        // compute the world x coordinate (left = -half, right = half)
        const world_x = -half + pixel_size * x;

        // descripe the poit on the wall that the will target
        let position = RayCasterBuilder.createPoint(world_x, world_y, wall_z);

        let ray = RayCasterBuilder.createRay(
          ray_Origin,
          RayCasterArithmetic.normalize(
            RayCasterArithmetic.substractPoints(position, ray_Origin)
          )
        );
        const intersections: Intersections = RayCasterArithmetic.intersections(
          sphere,
          ray
        );
        const intersectionResult: Intersection =
          RayCasterArithmetic.getHit(intersections);

        if (intersectionResult) {
          // get point, normal and eyeV for lighting / shading calculation
          const point: Point = RayCasterArithmetic.getRayPosition(
            ray,
            intersectionResult.getT()
          );
          const normal: Vector = RayCasterArithmetic.normalAt(
            intersectionResult.getSceneObject() as Sphere,
            point
          );
          const eyeV = RayCasterArithmetic.multiplyVector(
            ray.getDirection(),
            -1
          );

          const color = RayCasterArithmetic.lighting(
            (intersectionResult.getSceneObject() as Sphere).getMaterial(),
            pointLight,
            point,
            eyeV,
            normal
          );
          canvas.setPixel(color, x, y);
        }
      }
    }

    const ppmString: string = RayCasterImager.getPpmString(canvas);
    const expectedString = ImagingTestResults.shadedSpherePPM;
    expect(ppmString === expectedString).toBeTruthy();
  });

  it('Rendering a world with a camera', () => {
    // GIVEN
    const world: World = RayCasterBuilder.createDefaultWorld();
    const camera: Camera = RayCasterBuilder.createCamera(11, 11, Math.PI / 2);
    const from: Point = RayCasterBuilder.createPoint(0, 0, -5);
    const to: Point = RayCasterBuilder.createPoint(0, 0, 0);
    const up: Vector = RayCasterBuilder.createVector(0, 1, 0);
    camera.setTranform(RayCasterArithmetic.viewTransform(from, to, up));
    // WHEN
    const image: Canvas = RayCasterImager.render(camera, world);

    // THEN
    expect(
      image.getPixel(5, 5).equals(new Color(0.38066, 0.47583, 0.2855))
    ).toBeTruthy();
  });

  it('Rendering a world with three spheres', () => {
    // the floor is a extremly flattened sphere with a matte texture
    const floor: Sphere = RayCasterBuilder.createSphere();
    floor.setMatrix(RayCasterBuilder.getScalingMatrix(10, 0.01, 10));
    const floorMaterial: Material = floor.getMaterial();
    floorMaterial.setColor(new Color(1, 0.9, 0.9));
    floorMaterial.setSpecular(0);
    floor.setMaterial(floorMaterial);

    // the left wall on the left has the same scale and color as the floor, but is also rotated and translated into place
    const leftWall: Sphere = RayCasterBuilder.createSphere();
    leftWall.setMatrix(
      RayCasterArithmetic.multiplyMatrix(
        RayCasterArithmetic.multiplyMatrix(
          RayCasterBuilder.getTranslationMatrix(0, 0, 5),
          RayCasterBuilder.getRotationMatrixY(-Math.PI / 4)
        ),
        RayCasterArithmetic.multiplyMatrix(
          RayCasterBuilder.getRotationMatrixX(Math.PI / 2),
          RayCasterBuilder.getScalingMatrix(10, 0.01, 10)
        )
      )
    );
    const leftWallMaterial: Material = floor.getMaterial();
    leftWallMaterial.setColor(new Color(1, 0.9, 0.9));
    leftWallMaterial.setSpecular(0);
    leftWall.setMaterial(leftWallMaterial);

    // the wall on the right is identical to the left wall but is rotated to the opposite direction in y
    const rightWall: Sphere = RayCasterBuilder.createSphere();
    rightWall.setMatrix(
      RayCasterArithmetic.multiplyMatrix(
        RayCasterArithmetic.multiplyMatrix(
          RayCasterBuilder.getTranslationMatrix(0, 0, 5),
          RayCasterBuilder.getRotationMatrixY(Math.PI / 4)
        ),
        RayCasterArithmetic.multiplyMatrix(
          RayCasterBuilder.getRotationMatrixX(Math.PI / 2),
          RayCasterBuilder.getScalingMatrix(10, 0.01, 10)
        )
      )
    );
    const rightWallMaterial: Material = floor.getMaterial();
    rightWallMaterial.setColor(new Color(1, 0.9, 0.9));
    rightWallMaterial.setSpecular(0);
    rightWall.setMaterial(rightWallMaterial);

    // The large sphere in the middle is a unit sphere translated upward slightly and colored green
    const middleSphere: Sphere = RayCasterBuilder.createSphere();
    middleSphere.setMatrix(RayCasterBuilder.getTranslationMatrix(-0.5, 1, 0.5));
    const middleSphereMaterial: Material = middleSphere.getMaterial();
    middleSphereMaterial.setColor(new Color(0.1, 1, 0.5));
    middleSphereMaterial.setDiffuse(0.7);
    middleSphereMaterial.setSpecular(0.3);
    middleSphere.setMaterial(middleSphereMaterial);

    // the smaller green sphere on the right is scaled half
    const rightSphere: Sphere = RayCasterBuilder.createSphere();
    rightSphere.setMatrix(
      RayCasterArithmetic.multiplyMatrix(
        RayCasterBuilder.getTranslationMatrix(1.5, 0.5, -0.5),
        RayCasterBuilder.getScalingMatrix(0.5, 0.5, 0.5)
      )
    );
    const rightSphereMaterial: Material = rightSphere.getMaterial();
    rightSphereMaterial.setColor(new Color(0.5, 1, 0.1));
    rightSphereMaterial.setDiffuse(0.7);
    rightSphereMaterial.setSpecular(0.3);
    rightSphere.setMaterial(rightSphereMaterial);

    // the smallest sphere is scaled by a third, before being translated.
    const leftSphere: Sphere = RayCasterBuilder.createSphere();
    leftSphere.setMatrix(
      RayCasterArithmetic.multiplyMatrix(
        RayCasterBuilder.getTranslationMatrix(-1.5, 0.33, -0.75),
        RayCasterBuilder.getScalingMatrix(0.33, 0.33, 0.33)
      )
    );
    const leftSphereMaterial: Material = leftSphere.getMaterial();
    leftSphereMaterial.setColor(new Color(1, 0.8, 0.1));
    leftSphereMaterial.setDiffuse(0.7);
    leftSphereMaterial.setSpecular(0.3);
    leftSphere.setMaterial(leftSphereMaterial);

    const world: World = RayCasterBuilder.createDefaultWorld();
    const lightSource: Light = RayCasterBuilder.createPointLight(
      new Point(-10, 10, -10),
      new Color(1, 1, 1)
    );
    world.setLightSource(lightSource);
    world.setWorldObjects([
      floor,
      leftWall,
      rightWall,
      leftSphere,
      middleSphere,
      rightSphere,
    ]);

    const camera: Camera = RayCasterBuilder.createCamera(100, 50, Math.PI / 3);
    camera.setTranform(
      RayCasterArithmetic.viewTransform(
        new Point(0, 1.5, -5),
        new Point(0, 1, 0),
        new Vector(0, 1, 0)
      )
    );

    // WHEN
    const image: Canvas = RayCasterImager.render(camera, world);
    const ppmString: string = RayCasterImager.getPpmString(image);
    console.log(ppmString);
  });
  */
});
