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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useMemo, useEffect, useRef, useCallback } from 'react';
import useSSR from 'use-ssr';
/**
 * Used for error checking. If the condition is false, throw an error
 */
export function invariant(condition, format, a, b, c, d, e, f) {
    if (a === void 0) { a = ''; }
    if (b === void 0) { b = ''; }
    if (c === void 0) { c = ''; }
    if (d === void 0) { d = ''; }
    if (e === void 0) { e = ''; }
    if (f === void 0) { f = ''; }
    if (process.env.NODE_ENV !== 'production') {
        if (format === undefined) {
            throw new Error('invariant requires an error message argument');
        }
    }
    if (!condition) {
        var error = void 0;
        if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' +
                'for the full error message and additional helpful warnings.');
        }
        else {
            var args_1 = [a, b, c, d, e, f];
            var argIndex_1 = 0;
            error = new Error(format.replace(/%s/g, function () { return args_1[argIndex_1++]; }));
            error.name = 'Invariant Violation';
        }
        throw error;
    }
}
export var useExampleURL = function () {
    var isBrowser = useSSR().isBrowser;
    return useMemo(function () {
        return isBrowser ? window.location.origin : 'https://example.com';
    }, [isBrowser]);
};
export function useURLRequiredInvariant(condition, method, optionalMessage) {
    var exampleURL = useExampleURL();
    useEffect(function () {
        invariant(condition, method + " requires a URL to be set as the 1st argument,\n\n      unless you wrap your app like:\n\n      <Provider url=\"" + exampleURL + "\"><App /></Provider>\n\n      " + optionalMessage);
    }, [condition, exampleURL, method, optionalMessage]);
}
export var isString = function (x) { return typeof x === 'string'; }; // eslint-disable-line
/**
 * Determines if the given param is an object. {}
 * @param obj
 */
export var isObject = function (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; }; // eslint-disable-line
/**
 * Determines if the given param is an object that can be used as a request body.
 * Returns true for native objects or arrays.
 * @param obj
 */
export var isBodyObject = function (obj) { return isObject(obj) || Array.isArray(obj); };
export var isFunction = function (v) { return typeof v === 'function'; };
export var isNumber = function (v) { return Object.prototype.toString.call(v) === '[object Number]'; };
// const requestFields = Object.getOwnPropertyNames(Object.getPrototypeOf(new Request('')))
// const responseFields = Object.getOwnPropertyNames(Object.getPrototypeOf(new Response()))
// export const customResponseFields = [...responseFields, 'data']
// TODO: come back and fix the "anys" in this http://bit.ly/2Lm3OLi
/**
 * Makes an object that will match the standards of a normal fetch's options
 * aka: pulls out all useFetch's special options like "onMount"
 */
