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
exports.createTransaction = exports.club = exports.getClubBalance = exports.getTransactions = void 0;
var controllerUtil_1 = __importDefault(require("../util/controllerUtil"));
var baseRepo = __importStar(require("../../repositories/base"));
var middleware_1 = require("../util/middleware");
require('dotenv').config({ path: './src/auth/secret-key.env' });
var buildUserTransactions = (function (Transactions, ccid) { return __awaiter(void 0, void 0, void 0, function () {
    var clubs, _i, Transactions_1, transaction_1, clubNameDict, clubData, _a, _b, clubid, name;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                clubs = {};
                for (_i = 0, Transactions_1 = Transactions; _i < Transactions_1.length; _i++) {
                    transaction_1 = Transactions_1[_i];
                    if (clubs.hasOwnProperty(transaction_1.clubid)) {
                        //Club has been added
                    }
                    else {
                        //Club has not been added so add it
                        clubs[transaction_1.clubid] = { transactions: [], balance: 0 };
                    }
                    //Add transaction and add to club balance
                    clubs[transaction_1.clubid].transactions.push({
                        date: transaction_1.created_at.slice(0, 10),
                        amount: transaction_1.amount,
                        approver: transaction_1.created_by
                    });
                    clubs[transaction_1.clubid].balance = clubs[transaction_1.clubid].balance + transaction_1.amount;
                }
                clubNameDict = Object();
                return [4 /*yield*/, baseRepo.getClubs()];
            case 1:
                clubData = _c.sent();
                clubData.forEach(function (element) {
                    clubNameDict[element.clubid] = element.clubname;
                });
                for (_a = 0, _b = Object.keys(clubs); _a < _b.length; _a++) {
                    clubid = _b[_a];
                    clubs[clubNameDict[clubid]] = clubs[clubid];
                    delete clubs[clubid];
                }
                return [4 /*yield*/, baseRepo.getUser({ 'ccid': String(ccid) })];
            case 2:
                name = (_c.sent())[0].full_name;
                return [2 /*return*/, { name: name, clubs: clubs }];
        }
    });
}); });
var clean = (function (Transactions) { return __awaiter(void 0, void 0, void 0, function () {
    var club, _i, Transactions_2, transaction_2;
    return __generator(this, function (_a) {
        club = { transactions: [], balance: 0 };
        for (_i = 0, Transactions_2 = Transactions; _i < Transactions_2.length; _i++) {
            transaction_2 = Transactions_2[_i];
            //Add transaction and add to club balance
            club.transactions.push({
                date: transaction_2.created_at.slice(0, 10),
                amount: transaction_2.amount,
                approver: transaction_2.created_by
            });
            club.balance = club.balance + transaction_2.amount;
            console.log(transaction_2.created_by);
        }
        return [2 /*return*/, club];
    });
}); });
var getTransactions = (0, controllerUtil_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, Transactions, transactions, clubid, queryParams, queryParams, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {};
                if (req.get('ccid')) {
                    params['ccid'] = req.get('ccid');
                }
                if (req.get('clubid')) {
                    params['clubid'] = req.get('clubid');
                }
                console.log(params);
                Transactions = [];
                transactions = {};
                if (!(params.hasOwnProperty('clubid') && params.hasOwnProperty('ccid'))) return [3 /*break*/, 3];
                clubid = parseInt(params.clubid);
                queryParams = {
                    clubid: clubid,
                    ccid: String(params.ccid)
                };
                return [4 /*yield*/, baseRepo.transactionsUser(queryParams)];
            case 1:
                Transactions = _a.sent();
                //Build data structure
                return [4 /*yield*/, buildUserTransactions(Transactions, params.ccid).then(function (res) {
                        transactions = res;
                    })];
            case 2:
                //Build data structure
                _a.sent();
                console.log("getting transactions for " + params.ccid + "with club id " + clubid);
                console.log(Transactions);
                return [3 /*break*/, 10];
            case 3:
                if (!params.hasOwnProperty('clubid')) return [3 /*break*/, 5];
                queryParams = {
                    clubid: parseInt(String(params.clubid)),
                    ccid: 'any'
                };
                return [4 /*yield*/, baseRepo.transactionsUser(queryParams)];
            case 4:
                transactions = _a.sent();
                return [3 /*break*/, 10];
            case 5:
                if (!params.hasOwnProperty('ccid')) return [3 /*break*/, 8];
                queryParams = {
                    ccid: String(params.ccid),
                    clubid: 0
                };
                return [4 /*yield*/, baseRepo.transactionsUser(queryParams)];
            case 6:
                Transactions = _a.sent();
                console.log(Transactions);
                return [4 /*yield*/, buildUserTransactions(Transactions, params.ccid).then(function (res) {
                        transactions = res;
                    })];
            case 7:
                _a.sent();
                transactions.clubs['All Clubs'] = clean(Transactions);
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, baseRepo.transactionsAll()];
            case 9:
                transactions = _a.sent();
                _a.label = 10;
            case 10:
                console.log(transactions);
                res.status(200).json({
                    body: transactions
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getTransactions = getTransactions;
var getClubBalance = (0, controllerUtil_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, User, queryParams, User_1, queryParams, User_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.body;
                User = [];
                if (!params.hasOwnProperty('club')) return [3 /*break*/, 2];
                queryParams = {
                    clubid: parseInt(params.club)
                };
                return [4 /*yield*/, baseRepo.clubBalance(queryParams)];
            case 1:
                User_1 = _a.sent();
                return [3 /*break*/, 4];
            case 2:
                queryParams = {
                    clubid: 0
                };
                return [4 /*yield*/, baseRepo.clubBalance(queryParams)];
            case 3:
                User_2 = _a.sent();
                _a.label = 4;
            case 4:
                res.status(200).json({
                    body: User
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getClubBalance = getClubBalance;
var club = (0, controllerUtil_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clubid, users, usersArray, usersHash, _a, _b, _i, user, userObj, transactions, allTrans, counter, trans, amount, amountString;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                clubid = req.body.clubid;
                console.log("club in router.get = " + clubid);
                if (!(clubid == -1)) return [3 /*break*/, 2];
                return [4 /*yield*/, baseRepo.getAllUsers()];
            case 1:
                users = _c.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, baseRepo.getUsersRobust({ clubid: clubid })];
            case 3:
                users = _c.sent();
                _c.label = 4;
            case 4:
                usersArray = [];
                usersHash = {};
                _a = [];
                for (_b in users)
                    _a.push(_b);
                _i = 0;
                _c.label = 5;
            case 5:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                user = _a[_i];
                userObj = users[user];
                transactions = "";
                return [4 /*yield*/, baseRepo.transactionsUser({ clubid: clubid, ccid: userObj.ccid })];
            case 6:
                allTrans = _c.sent();
                counter = 0;
                for (trans in allTrans) {
                    amount = allTrans[trans].amount;
                    amountString = '';
                    if (amount >= 0) {
                        amountString = '+' + amount;
                    }
                    else {
                        amountString = amount.toString();
                    }
                    transactions = transactions + amountString + ", ";
                    if (counter == 2) {
                        break;
                    }
                    counter++;
                }
                transactions = transactions + " ...";
                //build element and add it to array
                usersArray.push({ name: userObj.full_name, ccid: userObj.ccid, transactions: transactions, subscribed: userObj.subscribed });
                _c.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8:
                res.status(200).json({
                    body: usersArray
                });
                return [2 /*return*/];
        }
    });
}); });
exports.club = club;
var createTransaction = (0, middleware_1.secureExec)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = req.body;
        new Promise(function (resolve) {
            resolve();
            console.log('transaction creation process begin!');
        })
            .then(function () { return __awaiter(void 0, void 0, void 0, function () {
            var params, queryParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = req.body;
                        if (!params.hasOwnProperty('ccid')) return [3 /*break*/, 2];
                        queryParams = {
                            ccid: params.ccid,
                            clubid: parseInt(params.clubid),
                            amount: parseFloat(params.amount),
                            exec: params.exec
                        };
                        return [4 /*yield*/, baseRepo.createTransaction(queryParams)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
exports.createTransaction = createTransaction;
