import fs from 'fs';
import path from 'path';
import puppeteer, { Page } from 'puppeteer';

const originalSize = process.argv[2] && Number(process.argv[2]);
const headless = process.argv[3] === 'true';

puppeteer.launch({ headless }).then(async browser => {
  const page = await browser.newPage();
  await Promise.all(['_', 'error', 'like'].map(async (category, i) => predict(page, category, i)));
  return browser.close();
}).catch(e => console.error(e));

function predict(page: Page, category: string, categoryIndex: number): Promise<any> {
  const pathToDir = path.resolve(__dirname, '../dist/images_png', category);
  return new Promise((resolve, reject) => fs.readdir(pathToDir, async (err, files) => {
    if (err) {
      return reject(err);
    }
    let total = 0;
    let correct = 0;
    for (const file of files) {
      const src = `http://localhost:1234/dist/images_png/${category}/${file}`;
      if (!page.url().startsWith('http://localhost:1234')) {
        await page.goto(src);
        await page.addScriptTag({ url: 'http://localhost:1234/dist/predict.js' });
        await page.evaluate(
          manifestFilePath => (window['loadModel'] as Function)(manifestFilePath),
          'http://localhost:1234/dist/tfjs'
        );
      }
      const scores = await page.evaluate((src, originalSize) => (window['predict'] as Function)(src, originalSize), src, originalSize);
      if (scores[categoryIndex] > scores[(categoryIndex + 1) % 3] && scores[categoryIndex] > scores[(categoryIndex + 2) % 3]) {
        correct += 1;
      }
      total += 1;
      console.log(`Prediction result for ${category}: ${correct} correct, ${total} total, ${(correct / total) * 100}%`);
    }
    resolve();
  }));
}