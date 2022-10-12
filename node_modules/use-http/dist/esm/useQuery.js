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
import { useContext, useCallback } from 'react';
import useFetch from './useFetch';
import { FetchContext } from './FetchContext';
import { invariant, isString, useURLRequiredInvariant } from './utils';
export var useQuery = function (urlOrQuery, queryArg) {
    var context = useContext(FetchContext);
    useURLRequiredInvariant(!!context.url && Array.isArray(urlOrQuery), 'useQuery');
    useURLRequiredInvariant(!!context.url || (isString(urlOrQuery) && !queryArg), 'useQuery', 'OR you need to do useQuery("https://example.com", `your graphql query`)');
    // regular no context: useQuery('https://example.com', `graphql QUERY`)
    var url = urlOrQuery;
    var QUERY = queryArg;
    // tagged template literal with context: useQuery`graphql QUERY`
    if (Array.isArray(urlOrQuery) && context.url) {
        invariant(!queryArg, 'You cannot have a 2nd argument when using tagged template literal syntax with useQuery.');
        url = context.url;
        QUERY = urlOrQuery[0];
        // regular with context: useQuery(`graphql QUERY`)
    }
    else if (urlOrQuery && !queryArg && context.url) {
        url = context.url;
        QUERY = urlOrQuery;
    }
    var _a = useFetch(url), loading = _a.loading, error = _a.error, cache = _a.cache, request = __rest(_a, ["loading", "error", "cache"]);
    var query = useCallback(function (variables) { return request.query(QUERY, variables); }, [QUERY, request]);
    var data = (request.data || { data: undefined }).data;
    return Object.assign([data, loading, error, query], { data: data, loading: loading, error: error, query: query, cache: cache });
};
