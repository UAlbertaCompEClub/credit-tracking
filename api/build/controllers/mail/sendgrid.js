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
exports.forgotPasswordEmail = exports.shipInvoice = void 0;
var mail_1 = __importDefault(require("@sendgrid/mail"));
var assert_1 = __importDefault(require("assert"));
var queries = __importStar(require("../../repositories/users"));
var render = __importStar(require("./renderInvoice"));
require('dotenv').config({ path: './src/controllers/mail/sendgrid.env' });
var shipInvoice = function (ccid, clubs) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, sender, templateID, clubBalances, transactionsRendered, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = process.env.SENDGRID_API_KEY;
                (0, assert_1.default)(apiKey !== null && apiKey !== undefined);
                sender = process.env.SENDGRID_SENDER;
                (0, assert_1.default)(sender !== null && sender !== undefined);
                templateID = process.env.SENDGRID_TEMPLATE_ID;
                (0, assert_1.default)(templateID !== null && templateID !== undefined);
                return [4 /*yield*/, render.renderBalances(clubs, ccid)];
            case 1:
                clubBalances = _a.sent();
                return [4 /*yield*/, render.renderTransactions(clubs, ccid)];
            case 2:
                transactionsRendered = _a.sent();
                console.log(transactionsRendered);
                mail_1.default.setApiKey(apiKey);
                msg = {
                    to: ccid.concat('@ualberta.ca'),
                    from: sender,
                    html: ' ',
                    dynamic_template_data: {
                        full_name: 'Valued User',
                        clubs: clubBalances,
                        transactions: transactionsRendered
                    },
                    template_id: templateID
                };
                mail_1.default
                    .send(msg)
                    .then(function () {
                    console.log('Email sent to', ccid);
                })
                    .catch(function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.shipInvoice = shipInvoice;
var forgotPasswordEmail = function (ccid) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, sender, templateID, checkForgot, forgotPassCheck, code, url, url_html, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = process.env.SENDGRID_API_KEY;
                (0, assert_1.default)(apiKey !== null && apiKey !== undefined);
                sender = process.env.SENDGRID_SENDER;
                (0, assert_1.default)(sender !== null && sender !== undefined);
                templateID = process.env.SENDGRID_FORGET_TEMPLATE_ID;
                (0, assert_1.default)(templateID !== null && templateID !== undefined);
                return [4 /*yield*/, queries.checkUserForgot({ ccid: ccid })];
            case 1:
                checkForgot = (_a.sent());
                if (checkForgot.length > 0) {
                    return [2 /*return*/, 0];
                }
                return [4 /*yield*/, queries.getForgetPassCode({ ccid: ccid })];
            case 2:
                forgotPassCheck = _a.sent();
                code = '';
                if (!(forgotPassCheck.length === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, queries.createForgetPassCode({ ccid: ccid })];
            case 3:
                code = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                code = forgotPassCheck[0].code;
                _a.label = 5;
            case 5:
                url = process.env.WEBSITE_URL + 'forgot-password/' + code;
                url_html = "<a href='" + url + "'>link</a>";
                mail_1.default.setApiKey(apiKey);
                msg = {
                    to: ccid.concat('@ualberta.ca'),
                    from: sender,
                    html: ' ',
                    dynamic_template_data: {
                        reset_code: code,
                        reset_link: url_html
                    },
                    template_id: templateID
                };
                mail_1.default
                    .send(msg)
                    .then(function () {
                    console.log('Email sent to', ccid);
                })
                    .catch(function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.forgotPasswordEmail = forgotPasswordEmail;
