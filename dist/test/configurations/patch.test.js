"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = require("../../src/tillhub-js");
dotenv.config();
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = (_a = process.env.SYSTEM_TEST_USERNAME) !== null && _a !== void 0 ? _a : user.username;
    user.password = (_b = process.env.SYSTEM_TEST_PASSWORD) !== null && _b !== void 0 ? _b : user.password;
    user.clientAccount = (_c = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID) !== null && _c !== void 0 ? _c : user.clientAccount;
    user.apiKey = (_d = process.env.SYSTEM_TEST_API_KEY) !== null && _d !== void 0 ? _d : user.apiKey;
}
var legacyId = '4564';
var configId = '1337';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var baseConf = {
    owner: 'self'
};
var patchConf = {
    label_printer: { foo: 'bar' }
};
var combinedConf = tslib_1.__assign(tslib_1.__assign({}, baseConf), patchConf);
describe('v0: Configurations: patch existing config', function () {
    it('can patch an existing config', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, configurations, data;
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
                            .onPatch("https://api.tillhub.com/api/v0/configurations/" + legacyId + "/" + configId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [combinedConf]
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
                    configurations = th.configurations();
                    expect(configurations).toBeInstanceOf(tillhub_js_1.v0.Configurations);
                    return [4 /*yield*/, configurations.patch(configId, patchConf)];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(false);
                    expect(data).toEqual(combinedConf);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=patch.test.js.map