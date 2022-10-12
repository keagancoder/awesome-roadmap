"use strict";
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
var inMemoryStorage = {};
var getMemoryStorage = function (_a) {
    var cacheLife = _a.cacheLife;
    var remove = function () {
        var responseIDs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            responseIDs[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var _a, responseIDs_1, responseID;
            return __generator(this, function (_b) {
                for (_a = 0, responseIDs_1 = responseIDs; _a < responseIDs_1.length; _a++) {
                    responseID = responseIDs_1[_a];
                    delete inMemoryStorage[responseID];
                    delete inMemoryStorage[responseID + ":ts"];
                }
                return [2 /*return*/];
            });
        });
    };
    var isExpired = function (responseID) {
        var expiration = inMemoryStorage[responseID + ":ts"];
        var expired = expiration > 0 && expiration < Date.now();
        if (expired)
            remove(responseID);
        return expired || !inMemoryStorage[responseID];
    };
    var get = function (responseID) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (isExpired(responseID))
                return [2 /*return*/];
            return [2 /*return*/, inMemoryStorage[responseID]];
        });
    }); };
    var set = function (responseID, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            inMemoryStorage[responseID] = res;
            inMemoryStorage[responseID + ":ts"] = cacheLife > 0 ? Date.now() + cacheLife : 0;
            return [2 /*return*/];
        });
    }); };
    var has = function (responseID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, !isExpired(responseID)];
    }); }); };
    var clear = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            inMemoryStorage = {};
            return [2 /*return*/];
        });
    }); };
    return Object.defineProperties(inMemoryStorage, {
        get: { value: get, writable: false, configurable: true },
        set: { value: set, writable: false, configurable: true },
        has: { value: has, writable: false, configurable: true },
        delete: { value: remove, writable: false, configurable: true },
        clear: { value: clear, writable: false, configurable: true }
    });
};
exports.default = getMemoryStorage;
