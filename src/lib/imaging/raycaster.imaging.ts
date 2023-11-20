import { RayCasterBuilder } from '../builder/raycaster.builder';
import { RayCasterArithmetic } from '../math/raycaster.math';
import {
  Camera,
  Canvas,
  Color,
  Point,
  Ray,
  Tuple,
  Vector,
  World,
} from '../model/raycaster.model';

export class RayCasterImager {
  static getPpmString(canvas: Canvas): string {
    return this.getPpmHeader(canvas) + '\n' + this.getPpmBody(canvas);
  }

  static getPpmHeader(canvas: Canvas): string {
    return `P3\n${canvas.w} ${canvas.h}\n255`;
  }

  static getPpmBody(canvas: Canvas): string {
    let result = '';
    // rows => y
    for (let y = 0; y < canvas.h; y++) {
      // columns => x
      let line = '';
      let singleLineLengthCounter = 0;
      for (let x = 0; x < canvas.w; x++) {
        const colorCodeRED = this.getRED(canvas.getPixel(x, y));

        if (singleLineLengthCounter + colorCodeRED.length > 70) {
          line = line.trim() + '\n';
          singleLineLengthCounter = 0;
        }
        line += colorCodeRED + ' ';
        singleLineLengthCounter += (colorCodeRED + ' ').length;

        const colorCodeGREEN = this.getGREEN(canvas.getPixel(x, y));
        if (singleLineLengthCounter + colorCodeGREEN.length > 70) {
          line = line.trim() + '\n';
          singleLineLengthCounter = 0;
        }
        line += colorCodeGREEN + ' ';
        singleLineLengthCounter += (colorCodeGREEN + ' ').length;

        const colorCodeBLUE = this.getBLUE(canvas.getPixel(x, y));
        if (singleLineLengthCounter + colorCodeBLUE.length > 70) {
          line = line.trim() + '\n';
          singleLineLengthCounter = 0;
        }
        line += colorCodeBLUE + ' ';
        singleLineLengthCounter += (colorCodeBLUE + ' ').length;
      }
      result += line.trim();
      result += '\n';
    }
    return result.trim() + '\n';
  }

  static getRED(color: Color): string {
    let red = 0;
    if (color) {
      red = Math.round(color.r * 255) > 255 ? 255 : Math.round(color.r * 255);
    }
    return `${red}`;
  }

  static getGREEN(color: Color): string {
    let green = 0;
    if (color) {
      green = Math.round(color.g * 255) > 255 ? 255 : Math.round(color.g * 255);
    }
    return `${green}`;
  }

  static getBLUE(color: Color): string {
    let blue = 0;
    if (color) {
      blue = Math.round(color.b * 255) > 255 ? 255 : Math.round(color.b * 255);
    }
    return `${blue}`;
  }

  static render(camera: Camera, world: World): Canvas {
    const image: Canvas = RayCasterBuilder.createCanvas(
      camera.getHSize(),
      camera.getVSize()
    );

    for (let y = 0; y < camera.getVSize(); y++) {
      for (let x = 0; x < camera.getHSize(); x++) {
        const ray: Ray = RayCasterArithmetic.rayForPixel(camera, x, y);
        const color: Color = RayCasterArithmetic.colorAt(world, ray);
        image.setPixel(color, x, y);
      }
    }

    return image;
  }

  static renderOnRawImageData(
    camera: Camera,
    world: World,
    rawImageData: Uint8ClampedArray
  ) {
    for (let y  = 0; y < camera.getVSize(); y++) {
      for (let x = 0; x < camera.getHSize(); x++) {
        const ray: Ray = RayCasterArithmetic.rayForPixel(camera, x, y);
        const color: Color = RayCasterArithmetic.colorAt(world, ray);
        this.drawPixel(camera.getVSize(), x, y, color, rawImageData);
      }
    }
  }

  static renderOnRawImageDataSector(
    camera: Camera,
    world: World,
    rawImageData: Uint8ClampedArray,
    from_x: number,
    to_x: number,
    from_y: number,
    to_y: number
  ) {
    for (let y: number = from_y; y < to_y; y++) {
      for (let x: number = from_x; x < to_x; x++) {
        const ray: Ray = RayCasterArithmetic.rayForPixel(camera, x, y);
        const color: Color = RayCasterArithmetic.colorAt(world, ray);
        this.drawPixel(camera.getVSize(), x, y, color, rawImageData);
      }
    }
  }

  static fillWithBlack(
    rawImageData: Uint8ClampedArray,
    width: number,
    height: number
  ) {
    for (let y = 0; y < height; y++) {
      // for each pixel in the row
      for (let x = 0; x < width; x++) {
        const index = 4 * (height * y + x);
        rawImageData[index + 0] = 30;
        rawImageData[index + 1] = 30;
        rawImageData[index + 2] = 30;
        rawImageData[index + 3] = 255;
      }
    }
  }

  static drawPixel(
    width: number,
    x: number,
    y: number,
    color: Color,
    rawImageData: Uint8ClampedArray
  ) {
    const index = 4 * (width * y + x);
    rawImageData[index + 0] = Math.round(color.r * 255);
    rawImageData[index + 1] = Math.round(color.g * 255);
    rawImageData[index + 2] = Math.round(color.b * 255);
    rawImageData[index + 3] = 255;
  }
}
