"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.setSubscribed = exports.checkUserForgot = exports.deleteValidCode = exports.checkValidCode = exports.deletestaleResetCodes = exports.getForgetPassCode = exports.createForgetPassCode = exports.updateActiveUsers = exports.getActiveUsers = exports.updatePass = exports.createUser = exports.createExec = void 0;
var db = __importStar(require("zapatos/db"));
var connection_1 = __importDefault(require("./connection"));
var auth_1 = require("../auth/auth");
var crypto_1 = __importDefault(require("crypto"));
var assert_1 = __importDefault(require("assert"));
var setSubscribed = function (param) {
    var user = {
        ccid: param.ccid
    };
    var subStatus = {
        subscribed: param.subscribed
    };
    db.update('users', subStatus, user).run(connection_1.default);
};
exports.setSubscribed = setSubscribed;
var deleteValidCode = function (param) {
    var entry = {
        code: param.code
    };
    return db.deletes('forgot_password', entry).run(connection_1.default);
};
exports.deleteValidCode = deleteValidCode;
var checkValidCode = function (param) {
    var entry = {
        code: param.code
    };
    return db.select('forgot_password', entry).run(connection_1.default);
};
exports.checkValidCode = checkValidCode;
var deletestaleResetCodes = function () {
    db.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["   \n        DELETE FROM forgot_password F\n        WHERE F.created_at > now() - interval '1 day'\n    "], ["   \n        DELETE FROM forgot_password F\n        WHERE F.created_at > now() - interval '1 day'\n    "]))).run(connection_1.default);
};
exports.deletestaleResetCodes = deletestaleResetCodes;
var checkUserForgot = function (param) {
    var entry = {
        ccid: param.ccid
    };
    return db.select('forgot_password', entry).run(connection_1.default);
};
exports.checkUserForgot = checkUserForgot;
var createForgetPassCode = function (userParam) { return __awaiter(void 0, void 0, void 0, function () {
    var code, entry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = crypto_1.default.randomBytes(10).toString('hex');
                entry = {
                    ccid: userParam.ccid,
                    code: code
                };
                return [4 /*yield*/, db.insert('forgot_password', entry).run(connection_1.default)];
            case 1:
                _a.sent();
                return [2 /*return*/, code];
        }
    });
}); };
exports.createForgetPassCode = createForgetPassCode;
var getForgetPassCode = function (userParam) {
    var entry = {
        ccid: userParam.ccid
    };
    return db.select('forgot_password', entry).run(connection_1.default);
};
exports.getForgetPassCode = getForgetPassCode;
var createUser = function (userParam) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedPass, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, auth_1.encryptPass)(userParam.password)];
            case 1:
                encryptedPass = _a.sent();
                (0, assert_1.default)(encryptedPass !== undefined && encryptedPass !== null);
                user = {
                    ccid: userParam.ccid,
                    full_name: userParam.full_name,
                    foip: userParam.foip,
                    isexec: userParam.isexec,
                    balance: 0,
                    password: encryptedPass
                };
                db.insert('users', user).run(connection_1.default);
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var createExec = function (execParam) { return __awaiter(void 0, void 0, void 0, function () {
    var userParam, user, encryptedPass, userNew, userWhere, userUpdate, exec;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userParam = {
                    ccid: execParam.ccid
                };
                return [4 /*yield*/, db.select('users', userParam).run(connection_1.default)];
            case 1:
                user = _a.sent();
                if (!(user.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, auth_1.encryptPass)(execParam.password)];
            case 2:
                encryptedPass = _a.sent();
                (0, assert_1.default)(encryptedPass !== undefined && encryptedPass !== null);
                userNew = {
                    ccid: execParam.ccid,
                    full_name: execParam.ccid,
                    foip: true,
                    isexec: true,
                    balance: 0,
                    password: encryptedPass
                };
                db.insert('users', userNew).run(connection_1.default);
                _a.label = 3;
            case 3:
                if (user.length === 1 && user[0].isexec === false) {
                    userWhere = {
                        ccid: execParam.ccid
                    };
                    userUpdate = {
                        isexec: true
                    };
                    db.update('users', userUpdate, userWhere).run(connection_1.default);
                }
                exec = {
                    ccid: execParam.ccid,
                    clubid: execParam.clubid
                };
                db.insert('execs', exec).run(connection_1.default);
                return [2 /*return*/];
        }
    });
}); };
exports.createExec = createExec;
var updatePass = function (userParam) { return __awaiter(void 0, void 0, void 0, function () {
    var user, encryptedPass, newPass;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    ccid: userParam.ccid
                };
                return [4 /*yield*/, (0, auth_1.encryptPass)(userParam.newPassword)];
            case 1:
                encryptedPass = _a.sent();
                (0, assert_1.default)(encryptedPass !== undefined && encryptedPass !== null);
                newPass = {
                    password: encryptedPass
                };
                db.update('users', newPass, user).run(connection_1.default);
                return [2 /*return*/];
        }
    });
}); };
exports.updatePass = updatePass;
var getActiveUsers = function () {
    var query = db.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    SELECT U.ccid\n    FROM ", " U\n    WHERE U.active = True\n    AND U.balance != 0\n    "], ["\n    SELECT U.ccid\n    FROM ", " U\n    WHERE U.active = True\n    AND U.balance != 0\n    "])), "users").run(connection_1.default);
    return query;
};
exports.getActiveUsers = getActiveUsers;
var updateActiveUsers = function () {
    var query = db.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        UPDATE users\n        SET active = True\n        WHERE ccid IN (SELECT U.ccid\n            FROM transactions T, users U\n            WHERE T.ccid = U.ccid\n            AND T.created_at > now() - interval '1 year'\n            GROUP BY U.ccid\n\n            UNION\n\n            SELECT U.ccid\n            FROM users U\n            WHERE U.balance != 0);\n\n        UPDATE users\n        SET active = False\n        WHERE ccid NOT IN (SELECT U.ccid\n            FROM transactions T, users U\n            WHERE T.ccid = U.ccid\n            AND T.created_at > now() - interval '1 year'\n            GROUP BY U.ccid\n\n            UNION\n\n            SELECT U.ccid\n            FROM users U\n            WHERE U.balance != 0)\n    "], ["\n        UPDATE users\n        SET active = True\n        WHERE ccid IN (SELECT U.ccid\n            FROM transactions T, users U\n            WHERE T.ccid = U.ccid\n            AND T.created_at > now() - interval '1 year'\n            GROUP BY U.ccid\n\n            UNION\n\n            SELECT U.ccid\n            FROM users U\n            WHERE U.balance != 0);\n\n        UPDATE users\n        SET active = False\n        WHERE ccid NOT IN (SELECT U.ccid\n            FROM transactions T, users U\n            WHERE T.ccid = U.ccid\n            AND T.created_at > now() - interval '1 year'\n            GROUP BY U.ccid\n\n            UNION\n\n            SELECT U.ccid\n            FROM users U\n            WHERE U.balance != 0)\n    "]))).run(connection_1.default);
    return query;
};
exports.updateActiveUsers = updateActiveUsers;
var templateObject_1, templateObject_2, templateObject_3;
