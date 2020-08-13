"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPutFailed = exports.VideoCreationFailed = exports.Videos = void 0;
var qs_1 = __importDefault(require("qs"));
var errors_1 = require("../errors");
var Videos = /** @class */ (function () {
    function Videos(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/videos';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Videos.prototype.put = function (query, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + query.subsystem + "/" + query.prefix + qs_1.default.stringify({ ext: query.ext }, { addQueryPrefix: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http
                                .getClient()
                                .put(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new VideoPutFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Videos.prototype.create = function (query, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + query.subsystem + "/" + query.prefix + qs_1.default.stringify({ ext: query.ext }, { addQueryPrefix: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, payload, {
                                timeout: 60000,
                                headers: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new VideoCreationFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Videos;
}());
exports.Videos = Videos;
var VideoCreationFailed = /** @class */ (function (_super) {
    __extends(VideoCreationFailed, _super);
    function VideoCreationFailed(message) {
        if (message === void 0) { message = 'Could not create new video'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VideoCreationFailed';
        Object.setPrototypeOf(_this, VideoCreationFailed.prototype);
        return _this;
    }
    return VideoCreationFailed;
}(errors_1.BaseError));
exports.VideoCreationFailed = VideoCreationFailed;
var VideoPutFailed = /** @class */ (function (_super) {
    __extends(VideoPutFailed, _super);
    function VideoPutFailed(message) {
        if (message === void 0) { message = 'Could not update new video'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VideoPutFailed';
        Object.setPrototypeOf(_this, VideoPutFailed.prototype);
        return _this;
    }
    return VideoPutFailed;
}(errors_1.BaseError));
exports.VideoPutFailed = VideoPutFailed;
//# sourceMappingURL=videos.js.map