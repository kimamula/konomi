import { EventEmitter } from 'events';

declare namespace KerasJS {

  interface ModelParams {
    filepath: string;
    headers?: any;
    filesystem?: boolean;
    gpu?: boolean;
    transferLayerOutputs?: boolean;
    pauseAfterLayerCalls?: boolean;
    visualizations?: string[];
  }
  const GPU_SUPPORT: boolean;
  class Model {
    constructor(params: ModelParams);
    inputLayerNames: string[];
    outputLayerNames: string[];
    events: EventEmitter;
    ready(): Promise<void>;
    predict(input: { [inputLayer: string]: any; }): Promise<{ [outputLayer: string]: any }>;
  }
}

declare module 'keras-js' {
  export = KerasJS;
}