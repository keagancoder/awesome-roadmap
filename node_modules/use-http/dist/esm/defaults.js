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
import { CachePolicies } from './types';
import { isObject } from './utils';
export var useFetchArgsDefaults = {
    host: '',
    path: undefined,
    customOptions: {
        cacheLife: 0,
        cachePolicy: CachePolicies.CACHE_FIRST,
        interceptors: {},
        onAbort: function () { },
        onError: function () { },
        onNewData: function (currData, newData) { return newData; },
        onTimeout: function () { },
        perPage: 0,
        persist: false,
        responseType: ['json', 'text', 'blob', 'arrayBuffer'],
        retries: 0,
        retryDelay: 1000,
        retryOn: [],
        suspense: false,
        timeout: 0,
        // defaults
        data: undefined,
        loading: false
    },
    requestInit: {
        headers: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    dependencies: undefined
};
export default Object.entries(useFetchArgsDefaults).reduce(function (acc, _a) {
    var _b;
    var key = _a[0], value = _a[1];
    if (isObject(value))
        return __assign(__assign({}, acc), value);
    return __assign(__assign({}, acc), (_b = {}, _b[key] = value, _b));
}, {});
