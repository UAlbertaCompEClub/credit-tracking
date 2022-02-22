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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.getQueue = exports.queueUsers = void 0;
var db = __importStar(require("zapatos/db"));
var connection_1 = __importDefault(require("./connection"));
var queueUsers = function (users) {
    db.insert('invoice_queue', users).run(connection_1.default);
};
exports.queueUsers = queueUsers;
var getQueue = function () {
    var where = {};
    return db.select('invoice_queue', where).run(connection_1.default);
};
exports.getQueue = getQueue;
var removeUser = function (ccid) {
    var where = {
        ccid: ccid
    };
    return db.deletes('invoice_queue', where).run(connection_1.default);
};
exports.removeUser = removeUser;
