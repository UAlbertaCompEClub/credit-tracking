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
exports.getAllUsers = exports.transactionUserWeekly = exports.getExec = exports.getClubs = exports.getClub = exports.transactionsAll = exports.getUsersRobust = exports.getUsers = exports.getUser = exports.transactionsUser = exports.clubBalance = exports.createTransaction = void 0;
var db = __importStar(require("zapatos/db"));
var connection_1 = __importDefault(require("./connection"));
var createTransaction = function (transactionParam) {
    var transaction = {
        ccid: transactionParam.ccid,
        clubid: transactionParam.clubid,
        amount: transactionParam.amount,
        id: db.Default,
        created_at: db.Default,
        created_by: transactionParam.exec,
    };
    console.log("creating Transaction at the query level...");
    return db.insert('transactions', transaction).run(connection_1.default);
};
exports.createTransaction = createTransaction;
var transactionsUser = function (transaction) {
    var where = {};
    if (transaction.clubid === 0 && transaction.ccid === 'any') {
    }
    else if (transaction.clubid === 0 && transaction.ccid !== 'any') {
        where.ccid = transaction.ccid;
    }
    else if (transaction.clubid !== 0 && transaction.ccid === 'any') {
        where.clubid = transaction.clubid;
    }
    else if (transaction.clubid !== 0 && transaction.ccid !== 'any') {
        where.ccid = transaction.ccid;
        where.clubid = transaction.clubid;
    }
    return db.select('transactions', where).run(connection_1.default);
};
exports.transactionsUser = transactionsUser;
var transactionUserWeekly = function (transactionParam) {
    var today = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    var dateUpper = today.toISOString().substring(0, 10);
    var dateLower = oneMonthAgo.toISOString().substring(0, 10);
    var query = db.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        SELECT *\n        FROM ", " T\n        WHERE T.created_at > now() - interval '1 week'\n        AND T.ccid=", "\n        AND T.clubid=", "\n    "], ["\n        SELECT *\n        FROM ", " T\n        WHERE T.created_at > now() - interval '1 week'\n        AND T.ccid=", "\n        AND T.clubid=", "\n    "])), "transactions", db.param(transactionParam.ccid), db.param(transactionParam.clubid)).run(connection_1.default);
    return query;
};
exports.transactionUserWeekly = transactionUserWeekly;
var transactionsAll = function () {
    var where = {};
    return db.select('transactions', where).run(connection_1.default);
};
exports.transactionsAll = transactionsAll;
var getClub = function (queryParams) {
    var where = {
        clubid: queryParams.clubid
    };
    return db.select('clubs', where).run(connection_1.default);
};
exports.getClub = getClub;
var getClubs = function () {
    var where = {};
    return db.select('clubs', where).run(connection_1.default);
};
exports.getClubs = getClubs;
var clubBalance = function (queryParams) {
    var where = {};
    if (queryParams.clubid !== 0) {
        where.clubid = queryParams.clubid;
    }
    return db.select('clubs', where).run(connection_1.default);
};
exports.clubBalance = clubBalance;
var getUser = function (userParam) {
    var where = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    // console.log(await db.select('transactions', where).run(connection));
    return db.select('users', where).run(connection_1.default);
};
exports.getUser = getUser;
var getExec = function (userParam) {
    var where = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    return db.select('execs', where).run(connection_1.default);
};
exports.getExec = getExec;
var getUsers = function (userParam) {
    var query = db.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        SELECT U.ccid, U.balance\n        FROM ", " U, ", " T\n        WHERE U.ccid=T.ccid AND T.clubid=", "\n        GROUP BY U.ccid\n        HAVING COUNT(T.clubid)>0\n    "], ["\n        SELECT U.ccid, U.balance\n        FROM ", " U, ", " T\n        WHERE U.ccid=T.ccid AND T.clubid=", "\n        GROUP BY U.ccid\n        HAVING COUNT(T.clubid)>0\n    "])), "users", "transactions", db.param(userParam.clubid)).run(connection_1.default);
    return query;
};
exports.getUsers = getUsers;
var getUsersRobust = function (userParam) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = db.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        SELECT U.ccid, U.full_name, U.balance, U.subscribed\n        FROM ", " U, ", " T\n        WHERE U.ccid=T.ccid AND T.clubid=", "\n        GROUP BY U.ccid, U.full_name\n        HAVING COUNT(T.clubid)>0\n    "], ["\n        SELECT U.ccid, U.full_name, U.balance, U.subscribed\n        FROM ", " U, ", " T\n        WHERE U.ccid=T.ccid AND T.clubid=", "\n        GROUP BY U.ccid, U.full_name\n        HAVING COUNT(T.clubid)>0\n    "])), "users", "transactions", db.param(userParam.clubid)).run(connection_1.default);
        return [2 /*return*/, query];
    });
}); };
exports.getUsersRobust = getUsersRobust;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = db.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        SELECT U.ccid, U.full_name, U.balance, U.subscribed\n        FROM ", " U\n        GROUP BY U.ccid, U.full_name\n    "], ["\n        SELECT U.ccid, U.full_name, U.balance, U.subscribed\n        FROM ", " U\n        GROUP BY U.ccid, U.full_name\n    "])), "users").run(connection_1.default);
        return [2 /*return*/, query];
    });
}); };
exports.getAllUsers = getAllUsers;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
