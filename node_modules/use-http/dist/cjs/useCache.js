"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var use_ssr_1 = __importDefault(require("use-ssr"));
var utils_1 = require("./utils");
var types_1 = require("./types");
var localStorage_1 = __importDefault(require("./storage/localStorage"));
var memoryStorage_1 = __importDefault(require("./storage/memoryStorage"));
var NETWORK_ONLY = types_1.CachePolicies.NETWORK_ONLY, NO_CACHE = types_1.CachePolicies.NO_CACHE;
var useCache = function (_a) {
    var persist = _a.persist, cacheLife = _a.cacheLife, cachePolicy = _a.cachePolicy;
    var _b = use_ssr_1.default(), isNative = _b.isNative, isServer = _b.isServer;
    utils_1.invariant(!(isServer && persist), 'There is no persistent storage on the Server currently! 🙅‍♂️');
    utils_1.invariant(!(isNative && persist), 'React Native support for persistent cache is not yet implemented. 🙅‍♂️');
    utils_1.invariant(!(persist && [NO_CACHE, NETWORK_ONLY].includes(cachePolicy)), "You cannot use option 'persist' with cachePolicy: " + cachePolicy + " \uD83D\uDE45\u200D\u2642\uFE0F");
    // right now we're not worrying about react-native
    if (persist)
        return localStorage_1.default({ cacheLife: cacheLife || (24 * 3600000) });
    return memoryStorage_1.default({ cacheLife: cacheLife });
};
exports.default = useCache;
