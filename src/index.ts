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
const buttons = document.querySelector('.buttons')!;
const play = document.querySelector('.play')!;
const pause = document.querySelector('.pause')!;

function orientationAPI(): Promise<{ lock(orientation: string): Promise<void>; unlock(): void; }> {
  return (typeof window.orientation !== 'undefined') && (screen as any).orientation && (screen as any).orientation.lock
    ? Promise.resolve((screen as any).orientation)
    : Promise.reject(null);
}

const manifestFilePath = `${location.pathname.startsWith('/konomi/') ? '/konomi' : '/dist'}/tfjs`;
navigator.mediaDevices.getUserMedia({ video: true })
  .then(() => Promise.all([
    navigator.mediaDevices.enumerateDevices()
      .then(devices => devices.filter(({ kind }) => kind === 'videoinput').map(({ deviceId }) => deviceId))
      .then(videoInputDevices => videoInputDevices.length === 0
        ? Promise.reject(new Error('No available video input devices'))
        : navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: videoInputDevices[0] } } })
          .then(mediaStream => ({ mediaStream, videoInputDevices }))
    ),
    TfjsModel.getInstance(manifestFilePath),
    getFaceDetector(),
  ]))
  .then(([mediaDevicesInfo, tfjsModel, detectFace]) => {
    const { mediaStream, videoInputDevices } = mediaDevicesInfo;
    message.classList.add('hidden');
    mainContents.classList.remove('hidden');

    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      const mediaStream = video.srcObject;
      const intervalFrames = 30;
      let framesSinceLastDetection = 0;
      let detectedFaces: { usedBoundingBox: Face['boundingBox']; imageData: ImageData; scoreStr: string; color: string; score: number; }[] = [];
      (async function renderLoop() {
        if (video.srcObject !== mediaStream) {
          return;
        }
        requestAnimationFrame(renderLoop);
        if (buttons.classList.contains('pausing')) {
          return;
        }
        framesSinceLastDetection += 1;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        if (framesSinceLastDetection >= intervalFrames) {
          framesSinceLastDetection = 0;
          if (Math.max.apply(null, detectedFaces.map(({ score }) => score)) >= 0.95) {
            confirm('結婚してください');
          }
          detectFacesImageData(canvas, detectFace)
            .then(facesImageData => Promise.all(facesImageData.map(calcScoreAndColor)))
            .then(_detectedFaces => detectedFaces = _detectedFaces)
            .catch(err => console.error(err));
        }
        markDetectedFace();
      })();

      function calcScoreAndColor(
        { usedBoundingBox, imageData }: { usedBoundingBox: Face['boundingBox']; imageData: ImageData; }
      ): Promise<{ usedBoundingBox: Face['boundingBox']; imageData: ImageData; scoreStr: string; color: string; score: number; }> {
        return tfjsModel
          .predict(imageData)
          .then(scores => {
            const score = Math.max(scores[likeIndex], 0);
            let hexadecimal = (score === 0 ? 255 : Math.floor((1 - score) * 256)).toString(16);
            hexadecimal = hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
            const color = `#ff${hexadecimal}00`;
            return { usedBoundingBox, imageData, scoreStr: (score * 100).toFixed(2), color, score };
          });
      }

      function markDetectedFace() {
        for (const { usedBoundingBox, scoreStr, color } of detectedFaces) {
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
          context.fillText(`${scoreStr} / 100`, x + width - 5, y + height - 5);
        }
      }
    };

    const videoInputDevicesLength = videoInputDevices.length;
    let currentDeviceIndex = 0;
    let handlingPlay = false;
    if (videoInputDevicesLength > 1) {
      let isFlipping = false;
      flipCamera.addEventListener('click', async e => {
        e.stopPropagation();
        if (isFlipping || handlingPlay || buttons.classList.contains('pausing')) {
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
    play.addEventListener('click', async e => {
      e.stopPropagation();
      if (handlingPlay) {
        return;
      }
      handlingPlay = true;
      await navigator.mediaDevices
        .getUserMedia({ video: { deviceId: { exact: videoInputDevices[currentDeviceIndex] } } })
        .then(
          mediaStream => video.srcObject = mediaStream,
          err => console.error(err)
        );
      buttons.classList.remove('pausing');
      handlingPlay = false;
    });
    pause.addEventListener('click', e => {
      e.stopPropagation();
      if (handlingPlay) {
        return;
      }
      (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      buttons.classList.add('pausing');
    });
  })
  .catch(e => {
    console.error(e);
    message.classList.add('error');
    message.classList.remove('hidden');
    mainContents.classList.add('hidden');
  });
