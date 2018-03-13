import ndarray from 'ndarray';
import ops from 'ndarray-ops'
import { KerasJS } from './keras-js';

export function preprocess({ data, width, height }: ImageData): ArrayLike<number> {
  // data processing
  const dataTensor = ndarray(new Float32Array(data), [width, height, 4 /* raw data is RGBA */]);
  const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [width, height, 3 /* needs RGB */]);
  ops.divseq(dataTensor, 255); // make value range from 0 to 1
  // RGBA to RGB
  ops.assign(dataProcessedTensor.pick(null as any, null as any, 0), dataTensor.pick(null as any, null as any, 0));
  ops.assign(dataProcessedTensor.pick(null as any, null as any, 1), dataTensor.pick(null as any, null as any, 1));
  ops.assign(dataProcessedTensor.pick(null as any, null as any, 2), dataTensor.pick(null as any, null as any, 2));
  return dataProcessedTensor.data;
}

export class KerasModelWrapper {
  private _running = false;
  constructor(private kerasModel: KerasJS.Model) { }

  get running(): boolean {
    return this._running;
  }

  ready(): Promise<void> {
    return this.kerasModel.ready();
  }

  predict(input: ArrayLike<number>): Promise<number> {
    if (this._running) {
      return Promise.reject(new Error('already predicting'));
    }
    this._running = true;
    return this.kerasModel
      .predict({ [this.kerasModel.inputLayerNames[0]]: new Float32Array(input) })
      .then(
        result => {
          this._running = false;
          return result[this.kerasModel.outputLayerNames[0]][1];
        },
        err => {
          this._running = false;
          return Promise.reject(err);
        }
      );
  }
}