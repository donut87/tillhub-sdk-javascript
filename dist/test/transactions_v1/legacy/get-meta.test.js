"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var tillhub_js_1 = require("../../../src/tillhub-js");
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = process.env.SYSTEM_TEST_USERNAME || user.username;
    user.password = process.env.SYSTEM_TEST_PASSWORD || user.password;
    user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount;
    user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey;
}
var legacyId = '4564';
var query = {
    legacy: true,
    type: 'sale',
    query: {
        branch_custom_id: 192837
    }
};
var queryString = 'legacy=true&type=sale&branch_custom_id=192837';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v1: TransactionsLegacy: can get meta', function () {
    it("Tillhub's transactions are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, transactions, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: legacyId
                                    }
                                }
                            ];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v1/transactions/" + legacyId + "/meta/legacy?" + queryString)
                            .reply(function () {
                            return [
                                200,
                                {
                                    results: [{ count: 50 }]
                                }
                            ];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    th = new tillhub_js_1.TillhubClient();
                    th.init(options);
                    return [4 /*yield*/, th.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    transactions = th.transactionsLegacy();
                    expect(transactions).toBeInstanceOf(tillhub_js_1.v1.TransactionsLegacy);
                    return [4 /*yield*/, transactions.meta(query)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual({ count: 50 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: legacyId
                                    }
                                }
                            ];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v1/transactions/" + legacyId + "/meta/legacy")
                            .reply(function () {
                            return [400];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    th = new tillhub_js_1.TillhubClient();
                    th.init(options);
                    return [4 /*yield*/, th.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.transactionsLegacy().meta()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('TransactionsGetMetaFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-meta.test.js.map