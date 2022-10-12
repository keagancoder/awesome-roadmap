"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
var react_1 = require("react");
var useFetch_1 = __importDefault(require("./useFetch"));
var FetchContext_1 = require("./FetchContext");
var utils_1 = require("./utils");
exports.useQuery = function (urlOrQuery, queryArg) {
    var context = react_1.useContext(FetchContext_1.FetchContext);
    utils_1.useURLRequiredInvariant(!!context.url && Array.isArray(urlOrQuery), 'useQuery');
    utils_1.useURLRequiredInvariant(!!context.url || (utils_1.isString(urlOrQuery) && !queryArg), 'useQuery', 'OR you need to do useQuery("https://example.com", `your graphql query`)');
    // regular no context: useQuery('https://example.com', `graphql QUERY`)
    var url = urlOrQuery;
    var QUERY = queryArg;
    // tagged template literal with context: useQuery`graphql QUERY`
    if (Array.isArray(urlOrQuery) && context.url) {
        utils_1.invariant(!queryArg, 'You cannot have a 2nd argument when using tagged template literal syntax with useQuery.');
        url = context.url;
        QUERY = urlOrQuery[0];
        // regular with context: useQuery(`graphql QUERY`)
    }
    else if (urlOrQuery && !queryArg && context.url) {
        url = context.url;
        QUERY = urlOrQuery;
    }
    var _a = useFetch_1.default(url), loading = _a.loading, error = _a.error, cache = _a.cache, request = __rest(_a, ["loading", "error", "cache"]);
    var query = react_1.useCallback(function (variables) { return request.query(QUERY, variables); }, [QUERY, request]);
    var data = (request.data || { data: undefined }).data;
    return Object.assign([data, loading, error, query], { data: data, loading: loading, error: error, query: query, cache: cache });
};
