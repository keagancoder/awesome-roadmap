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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var react_1 = require("react");
var FetchContext_1 = __importDefault(require("./FetchContext"));
var defaults_1 = __importStar(require("./defaults"));
function useFetchArgs(urlOrPathOrOptionsOrOverwriteGlobalOptions, optionsOrOverwriteGlobalOrDeps, deps) {
    utils_1.invariant(!(utils_1.isObject(urlOrPathOrOptionsOrOverwriteGlobalOptions) && utils_1.isObject(optionsOrOverwriteGlobalOrDeps)), 'You cannot have a 2nd parameter of useFetch as object when your first argument is an object.');
    var context = react_1.useContext(FetchContext_1.default);
    var host = react_1.useMemo(function () {
        var maybeHost = urlOrPathOrOptionsOrOverwriteGlobalOptions;
        if (utils_1.isString(maybeHost) && maybeHost.includes('://'))
            return maybeHost;
        if (context.url)
            return context.url;
        return defaults_1.default.host;
    }, [context.url, urlOrPathOrOptionsOrOverwriteGlobalOptions]);
    var path = react_1.useMemo(function () {
        var maybePath = urlOrPathOrOptionsOrOverwriteGlobalOptions;
        if (utils_1.isString(maybePath) && !maybePath.includes('://'))
            return maybePath;
    }, [urlOrPathOrOptionsOrOverwriteGlobalOptions]);
    var overwriteGlobalOptions = react_1.useMemo(function () {
        if (utils_1.isFunction(urlOrPathOrOptionsOrOverwriteGlobalOptions))
            return urlOrPathOrOptionsOrOverwriteGlobalOptions;
        if (utils_1.isFunction(optionsOrOverwriteGlobalOrDeps))
            return optionsOrOverwriteGlobalOrDeps;
    }, []);
    var options = react_1.useMemo(function () {
        var localOptions = { headers: {} };
        if (utils_1.isObject(urlOrPathOrOptionsOrOverwriteGlobalOptions)) {
            localOptions = urlOrPathOrOptionsOrOverwriteGlobalOptions;
        }
        else if (utils_1.isObject(optionsOrOverwriteGlobalOrDeps)) {
            localOptions = optionsOrOverwriteGlobalOrDeps;
        }
        var globalOptions = context.options;
        var finalOptions = __assign(__assign(__assign(__assign({}, defaults_1.default), globalOptions), localOptions), { headers: __assign(__assign(__assign({}, defaults_1.default.headers), globalOptions.headers), localOptions.headers), interceptors: __assign(__assign(__assign({}, defaults_1.default.interceptors), globalOptions.interceptors), localOptions.interceptors) });
        if (overwriteGlobalOptions)
            return overwriteGlobalOptions(finalOptions);
        return finalOptions;
    }, [urlOrPathOrOptionsOrOverwriteGlobalOptions, overwriteGlobalOptions, context.options]);
    var requestInit = react_1.useMemo(function () { return utils_1.pullOutRequestInit(options); }, [options]);
    var dependencies = react_1.useMemo(function () {
        if (Array.isArray(optionsOrOverwriteGlobalOrDeps))
            return optionsOrOverwriteGlobalOrDeps;
        if (Array.isArray(deps))
            return deps;
        return defaults_1.default.dependencies;
    }, [optionsOrOverwriteGlobalOrDeps, deps]);
    var cacheLife = options.cacheLife, retries = options.retries, retryDelay = options.retryDelay, retryOn = options.retryOn;
    utils_1.invariant(Number.isInteger(cacheLife) && cacheLife >= 0, '`cacheLife` must be a number >= 0');
    utils_1.invariant(Number.isInteger(retries) && retries >= 0, '`retries` must be a number >= 0');
    utils_1.invariant(utils_1.isFunction(retryDelay) || Number.isInteger(retryDelay) && retryDelay >= 0, '`retryDelay` must be a positive number or a function returning a positive number.');
    var isValidRetryOn = utils_1.isFunction(retryOn) || (Array.isArray(retryOn) && retryOn.every(utils_1.isPositiveNumber));
    utils_1.invariant(isValidRetryOn, '`retryOn` must be an array of positive numbers or a function returning a boolean.');
    var loading = options.loading || Array.isArray(dependencies);
    var interceptors = react_1.useMemo(function () {
        var final = {};
        if ('request' in options.interceptors)
            final.request = options.interceptors.request;
        if ('response' in options.interceptors)
            final.response = options.interceptors.response;
        return final;
    }, [options]);
    var customOptions = react_1.useMemo(function () {
        var customOptionKeys = Object.keys(defaults_1.useFetchArgsDefaults.customOptions); // Array<keyof CustomOptions>
        var customOptions = customOptionKeys.reduce(function (opts, key) {
            opts[key] = options[key];
            return opts;
        }, {});
        return __assign(__assign({}, customOptions), { interceptors: interceptors, loading: loading });
    }, [interceptors, loading]);
    return {
        host: host,
        path: path,
        customOptions: customOptions,
        requestInit: requestInit,
        dependencies: dependencies
    };
}
exports.default = useFetchArgs;
