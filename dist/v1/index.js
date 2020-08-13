"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carts = exports.Vouchers = exports.Balances = exports.Registers = exports.TransactionsLegacy = exports.Transactions = exports.Templates = exports.Products = exports.Pricebooks = exports.Auth = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_1.Auth; } });
var pricebooks_1 = require("./pricebooks");
Object.defineProperty(exports, "Pricebooks", { enumerable: true, get: function () { return pricebooks_1.Pricebooks; } });
var products_1 = require("./products");
Object.defineProperty(exports, "Products", { enumerable: true, get: function () { return products_1.Products; } });
var templates_1 = require("./templates");
Object.defineProperty(exports, "Templates", { enumerable: true, get: function () { return templates_1.Templates; } });
var transactions_1 = require("./transactions");
Object.defineProperty(exports, "Transactions", { enumerable: true, get: function () { return transactions_1.Transactions; } });
Object.defineProperty(exports, "TransactionsLegacy", { enumerable: true, get: function () { return transactions_1.TransactionsLegacy; } });
var registers_1 = require("./registers");
Object.defineProperty(exports, "Registers", { enumerable: true, get: function () { return registers_1.Registers; } });
var balances_1 = require("./balances");
Object.defineProperty(exports, "Balances", { enumerable: true, get: function () { return balances_1.Balances; } });
var vouchers_1 = require("./vouchers");
Object.defineProperty(exports, "Vouchers", { enumerable: true, get: function () { return vouchers_1.Vouchers; } });
var carts_1 = require("./carts");
Object.defineProperty(exports, "Carts", { enumerable: true, get: function () { return carts_1.Carts; } });
//# sourceMappingURL=index.js.map