export var pullOutRequestInit = function (options) {
    if (!options)
        return {};
    var requestInitFields = [
        'body',
        'cache',
        'credentials',
        'headers',
        'integrity',
        'keepalive',
        'method',
        'mode',
        'redirect',
        'referrer',
        'referrerPolicy',
        'signal',
        'window'
    ];
    return requestInitFields.reduce(function (acc, key) {
        if (key in options)
            acc[key] = options[key];
        return acc;
    }, {});
};
export var isEmpty = function (x) { return x === undefined || x === null; };
export var Device;
(function (Device) {
    Device["Browser"] = "browser";
    Device["Server"] = "server";
    Device["Native"] = "native";
})(Device || (Device = {}));
var Browser = Device.Browser, Server = Device.Server, Native = Device.Native;
var canUseDOM = !!(typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement);
var canUseNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
var device = canUseNative ? Native : canUseDOM ? Browser : Server;
export var isBrowser = device === Browser;
export var isServer = device === Server;
export var isNative = device === Native;
export var tryGetData = function (res, defaultData, responseType) { return __awaiter(void 0, void 0, void 0, function () {
    var types, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof res === 'undefined')
                    throw Error('Response cannot be undefined... 😵');
                if (typeof responseType === 'undefined')
                    throw Error('responseType cannot be undefined... 😵');
                types = (Array.isArray(responseType) ? responseType : [responseType]);
                if (types[0] == null)
                    throw Error('could not parse data from response 😵');
                return [4 /*yield*/, tryRetry(res, types)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, !isEmpty(defaultData) && isEmpty(data) ? defaultData : data];
        }
    });
}); };
var tryRetry = function (res, types, i) {
    if (i === void 0) { i = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, res.clone()[types[i]]()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    if (types.length - 1 === i)
                        throw error_1;
                    return [2 /*return*/, tryRetry(res.clone(), types, ++i)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var responseFields = ['headers', 'ok', 'redirected', 'trailer', 'status', 'statusText', 'type', 'url', 'body', 'bodyUsed', 'data'];
export var responseMethods = ['clone', 'arrayBuffer', 'blob', 'formData', 'json', 'text'];
export var responseKeys = __spreadArrays(responseFields, responseMethods);
export var toResponseObject = function (res, data) { return Object.defineProperties({}, responseKeys.reduce(function (acc, field) {
    if (responseFields.includes(field)) {
        acc[field] = {
            get: function () {
                var response = res instanceof Response ? res : res && res.current;
                if (!response)
                    return;
                if (field === 'data')
                    return data.current;
                var clonedResponse = ('clone' in response ? response.clone() : {});
                return clonedResponse[field];
            },
            enumerable: true
        };
    }
    else if (responseMethods.includes(field)) {
        acc[field] = {
            value: function () {
                var response = res instanceof Response ? res : res && res.current;
                if (!response)
                    return;
                var clonedResponse = ('clone' in response ? response.clone() : {});
                return clonedResponse[field]();
            },
            enumerable: true
        };
    }
    return acc;
}, {})); };
export var emptyCustomResponse = toResponseObject();
// TODO: switch this to .reduce()
var headersAsObject = function (headers) {
    var obj = {};
    headers.forEach(function (value, key) {
        obj[key] = value;
    });
    return obj;
};
export var serializeResponse = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, status, statusText, headers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, response.text()];
            case 1:
                body = _a.sent();
                status = response.status, statusText = response.statusText;
                headers = headersAsObject(response.headers);
                return [2 /*return*/, {
                        body: body,
                        status: status,
                        statusText: statusText,
                        headers: headers
                    }];
        }
    });
}); };
function useDeepCompareMemoize(value) {
    var ref = useRef();
    if (JSON.stringify(value) !== JSON.stringify(ref.current))
        ref.current = value;
    return ref.current;
}
export var useDeepCallback = function (cb, deps) { return useCallback(cb, useDeepCompareMemoize(deps)); };
export var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
export var isPositiveNumber = function (n) { return Number.isInteger(n) && n > 0; };
export var makeError = function (name, message) {
    var error = new Error(message);
    error.name = name + '';
    return error;
};
/**
 * Determines if we need to add a slash to front
 * of a path, and adds it if we do.
 * Cases:
 * (path = '', url = '' || null | undefined) => ''
 * (path = '?foo=bar', url = 'a.com')        => '?foo=bar'
 * (path = '?foo=bar', url = 'a.com/')       => '?foo=bar'
 * (path = 'bar', url = 'a.com/?foo=')       => 'bar'
 * (path = 'foo', url = 'a.com')             => '/foo'
 * (path = 'foo', url = 'a.com/')            => 'foo'
 * (path = '/foo', url = 'a.com')            => '/foo'
 * (path = '/foo', url = 'a.com/')           => 'foo'
 * (path = '?foo=bar')                       => '?foo=bar'
 * (path = 'foo')                            => '/foo'
 * (path = '/foo')                           => '/foo'
 * (path = '&foo=bar', url = 'a.com?b=k')    => '&foo=bar'
 * (path = '&foo=bar')                       => '&foo=bar'
 */
export var addSlash = function (input, url) {
    if (!input)
        return '';
    if (!url) {
        if (input.startsWith('?') || input.startsWith('&') || input.startsWith('/'))
            return input;
        return "/" + input;
    }
    if (url.endsWith('/') && input.startsWith('/'))
        return input.substr(1);
    if (!url.endsWith('/') && !input.startsWith('/') && !input.startsWith('?') && !input.startsWith('&') && !url.includes('?'))
        return "/" + input;
    return input;
};
