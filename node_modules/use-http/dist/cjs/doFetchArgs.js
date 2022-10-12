"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var types_1 = require("./types");
var utils_1 = require("./utils");
var GET = types_1.HTTPMethod.GET;
function doFetchArgs(initialOptions, method, controller, cacheLife, cache, host, path, routeOrBody, bodyAs2ndParam, requestInterceptor) {
    return __awaiter(this, void 0, void 0, function () {
        var route, url, body, headers, options, responseID, _a, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    utils_1.invariant(!(utils_1.isBodyObject(routeOrBody) && utils_1.isBodyObject(bodyAs2ndParam)), "If first argument of " + method.toLowerCase() + "() is an object, you cannot have a 2nd argument. \uD83D\uDE1C");
                    utils_1.invariant(!(method === GET && utils_1.isBodyObject(routeOrBody)), 'You can only have query params as 1st argument of request.get()');
                    utils_1.invariant(!(method === GET && bodyAs2ndParam !== undefined), 'You can only have query params as 1st argument of request.get()');
                    route = (function () {
                        if (!utils_1.isServer && routeOrBody instanceof URLSearchParams)
                            return "?" + routeOrBody;
                        if (utils_1.isString(routeOrBody))
                            return routeOrBody;
                        return '';
                    })();
                    url = "" + host + utils_1.addSlash(path, host) + utils_1.addSlash(route);
                    body = (function () {
                        // FormData instanceof check should go first, because React Native's FormData implementation
                        // is indistinguishable from plain object when using isBodyObject check
                        if (routeOrBody instanceof FormData)
                            return routeOrBody;
                        if (utils_1.isBodyObject(routeOrBody))
                            return JSON.stringify(routeOrBody);
                        if (!utils_1.isServer &&
                            (bodyAs2ndParam instanceof FormData ||
                                bodyAs2ndParam instanceof URLSearchParams))
                            return bodyAs2ndParam;
                        if (utils_1.isBodyObject(bodyAs2ndParam) || utils_1.isString(bodyAs2ndParam))
                            return JSON.stringify(bodyAs2ndParam);
                        if (utils_1.isBodyObject(initialOptions.body) || utils_1.isString(bodyAs2ndParam))
                            return JSON.stringify(initialOptions.body);
                        return null;
                    })();
                    headers = (function () {
                        var contentType = (initialOptions.headers || {})['Content-Type'];
                        var shouldAddContentType = !!contentType || [types_1.HTTPMethod.POST, types_1.HTTPMethod.PUT, types_1.HTTPMethod.PATCH].includes(method) && !(body instanceof FormData);
                        var headers = __assign({}, initialOptions.headers);
                        if (shouldAddContentType) {
                            // default content types http://bit.ly/2N2ovOZ
                            // Accept: 'application/json',
                            // roughly, should only add for POST and PUT http://bit.ly/2NJNt3N
                            // unless specified by the user
                            headers['Content-Type'] = contentType || 'application/json';
                        }
                        else if (Object.keys(headers).length === 0) {
                            return null;
                        }
                        return headers;
                    })();
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var opts, interceptor;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        opts = __assign(__assign({}, initialOptions), { method: method, signal: controller.signal });
                                        if (headers !== null) {
                                            opts.headers = headers;
                                        }
                                        else {
                                            delete opts.headers;
                                        }
                                        if (body !== null)
                                            opts.body = body;
                                        if (!requestInterceptor) return [3 /*break*/, 2];
                                        return [4 /*yield*/, requestInterceptor({ options: opts, url: host, path: path, route: route })];
                                    case 1:
                                        interceptor = _a.sent();
                                        return [2 /*return*/, interceptor];
                                    case 2: return [2 /*return*/, opts];
                                }
                            });
                        }); })()
                        // TODO: if the body is a file, and this is a large file, it might exceed the size
                        // limit of the key size. Potential solution: base64 the body
                        // used to tell if a request has already been made
                    ];
                case 1:
                    options = _c.sent();
                    responseID = Object.entries({ url: url, method: method, body: options.body || '' })
                        .map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return key + ":" + value;
                    }).join('||');
                    _a = {
                        url: url,
                        options: options
                    };
                    _b = {};
                    return [4 /*yield*/, cache.has(responseID)];
                case 2:
                    _b.isCached = _c.sent(),
                        _b.id = responseID;
                    return [4 /*yield*/, cache.get(responseID)];
                case 3: return [2 /*return*/, (_a.response = (_b.cached = (_c.sent()),
                        _b),
                        _a)];
            }
        });
    });
}
exports.default = doFetchArgs;
