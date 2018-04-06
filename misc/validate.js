"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
var headless = process.argv[2] !== 'false';
puppeteer_1.default.launch({ headless: headless }).then(function (browser) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var page;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.newPage()];
            case 1:
                page = _a.sent();
                return [4 /*yield*/, Promise.all(['_', 'error', 'like'].map(function (category, i) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, predict(page, category, i)];
                    }); }); }))];
            case 2:
                _a.sent();
                return [2 /*return*/, browser.close()];
        }
    });
}); }).catch(function (e) { return console.error(e); });
function predict(page, category, categoryIndex) {
    var _this = this;
    var pathToDir = path_1.default.resolve(__dirname, '../data/images_png', category);
    return new Promise(function (resolve, reject) { return fs_1.default.readdir(pathToDir, function (err, files) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var total, correct, _i, files_1, file, src, scores;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        return [2 /*return*/, reject(err)];
                    }
                    total = 0;
                    correct = 0;
                    _i = 0, files_1 = files;
                    _a.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 7];
                    file = files_1[_i];
                    src = "file://" + path_1.default.resolve(pathToDir, file);
                    return [4 /*yield*/, page.goto(src)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.addScriptTag({ url: "file://" + path_1.default.resolve(__dirname, 'predict.js') })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function (manifestFilePath) { return window['loadModel'](manifestFilePath); }, "http://localhost:1234/dist/tfjs")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function (src) { return window['predict'](src); }, src)];
                case 5:
                    scores = _a.sent();
                    console.log(scores);
                    if (scores[categoryIndex] > scores[(categoryIndex + 1) % 3] && scores[categoryIndex] > scores[(categoryIndex + 2) % 3]) {
                        correct += 1;
                    }
                    total += 1;
                    console.log("Prediction result for " + category + ": " + correct + " correct, " + total + " total, " + (correct / total) * 100 + "%");
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); }); });
}
