import { detectFacesImageData } from './detectFaces';
import { DeeplearnModel } from './DeeplearnModel';
import { CheckpointLoader } from 'deeplearn';

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;
const message = document.querySelector('.message')!;
const mainContents = document.querySelector('.main-contents')!;
const flipCamera = document.querySelector('.flip-camera')!;
const forceLandscape = document.querySelector('.force-landscape')!;

function orientationAPI(): Promise<{ lock(orientation: string): Promise<void>; unlock(): void; }> {
  return (typeof window.orientation !== 'undefined') && (screen as any).orientation && (screen as any).orientation.lock
    ? Promise.resolve((screen as any).orientation)
    : Promise.reject(null);
}

if ('FaceDetector' in window) {
  const manifestFilePath = `${location.pathname === '/konomi/' ? '/konomi' : '/dist'}/dl-manifest`;
  Promise
    .all([
      navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(({ kind }) => kind === 'videoinput').map(({ deviceId }) => deviceId))
        .then(videoInputDevices => videoInputDevices.length === 0
          ? Promise.reject(new Error('No available video input devices'))
          : navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: videoInputDevices[0] } } })
            .then(mediaStream => ({ mediaStream, videoInputDevices }))
      ),
      DeeplearnModel.getInstance(new CheckpointLoader(manifestFilePath)),
    ])
    .then(([mediaDevicesInfo, deeplearnModel]) => {
      const { mediaStream, videoInputDevices } = mediaDevicesInfo;
      message.classList.add('hidden');
      mainContents.classList.remove('hidden');

      const video = document.createElement('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        const mediaStream = video.srcObject;
        const intervalFrames = 30;
        let framesSinceLastDetection = 0;
        let detectedFaces: { usedBoundingBox: Face['boundingBox']; score: string; color: string; }[] = [];
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
          if (framesSinceLastDetection < intervalFrames) {
            return;
          }
          framesSinceLastDetection = 0;
          detectFacesImageData(video)
            .then(facesImageData => Promise
              .all(facesImageData.map(({ usedBoundingBox, imageData }) => deeplearnModel
                .predict(imageData)
                .then(scores => {
                  const score = scores[2];
                  let hexadecimal = (score === 0 ? 255 : Math.floor((1 - score) * 256)).toString(16);
                  hexadecimal = hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
                  const color = `#ff${hexadecimal}00`;
                  return { usedBoundingBox, score: (score * 100).toFixed(2), color };
                })
              ))
              .then(faces => detectedFaces = faces)
            )
            .catch(err => console.error(err) || []);
        })();
      };

      const videoInputDevicesLength = videoInputDevices.length;
      if (videoInputDevicesLength > 1) {
        let isFlipping = false;
        let currentDeviceIndex = 0;
        flipCamera.addEventListener('click', async () => {
          if (isFlipping) {
            return;
          }
          isFlipping = true;
          video.srcObject!.getTracks().forEach(track => track.stop());
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
      orientationAPI().then(
        api => forceLandscape.addEventListener('click', () => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
            api.unlock();
          } else {
            mainContents.requestFullscreen();
            api.lock('landscape').catch(err => console.error(err));
          }
        }),
        () => forceLandscape.classList.add('hidden')
      );
    })
    .catch(e => {
      console.error(e);
      message.classList.add('error');
      message.classList.remove('hidden');
      mainContents.classList.add('hidden');
    });
} else {
  message.classList.add('error');
}
