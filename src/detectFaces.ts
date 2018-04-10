export const captureSize = 224;

export async function detectFacesDataURL(
  element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, detectFace = detectFaceWithFaceDetector(), _writeFaceToCanvas = writeFaceToCanvas, _captureSize = captureSize
): Promise<string[]> {
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
      return detectFace(rotationCanvas)
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
      ? Promise.all(faces.map(face => _writeFaceToCanvas(rotationCanvas, face, _captureSize).canvas.toDataURL()))
      : []
    );
}

export async function detectFacesImageData(
  element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, detectFace = detectFaceWithFaceDetector(), _writeFaceToCanvas = writeFaceToCanvas, _captureSize = captureSize
): Promise<(Face & { imageData: ImageData; usedBoundingBox: Face['boundingBox']; })[]> {
  return detectFace(element)
    .then(faces => faces.map(face => {
      const { ctx, usedBoundingBox } = _writeFaceToCanvas(element, face, _captureSize);
      return { boundingBox: face.boundingBox, landmarks: face.landmarks, imageData: ctx.getImageData(0, 0, _captureSize, _captureSize), usedBoundingBox };
    }));
}

export function writeFaceToCanvas(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, { boundingBox, landmarks }: Face, captureSize: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; usedBoundingBox: Face['boundingBox']; } {
  let { x, y, width, height } = boundingBox;
  const [eye1, eye2] = landmarks.filter(({ type }) => type === 'eye');
  const [mouth] = landmarks.filter(({ type }) => type === 'mouth');
  // Sadly, FaceDetector implementation of Android Chrome currently does not equal to that of PC Chrome.
  // As machine learning is executed using images collected with FaceDetector of PC Chrome,
  // faces detected by Android Chrome have to be preprocessed here.
  // It is possible another FaceDetector implementation requires another preprocessing.
  if (width < height) {
    // Faces detected by FaceDetector of Android Chrome are vertically long rectangles and sometimes cover only small area of the original faces,
    // whereas those detected by FaceDetector of PC Chrome are squares and always cover enough area of the original faces.

    // 1. Simply adjust the height.
    y += (height - width) / 2;
    height = width;

    // 2. if the mouth goes out of the area, the area is too small, therefore x 1.6 both width and height
    if (mouth && mouth.location.y > y + height) {
      x -= 0.3 * width;
      y -= 0.3 * height;
      width = 1.6 * width;
      height = 1.6 * height;
    }
  } else if (width > height) {
    throw new Error('Unknown FaceDetector implementation');
  }
  const rotation = eye1 && eye2
    ? Math.atan((eye1.location.y - eye2.location.y) / (eye1.location.x - eye2.location.x))
    : 0;
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
  return { canvas, ctx, usedBoundingBox: { x, y, width, height } };
}

export type DetectFace = (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => Promise<Face[]>;

export function detectFaceWithFaceDetector(): DetectFace {
  return (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => new FaceDetector().detect(element);
}

export function getFaceDetector(): Promise<DetectFace> {
  if ('FaceDetector' in window) {
    return Promise.resolve(detectFaceWithFaceDetector());
  }
  return new Promise<DetectFace>((resolve, reject) => {
    const openCVWorker = new Worker('./opencv/worker.js');
    openCVWorker.onmessage = ({ data }) => {
      if (data.type === 'load') {
        return data.error ? reject(data.error) : resolve(detectFaceWithOpenCV(openCVWorker));
      }
    }
  });
}

function detectFaceWithOpenCV(openCVWorker: Worker): DetectFace {
  const queue: ((faces: Face[]) => any)[] = [];
  openCVWorker.onmessage = ({ data }) => {
    switch (data.type) {
      case 'detectFaces':
        const resolve = queue.shift();
        return resolve && resolve(data.faces.map(({ x, y, width, height }: Face['boundingBox']) => ({
          // adjust differences of face area detected by FaceDetector and OpenCV
          boundingBox: { x, y: y + height * 0.1, width, height },
          landmarks: [],
        })));
    }
  };
  return (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => {
    if (!(element instanceof HTMLCanvasElement)) {
      return Promise.reject(new Error('OpenCV implementation only accepts HTMLCanvasElement'));
    }
    const result = new Promise<Face[]>(resolve => queue.push(resolve));
    openCVWorker.postMessage({ type: 'detectFaces', img: element.getContext('2d')!.getImageData(0, 0, element.width, element.height) });
    return result;
  };
}