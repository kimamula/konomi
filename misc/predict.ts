import { TfjsModel } from '../src/TfjsModel';
import { detectFacesImageData } from '../src/detectFaces';

async function loadModel(manifestFilePath: string): Promise<void> {
  window['tfjsModel'] = await TfjsModel.getInstance(manifestFilePath);
}

async function predict(src?: string): Promise<number[]> {
  const tfjsModel = window['tfjsModel'] as TfjsModel;
  let img = document.querySelector('img')!;
  if (src && img.src !== src) {
    img.remove();
    img = document.createElement('img');
    document.body.appendChild(img);
    img.src = src;
  }
  const imageData = img.complete
    ? getImageData(img)
    : await new Promise<ImageData>(resolve => img.onload = () => resolve(getImageData(img)));
  return tfjsModel.predict(imageData);
}

async function detectAndPredict(src?: string): Promise<number[][]> {
  const tfjsModel = window['tfjsModel'] as TfjsModel;
  let img = document.querySelector('img')!;
  if (src && img.src !== src) {
    img.remove();
    img = document.createElement('img');
    document.body.appendChild(img);
    img.src = src;
  }
  const imageDataList = (img.complete
    ? detectFacesImageData(img)
    : new Promise<ReturnType<typeof detectFacesImageData>>(resolve => img.onload = () => resolve(detectFacesImageData(img)))
  ).then(faces => faces.map(({ imageData }) => imageData));
  return Promise.all(imageDataList.map(imageData => tfjsModel.predict(imageData)));
}

function getImageData(img: HTMLImageElement): ImageData {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 224;
  canvas.height = 224;
  console.log(img.width, img.height);
  ctx.drawImage(img, 0,0, img.width, img.height, 0, 0, 224, 224);
  return ctx.getImageData(0, 0, 224, 224);
}

window['loadModel'] = loadModel;
window['predict'] = predict;
window['detectAndPredict'] = detectAndPredict;