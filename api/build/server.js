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
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
var usersRoutes_1 = __importDefault(require("./routes/auth/usersRoutes"));
var loginRoutes_1 = __importDefault(require("./routes/auth/loginRoutes"));
var transactionRoutes_1 = __importDefault(require("./routes/auth/transactionRoutes"));
var passwordRoutes_1 = __importDefault(require("./routes/forgotPassword/passwordRoutes"));
var middleware_1 = __importDefault(require("./controllers/util/middleware"));
var queue_1 = require("./sync/queue");
var state_1 = require("./sync/state");
var sync_1 = require("./sync/sync");
var queries = __importStar(require("./repositories/base"));
require('dotenv').config({ path: 'api.env' });
console.log("DB ACCESS\n", "USER:", process.env.PGUSER, "\n", "HOST:", process.env.PGHOST, "\n", "PASS:", process.env.PGPASSWORD, "\n", "DB_NAME:", process.env.PGDATABASE, "\n", "PORT:", process.env.PGPORT);
var router = (0, express_1.default)();
var port = process.env.PORT || "8000";
/**
 *  App Configuration
 */
// router.set("views", path.join(__dirname, "views"));
// router.use(express.static(path.join(__dirname, "public")));
router.use(middleware_1.default.bodyParser());
router.use(middleware_1.default.consoleDisplay());
router.use(middleware_1.default.cors_call());
router.use(express_1.default.json()); //parse requests as json objects
/**
 * Routes Definitions
 */
router.use('/api/v1', routes_1.default);
router.use('/api/v1', usersRoutes_1.default);
router.use('/api/v1', loginRoutes_1.default);
router.use('/api/v1', transactionRoutes_1.default);
router.use('/api/v1', passwordRoutes_1.default);
//set up server state
(0, state_1.initializeState)();
//timed method set-up
setInterval(queue_1.tick, 24 * 3600000);
// setInterval(tick, 20000);
setInterval(queue_1.computeActiveUsers, 24 * 3600000);
setInterval(sync_1.hourlyRun, 3600000);
router.get('/test-db', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, queries.getUsers({ clubid: 1 })];
            case 1:
                getUsers = _a.sent();
                res.status(200).json({
                    body: getUsers
                });
                return [2 /*return*/];
        }
    });
}); });
/**
 * Server Activation
 */
router.listen(port, function () {
    console.log("Listening to requests on http://localhost:" + port);
});
