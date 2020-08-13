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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetrackingEntryDeleteFailed = exports.TimetrackingEntryPutFailed = exports.TimetrackingEntryCreateFailed = exports.TimetrackingEntriesFetchFailed = exports.TimetrackingStaffListFetchFailed = exports.TimetrackingReportFetchFailed = exports.Timetracking = void 0;
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Timetracking = /** @class */ (function (_super) {
    __extends(Timetracking, _super);
    function Timetracking(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Timetracking.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Timetracking.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Timetracking.prototype.get = function (staffId, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/reports/staff/" + staffId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new TimetrackingReportFetchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new TimetrackingReportFetchFailed(undefined, { error: error_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Timetracking.prototype.getEntries = function (staffId, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/entries/staff/" + staffId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new TimetrackingEntriesFetchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new TimetrackingEntriesFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Timetracking.prototype.createEntry = function (entry) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/entries");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, entry)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new TimetrackingEntryCreateFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new TimetrackingEntryCreateFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Timetracking.prototype.updateEntry = function (entryId, data) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/entries/" + entryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, data)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new TimetrackingEntryPutFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new TimetrackingEntryPutFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Timetracking.prototype.deleteEntry = function (entryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/entries/" + entryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new TimetrackingEntryDeleteFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({ msg: response.data.msg })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new TimetrackingEntryDeleteFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Timetracking.prototype.getStaffList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/staff");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new TimetrackingStaffListFetchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new TimetrackingStaffListFetchFailed(undefined, { error: error_6 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Timetracking.baseEndpoint = '/api/v0/time_tracking';
    return Timetracking;
}(base_1.ThBaseHandler));
exports.Timetracking = Timetracking;
var TimetrackingReportFetchFailed = /** @class */ (function (_super) {
    __extends(TimetrackingReportFetchFailed, _super);
    function TimetrackingReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the timetracking report for the staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingReportFetchFailed';
        Object.setPrototypeOf(_this, TimetrackingReportFetchFailed.prototype);
        return _this;
    }
    return TimetrackingReportFetchFailed;
}(errors_1.BaseError));
exports.TimetrackingReportFetchFailed = TimetrackingReportFetchFailed;
var TimetrackingStaffListFetchFailed = /** @class */ (function (_super) {
    __extends(TimetrackingStaffListFetchFailed, _super);
    function TimetrackingStaffListFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the list of staff with timetracking entries'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingStaffListFetchFailed';
        Object.setPrototypeOf(_this, TimetrackingStaffListFetchFailed.prototype);
        return _this;
    }
    return TimetrackingStaffListFetchFailed;
}(errors_1.BaseError));
exports.TimetrackingStaffListFetchFailed = TimetrackingStaffListFetchFailed;
var TimetrackingEntriesFetchFailed = /** @class */ (function (_super) {
    __extends(TimetrackingEntriesFetchFailed, _super);
    function TimetrackingEntriesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the timetracking entries for the staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntriesFetchFailed';
        Object.setPrototypeOf(_this, TimetrackingEntriesFetchFailed.prototype);
        return _this;
    }
    return TimetrackingEntriesFetchFailed;
}(errors_1.BaseError));
exports.TimetrackingEntriesFetchFailed = TimetrackingEntriesFetchFailed;
var TimetrackingEntryCreateFailed = /** @class */ (function (_super) {
    __extends(TimetrackingEntryCreateFailed, _super);
    function TimetrackingEntryCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could have not create the timetracking entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntryCreateFailed';
        Object.setPrototypeOf(_this, TimetrackingEntryCreateFailed.prototype);
        return _this;
    }
    return TimetrackingEntryCreateFailed;
}(errors_1.BaseError));
exports.TimetrackingEntryCreateFailed = TimetrackingEntryCreateFailed;
var TimetrackingEntryPutFailed = /** @class */ (function (_super) {
    __extends(TimetrackingEntryPutFailed, _super);
    function TimetrackingEntryPutFailed(message, properties) {
        if (message === void 0) { message = 'Could have not update the timetracking entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntryPutFailed';
        Object.setPrototypeOf(_this, TimetrackingEntryPutFailed.prototype);
        return _this;
    }
    return TimetrackingEntryPutFailed;
}(errors_1.BaseError));
exports.TimetrackingEntryPutFailed = TimetrackingEntryPutFailed;
var TimetrackingEntryDeleteFailed = /** @class */ (function (_super) {
    __extends(TimetrackingEntryDeleteFailed, _super);
    function TimetrackingEntryDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could have not delete the timetracking entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TimetrackingEntryDeleteFailed';
        Object.setPrototypeOf(_this, TimetrackingEntryDeleteFailed.prototype);
        return _this;
    }
    return TimetrackingEntryDeleteFailed;
}(errors_1.BaseError));
exports.TimetrackingEntryDeleteFailed = TimetrackingEntryDeleteFailed;
//# sourceMappingURL=timetracking.js.map