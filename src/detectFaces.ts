const captureSize = 224;

export function detectFacesDataURL(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<string[]> {
  const fd = new FaceDetector();
  const rotateUnit = 5 * Math.PI/180;
  const sizeAfterRotation = Math.pow(Math.pow(element.width, 2) + Math.pow(element.height, 2), 0.5);

  return Promise
    .all(Array.from(Array(19)).map((_, i) => {
      const rotation = Math.round(i / 2) * (i % 2 === 0 ? 1 : -1) * rotateUnit;
      const rotationCanvas = document.createElement('canvas');
      rotationCanvas.width = sizeAfterRotation;
      rotationCanvas.height = sizeAfterRotation;
      const ctx = rotationCanvas.getContext('2d')!;
      ctx.translate(sizeAfterRotation / 2, sizeAfterRotation / 2);
      ctx.rotate(rotation);
      ctx.drawImage(element, -element.width / 2, -element.height / 2);
      return fd.detect(rotationCanvas)
        .then(faces => ({
          rotationCanvas,
          faces: faces.filter(face => face.landmarks.filter(({ type }) => type === 'eye').length === 2)
        }));
    }))
    .then(facesAndCanvasList => facesAndCanvasList.reduce(
      (max, facesAndCanvas) => facesAndCanvas.faces.length > max.faces.length ? facesAndCanvas : max,
      { faces: [] } as { rotationCanvas?: HTMLCanvasElement; faces: Face[]; }
    ))
    .then(({ rotationCanvas, faces }) => rotationCanvas
      ? Promise.all(faces.map(face => writeFaceToCanvas(rotationCanvas, face).canvas.toDataURL()))
      : []
    );
}

export function detectFacesImageData(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<(Face & { imageData: ImageData; })[]> {
  const fd = new FaceDetector();

  return fd.detect(element)
    .then(faces => faces.map(face => {
      const { ctx } = writeFaceToCanvas(element, face);
      return { boundingBox: face.boundingBox, landmarks: face.landmarks, imageData: ctx.getImageData(0, 0, captureSize, captureSize) };
    }));
}

function writeFaceToCanvas(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, { boundingBox, landmarks }: Face): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; } {
  const { x, y, width, height } = boundingBox;
  if (width !== height) {
    throw new Error('FaceDetector unexpectedly detected a rectangle which is not a square');
  }
  const [eye1, eye2] = landmarks.filter(({ type }) => type === 'eye');
  const rotation = Math.atan((eye1.location.y - eye2.location.y) / (eye1.location.x - eye2.location.x));
  const ratio = Math.abs(Math.cos(rotation)) + Math.abs(Math.sin(rotation));
  const srcSize = width * ratio;
  const dstSize = captureSize * ratio;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = captureSize;
  canvas.height = captureSize;
  ctx.translate(captureSize / 2, captureSize / 2);
  ctx.rotate(-rotation);
  ctx.drawImage(element, x - (srcSize - width) / 2, y - (srcSize - height) / 2, srcSize, srcSize, -dstSize / 2, -dstSize / 2, dstSize, dstSize);
  return { canvas, ctx };
}