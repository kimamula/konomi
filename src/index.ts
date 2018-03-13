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
  const flipCamera = document.querySelector('.flip-camera')!;

  if ('FaceDetector' in window) {
    try {
      const filepath = location.pathname === '/konomi/' ? '/konomi/final.fine_tuned.bin' : '/dist/final.fine_tuned.bin';
      const model = new KerasJS.Model({ filepath, gpu: KerasJS.GPU_SUPPORT });
      model.events.on('loadingProgress', progress => progressMessage.textContent = `Loading ${progress}%`);
      model.events.on('initProgress', progress => progress >= 100
        ? message.classList.add('hidden') || canvas.classList.remove('hidden')
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
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };

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
      if (mediaStream.constraint) {
        flipCamera.classList.remove('hidden');
        flipCamera.addEventListener('click', () => mediaStream.constraint.video.facingMode === 'environment'
          ? mediaStream.constraint.video.facingMode = 'user'
          : mediaStream.constraint.video.facingMode = 'environment'
        );
      }

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
              context.strokeStyle = color;
              context.fillStyle = color;
              context.font = '24px Mononoki';
              context.lineWidth = 5;
              context.beginPath();
              context.rect(x, y, width, height);
              context.stroke();
              context.fillText(`${(score * 100).toFixed(2)} / 100`, x + 5, y + 29);
            }
            state = InferState.DONE;
          }
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          detectedFaces.forEach(({ boundingBox }) => {
            const { x, y, width, height } = boundingBox;
            const color = '#ffeb3b';
            context.strokeStyle = color;
            context.fillStyle = color;
            context.lineWidth = 5;
            context.beginPath();
            context.rect(x, y, width, height);
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
      canvas.classList.add('hidden');
    }
  } else {
    message.classList.add('error');
  }
})();