import fs from 'fs';
import path from 'path';
import puppeteer, { Page } from 'puppeteer';

const headless = process.argv[2] === 'true';
const categories = ['_', 'like'];

puppeteer.launch({ headless }).then(async browser => {
  const page = await browser.newPage();
  await Promise.all(categories.map(async (category, i) => predict(page, category, i)));
  return browser.close();
}).catch(e => console.error(e));

function predict(page: Page, category: string, categoryIndex: number): Promise<any> {
  const pathToDir = path.resolve(__dirname, '../dist/images_png_bin', category);
  return new Promise((resolve, reject) => fs.readdir(pathToDir, async (err, files) => {
    if (err) {
      return reject(err);
    }
    let total = 0;
    let correct = 0;
    let veryWrong = 0;
    let veryCorrect = 0;
    for (const file of files) {
      const src = `http://localhost:1234/dist/images_png_bin/${category}/${file}`;
      if (!page.url().startsWith('http://localhost:1234')) {
        await page.goto(src);
        await page.addScriptTag({ url: 'http://localhost:1234/dist/predict.js' });
        await page.evaluate(
          manifestFilePath => (window['loadModel'] as Function)(manifestFilePath),
          'http://localhost:1234/dist/tfjs'
        );
      }
      const scores = await page.evaluate((src) => (window['predict'] as Function)(src), src);
      if (scores[categoryIndex] > 0.5) {
        correct += 1;
        if (scores[categoryIndex] > 0.95) {
          veryCorrect += 1;
        }
      }
      if (scores[categoryIndex] <= 0.05) {
        veryWrong += 1;
      }
      total += 1;
      console.log(`Prediction result for ${category}: ${correct} correct, ${veryCorrect} veryCorrect, ${veryWrong} veryWrong, ${total} total, ${(correct / total) * 100}% correct, ${(veryCorrect / total) * 100}% veryCorrect, ${(veryWrong / total) * 100}% veryWrong`);
    }
    resolve();
  }));
}