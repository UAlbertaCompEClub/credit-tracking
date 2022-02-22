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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTransactions = exports.renderBalances = void 0;
var queries = __importStar(require("../../repositories/base"));
var renderBalances = function (clubs, ccid) { return __awaiter(void 0, void 0, void 0, function () {
    var balanceDict, clubIdList, transactions, renderedList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                balanceDict = Object();
                clubIdList = Array();
                clubs.forEach(function (element) {
                    clubIdList.push(element.clubid);
                    balanceDict[element.clubid] = 0;
                });
                return [4 /*yield*/, queries.transactionsUser({ ccid: ccid, clubid: 0 })];
            case 1:
                transactions = (_a.sent());
                transactions.forEach(function (element) {
                    balanceDict[element.clubid] += element.amount;
                });
                renderedList = '';
                clubs.forEach(function (element) {
                    if (balanceDict[element.clubid] !== 0) {
                        renderedList = renderedList.concat('<li>');
                        renderedList = renderedList.concat(element.clubname, ': ');
                        if (balanceDict[element.clubid] < 0) {
                            renderedList = renderedList.concat('-');
                        }
                        renderedList = renderedList.concat('$', Math.abs(parseFloat(balanceDict[element.clubid])).toString(), '</li>');
                    }
                });
                // console.log(renderedList);
                return [2 /*return*/, renderedList];
        }
    });
}); };
exports.renderBalances = renderBalances;
var renderTransactions = function (clubs, ccid) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionsRendered, _i, clubs_1, club, transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionsRendered = '';
                _i = 0, clubs_1 = clubs;
                _a.label = 1;
            case 1:
                if (!(_i < clubs_1.length)) return [3 /*break*/, 4];
                club = clubs_1[_i];
                return [4 /*yield*/, queries.transactionUserWeekly({ ccid: ccid, clubid: club.clubid })];
            case 2:
                transactions = (_a.sent());
                if (transactions.length > 0) {
                    transactionsRendered = transactionsRendered.concat('<strong>', club.clubname, ': </strong>');
                    transactions.forEach(function (transaction) {
                        transactionsRendered = transactionsRendered.concat('<p>', transaction.created_at.toISOString().substring(0, 10), ': ');
                        transactionsRendered = transactionsRendered.concat();
                        if (transaction.amount < 0) {
                            transactionsRendered = transactionsRendered.concat('-');
                        }
                        transactionsRendered = transactionsRendered.concat('$', Math.abs(parseFloat(transaction.amount)).toString(), '</p>');
                    });
                    transactionsRendered = transactionsRendered.concat('<br>');
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, transactionsRendered];
        }
    });
}); };
exports.renderTransactions = renderTransactions;
