import * as tfc from '@tensorflow/tfjs-core';
import { loadFrozenModel, FrozenModel } from '@tensorflow/tfjs-converter';

const PREPROCESS_DIVISOR = tfc.scalar(255 / 2);

export class TfjsModel {
  static getInstance(path: string): Promise<TfjsModel> {
    return loadFrozenModel(`${path}/tensorflowjs_model.pb`, `${path}/weights_manifest.json`)
      .then(model => new TfjsModel(model));
  }

  private constructor(private model: FrozenModel) { }

  predict(imageData: ImageData): Promise<number[]> {
    const input = tfc.fromPixels(imageData).asType('float32').sub(PREPROCESS_DIVISOR).div(PREPROCESS_DIVISOR);
    const prediction = this.model.execute({ input }, 'final_result') as tfc.Tensor;
    return prediction.data().then(values => {
      prediction.dispose();
      return Array.from(values);
    });
  }
}