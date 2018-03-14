import { KerasModelWrapper, preprocess } from './keras';
import { detectFacesImageData } from './detectFaces';
import KerasJS from 'keras-js';

const enum InferState {
  TODO, PROCESSING, DONE
}

(async function () {
  const canvas = document.querySelector('canvas')!;
  const context = canvas.getContext('2d')!;
  const message = document.querySelector('.message')!;
  const progressMessage = document.querySelector('.progress')!;
  const mainContents = document.querySelector('.main-contents')!;
  const flipCamera = document.querySelector('.flip-camera')!;
  const forceLandscape = document.querySelector('.force-landscape')!;

  if ('FaceDetector' in window) {
    try {
      const filepath = location.pathname === '/konomi/' ? '/konomi/final.fine_tuned.bin' : '/dist/final.fine_tuned.bin';
      const model = new KerasJS.Model({ filepath, gpu: KerasJS.GPU_SUPPORT });
      model.events.on('loadingProgress', progress => progressMessage.textContent = `Loading ${progress}%`);
      model.events.on('initProgress', progress => progress >= 100
        ? message.classList.add('hidden') || mainContents.classList.remove('hidden')
        : progressMessage.textContent = `Initializing ${Math.floor(progress)}%`
      );
      const kerasModelWrapper = new KerasModelWrapper(model);
      const [mediaStream] = await Promise.all([
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }),
        kerasModelWrapper.ready()
      ]);

      const video = document.createElement('video');
      video.srcObject = mediaStream;
      video.autoplay = true;

      let state = InferState.TODO;
      let detectedFaces: (Face & { imageData: ImageData; })[] = [];
      let latestDrawnDetectedFaces: (Face & { imageData: ImageData; })[] = [];
      document.body.addEventListener('click', () => {
        if (video.paused) {
          if (state === InferState.DONE) {
            video.play();
          }
        } else {
          video.pause();
          state = InferState.TODO;
        }
      });
      flipCamera.addEventListener('click', e => {
        e.stopPropagation();
        const track = mediaStream.getVideoTracks()[0];
        const constraints = track.getConstraints();
        constraints.facingMode = constraints.facingMode === 'environment' ? 'user' : 'environment';
        track.applyConstraints(constraints);
      });
      const screenOrientation = screen['orientation'] as { lock(orientation: string): void; unlock(): void };
      if (typeof window.orientation !== 'undefined' && screenOrientation) {
        let isForceLandscape = false;
        forceLandscape.classList.remove('hidden');
        forceLandscape.addEventListener('click', e => {
          e.stopPropagation();
          isForceLandscape ? screenOrientation.unlock() : screenOrientation.lock('landscape');
          isForceLandscape = !isForceLandscape;
        });
      }
      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      (async function renderLoop() {
        requestAnimationFrame(renderLoop);
        if (video.paused) {
          if (state === InferState.TODO) {
            state = InferState.PROCESSING;
            for (const { boundingBox, imageData } of latestDrawnDetectedFaces) {
              const score = await kerasModelWrapper.predict(preprocess(imageData));
              const { x, y, width, height } = boundingBox;
              let hexadecimal = Math.floor((1 - score) * 256).toString(16);
              hexadecimal = hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
              const color = `#ff${hexadecimal}00`;
              const horizontalRatio = canvas.width / video.videoWidth;
              const verticalRatio = canvas.height / video.videoHeight;
              context.strokeStyle = color;
              context.fillStyle = color;
              context.font = '24px Mononoki';
              context.lineWidth = 5;
              context.beginPath();
              context.rect(x * horizontalRatio, y * verticalRatio, width * horizontalRatio, height * verticalRatio);
              context.stroke();
              context.fillText(`${(score * 100).toFixed(2)} / 100`, x * horizontalRatio + 5, y * verticalRatio + 29);
            }
            state = InferState.DONE;
          }
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
          detectedFaces.forEach(({ boundingBox }) => {
            const { x, y, width, height } = boundingBox;
            const color = '#ffeb3b';
            const horizontalRatio = canvas.width / video.videoWidth;
            const verticalRatio = canvas.height / video.videoHeight;
            context.strokeStyle = color;
            context.fillStyle = color;
            context.lineWidth = 5;
            context.beginPath();
            context.rect(x * horizontalRatio, y * verticalRatio, width * horizontalRatio, height * verticalRatio);
            context.stroke();
          });
          latestDrawnDetectedFaces = detectedFaces;
          detectedFaces = await detectFacesImageData(video).catch(err => console.error(err) || []);
        }
      })();
      return;
    } catch(e) {
      console.error(e);
      message.classList.add('error');
      message.classList.remove('hidden');
      mainContents.classList.add('hidden');
    }
  } else {
    message.classList.add('error');
  }
})();