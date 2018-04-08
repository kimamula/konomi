export const captureSize = 224;

export async function detectFacesDataURL(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, _writeFaceToCanvas = writeFaceToCanvas, _captureSize = captureSize): Promise<string[]> {
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

export async function detectFacesImageData(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, _writeFaceToCanvas = writeFaceToCanvas, _captureSize = captureSize): Promise<(Face & { imageData: ImageData; usedBoundingBox: Face['boundingBox']; })[]> {
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

const detectFace: (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => Promise<Face[]> = 'FaceDetector' in window
  ? detectFaceWithFaceDetector()
  : detectFaceWithOpenCV();

function detectFaceWithFaceDetector(): (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => Promise<Face[]> {
  const fd = new FaceDetector();
  return (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => fd.detect(element);
}

/**
 * Call this function beforehand when you are trying to detect faces under environment which is not guaranteed to implement FaceDetector
 * @returns {Promise<void>}
 */
export async function prepareToDetectFaces(): Promise<void> {
  if ('FaceDetector' in window) {
    return;
  }
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', () => {
      const request = new XMLHttpRequest();
      const url = `${location.pathname.startsWith('/konomi/') ? '/konomi' : '/dist'}/opencv/haarcascade_frontalface_default.xml`;
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = new Uint8Array(request.response);
            window['cv'].FS_createDataFile('/', 'haarcascade_frontalface_default.xml', data, true, false, false);
            resolve();
          } else {
            reject(new Error(`Failed to load ${url}. status: ${request.status}`));
          }
        }
      };
      request.send();
    });
    script.addEventListener('error', ({ error }) => reject(error));
    script.src = `${location.pathname.startsWith('/konomi/') ? '/konomi' : '/dist'}/opencv/opencv.js`;
    const node = document.getElementsByTagName('script')[0];
    node!.parentNode!.insertBefore(script, node);
  });
}

function detectFaceWithOpenCV(): (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => Promise<Face[]> {
  const cache = new WeakMap<HTMLElement, any>();
  const capCache = new WeakMap<HTMLVideoElement, any>();
  let classifier: any;
  let faces: any;
  return async (element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => {
    const cv = window['cv'];
    let srcMat = cache.get(element);
    if (!srcMat) {
      if (element instanceof HTMLImageElement) {
        srcMat = cv.imread(element);
      } else if (element instanceof HTMLVideoElement) {
        if (!element.height || !element.width) {
          element.height = element.videoHeight;
          element.width = element.videoWidth;
        }
        srcMat = new cv.Mat(element.height, element.width, cv.CV_8UC4);
        capCache.set(element, new cv.VideoCapture(element));
      } else {
        srcMat = new cv.Mat(element.height, element.width, cv.CV_8UC4);
      }
      cache.set(element, srcMat);
    }
    if (element instanceof HTMLVideoElement) {
      capCache.get(element).read(srcMat);
    }
    if (!classifier) {
      classifier = new cv.CascadeClassifier();
      classifier.load('haarcascade_frontalface_default.xml');
    }
    if (!faces) {
      faces = new cv.RectVector();
    }
    classifier.detectMultiScale(srcMat, faces);
    const result: Face[] = [];
    for (let i = 0; i < faces.size(); ++i) {
      let { x, y, width, height } = faces.get(i) as Face['boundingBox'];
      // adjust differences of face area detected by FaceDetector and OpenCV
      y += height * 0.1;
      result.push({ boundingBox: { x, y, width, height }, landmarks: [] });
    }
    return result;
  };
}