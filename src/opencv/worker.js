const basePath = `${location.pathname.startsWith('/konomi/') ? '/konomi' : '/dist'}/opencv/`;
importScripts(`${basePath}opencv.js`);

const request = new XMLHttpRequest();
const url = `${basePath}haarcascade_frontalface_default.xml`;
request.open('GET', url, true);
request.responseType = 'arraybuffer';
request.onload = function() {
  if (request.readyState === 4) {
    if (request.status === 200) {
      const data = new Uint8Array(request.response);
      cv.FS_createDataFile('/', 'haarcascade_frontalface_default.xml', data, true, false, false);
      faceClassifier = new cv.CascadeClassifier();
      faceClassifier.load('haarcascade_frontalface_default.xml');
      postMessage({ type: 'load' });
    } else {
      postMessage({ type: 'load', error: new Error(`Failed to load ${url}. status: ${request.status}`) });
    }
  }
};
request.send();

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'detectFaces':
      detectFaces(data.img);
      break;
  }
};

let faceClassifier;
function detectFaces(imageData) {
  const srcMat = cv.matFromImageData(imageData);
  const grayMat = new cv.Mat();
  srcMat.data.set(imageData.data);
  cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY, 0);
  const facesVect = new cv.RectVector();
  const facesMat = new cv.Mat();
  cv.pyrDown(grayMat, facesMat);
  faceClassifier.detectMultiScale(facesMat, facesVect);
	const rects = [];
	for (let i = 0; i < facesVect.size(); i += 1) {
	  const { x, y, width, height } = facesVect.get(i);
		rects.push({ x: x * 2, y: y * 2, width: width * 2, height: height * 2 });
	}

	postMessage({ type: 'detectFaces', faces: rects });

	srcMat.delete();
	grayMat.delete();
	facesVect.delete();
	facesMat.delete();
}