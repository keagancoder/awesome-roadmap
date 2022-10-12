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
import { isString, isObject, invariant, pullOutRequestInit, isFunction, isPositiveNumber } from './utils';
import { useContext, useMemo } from 'react';
import FetchContext from './FetchContext';
import defaults, { useFetchArgsDefaults } from './defaults';
export default function useFetchArgs(urlOrPathOrOptionsOrOverwriteGlobalOptions, optionsOrOverwriteGlobalOrDeps, deps) {
    invariant(!(isObject(urlOrPathOrOptionsOrOverwriteGlobalOptions) && isObject(optionsOrOverwriteGlobalOrDeps)), 'You cannot have a 2nd parameter of useFetch as object when your first argument is an object.');
    var context = useContext(FetchContext);
    var host = useMemo(function () {
        var maybeHost = urlOrPathOrOptionsOrOverwriteGlobalOptions;
        if (isString(maybeHost) && maybeHost.includes('://'))
            return maybeHost;
        if (context.url)
            return context.url;
        return defaults.host;
    }, [context.url, urlOrPathOrOptionsOrOverwriteGlobalOptions]);
    var path = useMemo(function () {
        var maybePath = urlOrPathOrOptionsOrOverwriteGlobalOptions;
        if (isString(maybePath) && !maybePath.includes('://'))
            return maybePath;
    }, [urlOrPathOrOptionsOrOverwriteGlobalOptions]);
    var overwriteGlobalOptions = useMemo(function () {
        if (isFunction(urlOrPathOrOptionsOrOverwriteGlobalOptions))
            return urlOrPathOrOptionsOrOverwriteGlobalOptions;
        if (isFunction(optionsOrOverwriteGlobalOrDeps))
            return optionsOrOverwriteGlobalOrDeps;
    }, []);
    var options = useMemo(function () {
        var localOptions = { headers: {} };
        if (isObject(urlOrPathOrOptionsOrOverwriteGlobalOptions)) {
            localOptions = urlOrPathOrOptionsOrOverwriteGlobalOptions;
        }
        else if (isObject(optionsOrOverwriteGlobalOrDeps)) {
            localOptions = optionsOrOverwriteGlobalOrDeps;
        }
        var globalOptions = context.options;
        var finalOptions = __assign(__assign(__assign(__assign({}, defaults), globalOptions), localOptions), { headers: __assign(__assign(__assign({}, defaults.headers), globalOptions.headers), localOptions.headers), interceptors: __assign(__assign(__assign({}, defaults.interceptors), globalOptions.interceptors), localOptions.interceptors) });
        if (overwriteGlobalOptions)
            return overwriteGlobalOptions(finalOptions);
        return finalOptions;
    }, [urlOrPathOrOptionsOrOverwriteGlobalOptions, overwriteGlobalOptions, context.options]);
    var requestInit = useMemo(function () { return pullOutRequestInit(options); }, [options]);
    var dependencies = useMemo(function () {
        if (Array.isArray(optionsOrOverwriteGlobalOrDeps))
            return optionsOrOverwriteGlobalOrDeps;
        if (Array.isArray(deps))
            return deps;
        return defaults.dependencies;
    }, [optionsOrOverwriteGlobalOrDeps, deps]);
    var cacheLife = options.cacheLife, retries = options.retries, retryDelay = options.retryDelay, retryOn = options.retryOn;
    invariant(Number.isInteger(cacheLife) && cacheLife >= 0, '`cacheLife` must be a number >= 0');
    invariant(Number.isInteger(retries) && retries >= 0, '`retries` must be a number >= 0');
    invariant(isFunction(retryDelay) || Number.isInteger(retryDelay) && retryDelay >= 0, '`retryDelay` must be a positive number or a function returning a positive number.');
    var isValidRetryOn = isFunction(retryOn) || (Array.isArray(retryOn) && retryOn.every(isPositiveNumber));
    invariant(isValidRetryOn, '`retryOn` must be an array of positive numbers or a function returning a boolean.');
    var loading = options.loading || Array.isArray(dependencies);
    var interceptors = useMemo(function () {
        var final = {};
        if ('request' in options.interceptors)
            final.request = options.interceptors.request;
        if ('response' in options.interceptors)
            final.response = options.interceptors.response;
        return final;
    }, [options]);
    var customOptions = useMemo(function () {
        var customOptionKeys = Object.keys(useFetchArgsDefaults.customOptions); // Array<keyof CustomOptions>
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
