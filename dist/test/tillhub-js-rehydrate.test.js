"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var tillhub_js_1 = tslib_1.__importStar(require("../src/tillhub-js"));
var v1_1 = require("../src/v1");
var util_1 = require("./util");
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
describe('SDK: can instantiate SDK', function () {
    var localStorage = new util_1.LocalStorageMock();
    it('Tillhub SDK is instantiable and is instance of Tillhub client', function () {
        expect(tillhub_js_1.default).toBeInstanceOf(tillhub_js_1.TillhubClient);
    });
    it('Base has been set automatically', function () {
        if (!tillhub_js_1.default.options)
            throw new Error('Options must be defined');
        expect(tillhub_js_1.default.options.base).toBe('https://api.tillhub.com');
    });
    it('Can call init with new options', function () {
        tillhub_js_1.default.init({
            base: 'https://staging-api.tillhub.com'
        });
        if (!tillhub_js_1.default.options)
            throw new Error('Options must be defined');
        expect(tillhub_js_1.default.options.base).toBe('https://staging-api.tillhub.com');
        expect(tillhub_js_1.default.auth).toBeInstanceOf(v1_1.Auth);
    });
    it('Can do login from instance', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, mock, _a, token, user_1, err_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        username: user.username,
                        password: user.password
                    };
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock = new axios_mock_adapter_1.default(axios_1.default);
                        mock.onPost('https://staging-api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: 'sometoken',
                                    user: {
                                        id: '123',
                                        legacy_id: '4564'
                                    }
                                }
                            ];
                        });
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tillhub_js_1.default.auth.loginUsername(options)];
                case 2:
                    _a = _b.sent(), token = _a.token, user_1 = _a.user;
                    localStorage.setItem('token', 'mockToken');
                    localStorage.setItem('user', 'mockUser');
                    expect(typeof token === 'string').toBe(true);
                    expect(token).toBe('sometoken');
                    expect(typeof user_1 === 'string').toBe(true);
                    expect(user_1).toBe('4564');
                    expect(tillhub_js_1.default.auth.token).toBe('sometoken');
                    expect(tillhub_js_1.default.auth.authenticated).toBe(true);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('can rehydrate', function () {
        tillhub_js_1.default.init({
            base: 'https://staging-api.tillhub.com',
            credentials: {
                token: localStorage.getItem('token')
            },
            user: localStorage.getItem('user')
        });
        expect(tillhub_js_1.default.auth.token).toBe('mockToken');
        expect(tillhub_js_1.default.auth.authenticated).toBe(true);
        var transactions = tillhub_js_1.default.transactions();
        expect(transactions).toBeInstanceOf(tillhub_js_1.v1.Transactions);
    });
});
//# sourceMappingURL=tillhub-js-rehydrate.test.js.map