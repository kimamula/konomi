"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dl = tslib_1.__importStar(require("deeplearn"));
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var NodeCheckpointLoader = /** @class */ (function () {
    /**
     * NodeCheckpointLoader constructor
     * @param {string} checkpointFilePath should be either an absolute path or a relative path to the current working directory
     */
    function NodeCheckpointLoader(checkpointFilePath) {
        this.checkpointFilePath = checkpointFilePath;
        this.checkpointManifest = require(path_1.default.resolve(this.checkpointFilePath, 'manifest.json'));
    }
    NodeCheckpointLoader.prototype.getAllVariables = function () {
        var _this = this;
        if (this.variables) {
            return Promise.resolve(this.variables);
        }
        return Promise
            .all(Object.keys(this.checkpointManifest).map(function (varName) {
            return _this.getVariable(varName)
                .then(function (tensor) {
                return (_a = {}, _a[varName] = tensor, _a);
                var _a;
            });
        }))
            .then(function (variables) {
            _this.variables = Object.assign.apply(null, variables);
            return _this.variables;
        });
    };
    NodeCheckpointLoader.prototype.getVariable = function (varName) {
        var _this = this;
        if (!(varName in this.checkpointManifest)) {
            return Promise.reject(new Error("Cannot load non-existant variable " + varName));
        }
        var fileName = this.checkpointManifest[varName].filename;
        var filePath = path_1.default.resolve(this.checkpointFilePath, fileName);
        return new Promise(function (resolve, reject) { return fs_1.default.readFile(filePath, function (err, buffer) {
            if (err) {
                return reject(err);
            }
            var values = new Float32Array(buffer.buffer);
            resolve(dl.Tensor.make(_this.checkpointManifest[varName].shape, { values: values }));
        }); });
    };
    return NodeCheckpointLoader;
}());
exports.NodeCheckpointLoader = NodeCheckpointLoader;
