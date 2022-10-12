import React, { useMemo } from 'react';
import useSSR from 'use-ssr';
import FetchContext from './FetchContext';
export var Provider = function (_a) {
    var url = _a.url, options = _a.options, _b = _a.graphql, graphql = _b === void 0 ? false : _b, children = _a.children;
    var isBrowser = useSSR().isBrowser;
    var defaults = useMemo(function () { return ({
        url: url || (isBrowser ? window.location.origin : ''),
        options: options || {},
        graphql: graphql // TODO: this will make it so useFetch(QUERY || MUTATION) will work
    }); }, [options, graphql, isBrowser, url]);
    return (React.createElement(FetchContext.Provider, { value: defaults }, children));
};
