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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var errors = __importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var pricebooks_1 = require("./pricebooks");
var pricebook_entries_1 = require("./pricebook-entries");
var Products = /** @class */ (function (_super) {
    __extends(Products, _super);
    function Products(options, http) {
        var _this = _super.call(this, http, { endpoint: Products.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Products.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Products.prototype.create = function (product, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsCreateFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsCreateFailed(undefined, { error: error_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.getAll = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (options && options.uri) {
                            uri = options.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (options && options.query ? "?" + qs_1.default.stringify(options.query) : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsFetchFailed(undefined, { error: error_2 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.import = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response_2, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (options && options.uri) {
                            uri = options.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/import" + (options && options.query ? "?" + qs_1.default.stringify(options.query) : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _a.sent();
                        if (response_2.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsImportFailed(undefined, { status: response_2.status }))];
                        }
                        if (response_2.data.cursor && response_2.data.cursor.next) {
                            next = function () { return _this.import({ uri: response_2.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsImportFailed(undefined, { error: error_3 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.get = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductFetchFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.getDetails = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId + "/details";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductDetailsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductDetailsFetchFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.getChildrenDetails = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId + "/children/details";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductChildrenDetailsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductChildrenDetailsFetchFailed(undefined, { error: error_6 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new errors.ProductsMetaFailed('could not get product metadata unexpectedly', {
                                    status: response.status
                                }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsMetaFailed(undefined, { error: error_7 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.put = function (productId, product) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsUpdateFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_8 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsUpdateFailed(undefined, { error: error_8 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsCountFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_9 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsCountFailed(undefined, { error: error_9 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.delete = function (productId, deleteOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (deleteOptions) {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId + "?" + qs_1.default.stringify(deleteOptions);
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId;
                        }
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 2:
                        error_10 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsDeleteFailed(undefined, { error: error_10 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.search = function (searchTerm) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/search?q=" + searchTerm;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.ProductsSearchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_11 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsSearchFailed(undefined, { error: error_11 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.bookStock = function (requestOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + requestOptions.productId + "/stock/book";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, requestOptions.body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.ProductsBookStockFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsBookStockFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Products.prototype.pricebooks = function () {
        return new pricebooks_1.Pricebooks(this.options, this.http, this.uriHelper);
    };
    Products.prototype.pricebookEntries = function () {
        return new pricebook_entries_1.PricebookEntries(this.options, this.http, this.uriHelper);
    };
    Products.baseEndpoint = '/api/v1/products';
    return Products;
}(base_1.ThBaseHandler));
exports.Products = Products;
//# sourceMappingURL=products.js.map