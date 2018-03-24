import * as dl from 'deeplearn';

const half255 = dl.scalar(127.5);
const one = dl.scalar(1);

export class DeeplearnModel {
  static getInstance(checkPointLoader: dl.CheckpointLoader, math = dl.ENV.math): Promise<DeeplearnModel> {
    return checkPointLoader.getAllVariables().then(variables => new DeeplearnModel(variables, math));
  }
  private constructor(private readonly variables: { [varName: string]: dl.Tensor; }, private readonly math: dl.NDArrayMath) { }

  predict(imageData: ImageData): Promise<number[]> {
    return dl.tidy(() => {
      const input = this.preprocess(imageData);
      const x1 = this.convBlock(input, 2);
      const x2 = this.depthwiseConvBlock(x1, 1, 1);

      const x3 = this.depthwiseConvBlock(x2, 2, 2);
      const x4 = this.depthwiseConvBlock(x3, 1, 3);

      const x5 = this.depthwiseConvBlock(x4, 2, 4);
      const x6 = this.depthwiseConvBlock(x5, 1, 5);

      const x7 = this.depthwiseConvBlock(x6, 2, 6);
      const x8 = this.depthwiseConvBlock(x7, 1, 7);
      const x9 = this.depthwiseConvBlock(x8, 1, 8);
      const x10 = this.depthwiseConvBlock(x9, 1, 9);
      const x11 = this.depthwiseConvBlock(x10, 1, 10);
      const x12 = this.depthwiseConvBlock(x11, 1, 11);

      const x13 = this.depthwiseConvBlock(x12, 2, 12);
      const x14 = this.depthwiseConvBlock(x13, 1, 13);
      const x15 = x14.avgPool(7, 2, 'valid');
      const x16Filter = this.variables['MobilenetV1/Logits/Conv2d_1c_1x1/weights'] as dl.Tensor4D;
      const x16Bias = this.variables['MobilenetV1/Logits/Conv2d_1c_1x1/biases'] as dl.Tensor1D;
      const x16 = x15.conv2d(x16Filter, 1, 'same').add(x16Bias);
      const x17Weight = this.variables['final_training_ops/weights/final_weights'] as dl.Tensor2D;
      const x17Bias = this.variables['final_training_ops/biases/final_biases'] as dl.Tensor1D;
      return dl.softmax(this.math.add(this.math.vectorTimesMatrix(x16.as1D(), x17Weight), x17Bias));
    }).getValuesAsync().then(values => Array.from(values));
  }

  private preprocess({ data, width, height }: ImageData): dl.Tensor3D {
    const rgbaTensor = dl.Tensor.make([width, height, 4], { values: new Float32Array(data) }) as dl.Tensor3D;
    const rgbTensor = dl.slice3d(rgbaTensor, [0, 0, 0], [width, height, 3]);
    // make value range from -1 to 1
    return rgbTensor.div(half255).sub(one);
  }

  private convBlock(inputs: dl.Tensor3D, stride: number) {
    const convPadding = 'MobilenetV1/Conv2d_0';

    const x1 = inputs.conv2d(this.variables[convPadding + '/weights'] as dl.Tensor4D, stride, 'same');
    const x2 = x1.batchNormalization(
        this.variables[convPadding + '/BatchNorm/moving_mean'] as dl.Tensor1D,
        this.variables[convPadding + '/BatchNorm/moving_variance'] as dl.Tensor1D,
        .001,
        this.variables[convPadding + '/BatchNorm/gamma'] as dl.Tensor1D,
        this.variables[convPadding + '/BatchNorm/beta'] as dl.Tensor1D
    );
    return x2.clipByValue(0, 6);  // simple implementation of Relu6
  }

  private depthwiseConvBlock(inputs: dl.Tensor3D, stride: number, blockID: number) {
    const dwPadding = 'MobilenetV1/Conv2d_' + String(blockID) + '_depthwise';
    const pwPadding = 'MobilenetV1/Conv2d_' + String(blockID) + '_pointwise';

    const x1 = inputs.depthwiseConv2D(
      this.variables[dwPadding + '/depthwise_weights'] as dl.Tensor4D,
      stride,
      'same'
    ) as dl.Tensor3D;

    const x2 = x1.batchNormalization(
        this.variables[dwPadding + '/BatchNorm/moving_mean'] as dl.Tensor1D,
        this.variables[dwPadding + '/BatchNorm/moving_variance'] as dl.Tensor1D,
        .001, this.variables[dwPadding + '/BatchNorm/gamma'] as dl.Tensor1D,
        this.variables[dwPadding + '/BatchNorm/beta'] as dl.Tensor1D
    );

    const x3 = x2.clipByValue(0, 6);

    const x4 = x3.conv2d(this.variables[pwPadding + '/weights'] as dl.Tensor4D, [1, 1], 'same');

    const x5 = x4.batchNormalization(
        this.variables[pwPadding + '/BatchNorm/moving_mean'] as dl.Tensor1D,
        this.variables[pwPadding + '/BatchNorm/moving_variance'] as dl.Tensor1D,
        .001, this.variables[pwPadding + '/BatchNorm/gamma'] as dl.Tensor1D,
        this.variables[pwPadding + '/BatchNorm/beta'] as dl.Tensor1D
    );

    return x5.clipByValue(0, 6);
  }
}
