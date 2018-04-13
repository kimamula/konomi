import { detectFacesImageData, getFaceDetector } from './detectFaces';
import { TfjsModel } from './TfjsModel';
import screenfull from 'screenfull';

const likeIndex = 1;

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;
const message = document.querySelector('.message')!;
const mainContents = document.querySelector('.main-contents')!;
const flipCamera = document.querySelector('.flip-camera')!;
const forceLandscape = document.querySelector('.force-landscape')!;
const video = document.querySelector('video')!;

function orientationAPI(): Promise<{ lock(orientation: string): Promise<void>; unlock(): void; }> {
  return (typeof window.orientation !== 'undefined') && (screen as any).orientation && (screen as any).orientation.lock
    ? Promise.resolve((screen as any).orientation)
    : Promise.reject(null);
}

const manifestFilePath = `${location.pathname.startsWith('/konomi/') ? '/konomi' : '/dist'}/tfjs`;
Promise
  .all([
    navigator.mediaDevices.enumerateDevices()
      .then(devices => devices.filter(({ kind }) => kind === 'videoinput').map(({ deviceId }) => deviceId))
      .then(videoInputDevices => videoInputDevices.length === 0
        ? Promise.reject(new Error('No available video input devices'))
        : navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: videoInputDevices[0] } } })
          .then(mediaStream => ({ mediaStream, videoInputDevices }))
    ),
    TfjsModel.getInstance(manifestFilePath),
    getFaceDetector(),
  ])
  .then(([mediaDevicesInfo, tfjsModel, detectFace]) => {
    const { mediaStream, videoInputDevices } = mediaDevicesInfo;
    message.classList.add('hidden');
    mainContents.classList.remove('hidden');

    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      const mediaStream = video.srcObject;
      const intervalFrames = 30;
      let framesSinceLastDetection = 0;
      let detectedFaces: { usedBoundingBox: Face['boundingBox']; imageData: ImageData; score: string; color: string; }[] = [];
      (async function renderLoop() {
        if (video.srcObject !== mediaStream) {
          return;
        }
        requestAnimationFrame(renderLoop);
        framesSinceLastDetection += 1;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        if (framesSinceLastDetection >= intervalFrames) {
          framesSinceLastDetection = 0;
          detectFacesImageData(canvas, detectFace)
            .then(facesImageData =>
              Promise.all(facesImageData.map(calcScoreAndColor))
            )
            .then(_detectedFaces => detectedFaces = _detectedFaces)
            .catch(err => console.error(err));
        }
        markDetectedFace();
      })();

      function calcScoreAndColor(
        { usedBoundingBox, imageData }: { usedBoundingBox: Face['boundingBox']; imageData: ImageData; }
      ): Promise<{ usedBoundingBox: Face['boundingBox']; imageData: ImageData; score: string; color: string; }> {
        return tfjsModel
          .predict(imageData)
          .then(scores => {
            const score = Math.max(scores[likeIndex], 0);
            let hexadecimal = (score === 0 ? 255 : Math.floor((1 - score) * 256)).toString(16);
            hexadecimal = hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
            const color = `#ff${hexadecimal}00`;
            return { usedBoundingBox, imageData, score: (score * 100).toFixed(2), color };
          });
      }

      function markDetectedFace() {
        for (const { usedBoundingBox, score, color } of detectedFaces) {
          const { x, y, width, height } = usedBoundingBox;
          context.strokeStyle = color;
          context.fillStyle = color;
          context.font = '24px Mononoki';
          context.lineWidth = 5;
          context.beginPath();
          context.rect(x, y, width, height);
          context.stroke();
          context.textAlign = 'right';
          context.textBaseline = 'bottom';
          context.fillText(`${score} / 100`, x + width - 5, y + height - 5);
        }
      }
    };

    const videoInputDevicesLength = videoInputDevices.length;
    if (videoInputDevicesLength > 1) {
      let isFlipping = false;
      let currentDeviceIndex = 0;
      flipCamera.addEventListener('click', async e => {
        e.stopPropagation();
        if (isFlipping) {
          return;
        }
        isFlipping = true;
        (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        currentDeviceIndex = (currentDeviceIndex + 1) % videoInputDevicesLength;
        await navigator.mediaDevices
          .getUserMedia({ video: { deviceId: { exact: videoInputDevices[currentDeviceIndex] } } })
          .then(
            mediaStream => video.srcObject = mediaStream,
            err => console.error(err)
          );
        isFlipping = false;
      });
    } else {
      flipCamera.classList.add('hidden');
    }
    orientationAPI()
      .then<any>(
      api => screenfull.enabled ? forceLandscape.addEventListener('click', e => {
        e.stopPropagation();
        if (screenfull.isFullscreen) {
          screenfull.exit();
          api.unlock();
        } else {
          screenfull.request(mainContents);
          api.lock('landscape').catch(err => console.error(err));
        }
      }) : Promise.reject(null))
      .catch(() => forceLandscape.classList.add('hidden'));
  })
  .catch(e => {
    console.error(e);
    message.classList.add('error');
    message.classList.remove('hidden');
    mainContents.classList.add('hidden');
  });
