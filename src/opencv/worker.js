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

let faceCascade;
function detectFaces(imageData) {
  const img = cv.matFromImageData(imageData);
	const imgGray = new cv.Mat();
  cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY, 0);
  const faces = new cv.RectVector();
  if (!faceCascade) {
    faceCascade = new cv.CascadeClassifier();
    faceCascade.load('haarcascade_frontalface_default.xml');
  }
	faceCascade.detectMultiScale(imgGray, faces);

	const rects = [];
	for (let i = 0; i < faces.size(); i += 1) {
		rects.push(faces.get(i));
	}

	postMessage({ type: 'detectFaces', faces: rects });

	img.delete();
	faces.delete();
	imgGray.delete();
}