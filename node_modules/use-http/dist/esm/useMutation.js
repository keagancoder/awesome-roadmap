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
export var useMutation = function (urlOrMutation, mutationArg) {
    var context = useContext(FetchContext);
    useURLRequiredInvariant(!!context.url && Array.isArray(urlOrMutation), 'useMutation');
    useURLRequiredInvariant(!!context.url || (isString(urlOrMutation) && !mutationArg), 'useMutation', 'OR you need to do useMutation("https://example.com", `your graphql mutation`)');
    // regular no context: useMutation('https://example.com', `graphql MUTATION`)
    var url = urlOrMutation;
    var MUTATION = mutationArg;
    // tagged template literal with context: useMutation`graphql MUTATION`
    if (Array.isArray(urlOrMutation) && context.url) {
        invariant(!mutationArg, 'You cannot have a 2nd argument when using tagged template literal syntax with useMutation.');
        url = context.url;
        MUTATION = urlOrMutation[0];
        // regular with context: useMutation(`graphql MUTATION`)
    }
    else if (urlOrMutation && !mutationArg && context.url) {
        url = context.url;
        MUTATION = urlOrMutation;
    }
    var _a = useFetch(url), loading = _a.loading, error = _a.error, cache = _a.cache, request = __rest(_a, ["loading", "error", "cache"]);
    var mutate = useCallback(function (inputs) { return request.mutate(MUTATION, inputs); }, [MUTATION, request]);
    var data = (request.data || { data: undefined }).data;
    return Object.assign([data, loading, error, mutate], { data: data, loading: loading, error: error, mutate: mutate, cache: cache });
};
