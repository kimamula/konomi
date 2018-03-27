"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gl = require('deeplearn-gl');
var DeeplearnModel_1 = require("../src/DeeplearnModel");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var sharp_1 = tslib_1.__importDefault(require("sharp"));
var node_checkpoint_loader_1 = require("./node-checkpoint-loader");
DeeplearnModel_1.DeeplearnModel.getInstance(new node_checkpoint_loader_1.NodeCheckpointLoader('./data/dl-manifest'))
    .then(function (deeplearnModel) { return ['_', 'error', 'like'].forEach(function (category, i) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, predict(deeplearnModel, category, i)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); }); });
function predict(deeplearnModel, category, categoryIndex) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        var pathToDir;
        return tslib_1.__generator(this, function (_a) {
            pathToDir = path_1.default.resolve(__dirname, '../data/images_png', category);
            return [2 /*return*/, new Promise(function (resolve, reject) { return fs_1.default.readdir(pathToDir, function (err, files) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var total, correct, _i, files_1, file, buffer, scores;
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
                                if (!(_i < files_1.length)) return [3 /*break*/, 5];
                                file = files_1[_i];
                                return [4 /*yield*/, sharp_1.default(path_1.default.resolve(pathToDir, file)).resize(224, 224).raw().toBuffer()];
                            case 2:
                                buffer = _a.sent();
                                return [4 /*yield*/, deeplearnModel
                                        .predict({ data: new Uint8ClampedArray(buffer.buffer), width: 224, height: 224 })
                                        .catch(function (err) { return console.error(err) || [0, 0, 0]; })];
                            case 3:
                                scores = _a.sent();
                                if (scores[categoryIndex] > scores[(categoryIndex + 1) % 3] && scores[categoryIndex] > scores[(categoryIndex + 2) % 3]) {
                                    correct += 1;
                                }
                                total += 1;
                                console.log("Prediction result for " + category + ": " + correct + " correct, " + total + " total, " + (correct / total) * 100 + "%");
                                _a.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 1];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }); })];
        });
    });
}
