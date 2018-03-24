const gl = require('deeplearn-gl');
import { DeeplearnModel } from '../src/DeeplearnModel';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { NodeCheckpointLoader } from './node-checkpoint-loader';

DeeplearnModel.getInstance(new NodeCheckpointLoader('./data/dl-manifest') as any)
  .then(deeplearnModel => ['_', 'error', 'like'].forEach(async (category, i) => await predict(deeplearnModel, category, i)));

async function predict(deeplearnModel: DeeplearnModel, category: string, categoryIndex: number): Promise<any> {
  const pathToDir = path.resolve(__dirname, '../data/images_png', category);
  return new Promise((resolve, reject) => fs.readdir(pathToDir, async (err, files) => {
    if (err) {
      return reject(err);
    }
    let total = 0;
    let correct = 0;
    for (const file of files) {
      const buffer = await sharp(path.resolve(pathToDir, file)).resize(224, 224).raw().toBuffer();
      const scores = await deeplearnModel
        .predict({ data: new Uint8ClampedArray(buffer.buffer), width: 224, height: 224})
        .catch(err => console.error(err) || [0, 0, 0]);
      if (scores[categoryIndex] > scores[(categoryIndex + 1) % 3] && scores[categoryIndex] > scores[(categoryIndex + 2) % 3]) {
        correct += 1;
      }
      total += 1;
      console.log(`Prediction result for ${category}: ${correct} correct, ${total} total, ${(correct / total) * 100}%`);
    }
  }))
}