"use strict";
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
exports.setSubscribed = exports.checkCcid = exports.createUser = exports.getUser = void 0;
var controllerUtil_1 = __importDefault(require("../util/controllerUtil"));
var baseRepo = __importStar(require("../../repositories/base"));
var userRepo = __importStar(require("../../repositories/users"));
var middleware_1 = require("../util/middleware");
/**
 *  Logs a user into the system
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all inventory items.
*/
var getUser = (0, controllerUtil_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, User, queryParams, user, userCleaned, queryParams, usersGet, users, queryParams, User_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.body;
                User = [];
                if (!params.hasOwnProperty('ccid')) return [3 /*break*/, 2];
                console.log("inserted ccid");
                console.log(params.ccid);
                queryParams = {
                    ccid: params.ccid
                };
                return [4 /*yield*/, baseRepo.getUser(queryParams)];
            case 1:
                user = (_a.sent())[0];
                user.subscribed;
                userCleaned = {
                    ccid: user.ccid,
                    isexec: user.isexec,
                    active: user.active,
                    full_name: user.full_name,
                    subscribed: user.subscribed,
                    balance: user.balance
                };
                res.status(200).json({
                    body: userCleaned
                });
                return [3 /*break*/, 6];
            case 2:
                if (!params.hasOwnProperty('clubid')) return [3 /*break*/, 4];
                console.log("inserted clubid");
                queryParams = {
                    clubid: parseInt(params.clubid)
                };
                return [4 /*yield*/, baseRepo.getUsers(queryParams)];
            case 3:
                usersGet = _a.sent();
                users = Array();
                usersGet.forEach(function (element) {
                    users.push({
                        ccid: element.ccid,
                        full_name: element.full_name,
                        isexec: element.isexec,
                        balance: element.balance
                    });
                });
                res.status(200).json({
                    body: users
                });
                return [3 /*break*/, 6];
            case 4:
                queryParams = {
                    ccid: 'any',
                };
                return [4 /*yield*/, baseRepo.getUser(queryParams)];
            case 5:
                User_1 = _a.sent();
                res.status(200).json({
                    body: User_1
                });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.getUser = getUser;
var checkCcid = (0, controllerUtil_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, User;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = { ccid: String(req.get('ccid')) };
                return [4 /*yield*/, baseRepo.getUser(params)];
            case 1:
                User = _a.sent();
                console.log(User);
                if (User.length == 0) {
                    //No user found
                    res.status(200).json({
                        body: -1
                    });
                }
                else {
                    res.status(200).json({
                        body: (User[0].isexec ? 1 : 0) //Return 1 if user is an exec, 0 if they are not
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.checkCcid = checkCcid;
var createUser = (0, middleware_1.secureExec)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new Promise(function (resolve) {
            resolve();
            console.log('user creation process begin!');
        })
            .then(function () { return __awaiter(void 0, void 0, void 0, function () {
            var params, foip, execExistsCheck, userExistsCheck, execParams, userParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = req.body;
                        foip = false;
                        if (params.foip === true) {
                            foip = true;
                        }
                        return [4 /*yield*/, baseRepo.getExec({ ccid: params.ccid })];
                    case 1:
                        execExistsCheck = _a.sent();
                        return [4 /*yield*/, baseRepo.getUser({ ccid: params.ccid })];
                    case 2:
                        userExistsCheck = _a.sent();
                        console.log("check if user exists");
                        if (userExistsCheck.length !== 0) {
                            if (execExistsCheck.length !== 0) {
                                console.error("User Already Exists!");
                            }
                        }
                        if (!(params.isexec === true)) return [3 /*break*/, 4];
                        if (execExistsCheck.length !== 0) {
                            console.log("Exec Already Exists!");
                        }
                        execParams = {
                            ccid: params.ccid,
                            password: params.password,
                            clubid: parseInt(params.clubid)
                        };
                        return [4 /*yield*/, userRepo.createExec(execParams)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        userParams = {
                            ccid: params.ccid,
                            isexec: params.isexec,
                            full_name: params.full_name,
                            foip: foip,
                            balance: 0,
                            password: params.password
                        };
                        console.log("test point");
                        return [4 /*yield*/, userRepo.createUser(userParams)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if ((params.isexec === true && execExistsCheck.length !== 0) || userExistsCheck.length !== 0) {
                            res.status(200).json({ body: -1 });
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        }); })
            .then(function (data) {
            return res.status(200).json({
                status: 0
            });
        })
            .catch(function (data) {
            return res.status(400).json({
                status: -1
            });
        });
        return [2 /*return*/];
    });
}); });
exports.createUser = createUser;
var setSubscribed = (0, middleware_1.secureUser)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new Promise(function (resolve) {
            resolve();
            console.log('user subscription setting change begin!');
        })
            .then(function () { return __awaiter(void 0, void 0, void 0, function () {
            var params, userParams;
            return __generator(this, function (_a) {
                params = req.body;
                userParams = {
                    ccid: params.ccid,
                    subscribed: params.subscribed
                };
                userRepo.setSubscribed(userParams);
                return [2 /*return*/];
            });
        }); })
            .then(function (data) {
            return res.status(200).json({
                body: 1
            });
        })
            .catch(function (data) {
            return res.status(400).json({
                body: -1
            });
        });
        return [2 /*return*/];
    });
}); });
exports.setSubscribed = setSubscribed;
