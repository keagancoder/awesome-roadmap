"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachePolicies = exports.HTTPMethod = void 0;
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["DELETE"] = "DELETE";
    HTTPMethod["GET"] = "GET";
    HTTPMethod["HEAD"] = "HEAD";
    HTTPMethod["OPTIONS"] = "OPTIONS";
    HTTPMethod["PATCH"] = "PATCH";
    HTTPMethod["POST"] = "POST";
    HTTPMethod["PUT"] = "PUT";
    HTTPMethod["CONNECT"] = "CONNECT";
    HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod = exports.HTTPMethod || (exports.HTTPMethod = {}));
// https://www.apollographql.com/docs/react/api/react/hoc/#optionsfetchpolicy
var CachePolicies;
(function (CachePolicies) {
    /**
     * This is the default value where we always try reading data
     * from your cache first. If all the data needed to fulfill
     * your query is in the cache then that data will be returned.
     * useFetch will only fetch from the network if a cached result
     * is not available. This fetch policy aims to minimize the number
     * of network requests sent when rendering your component.
     */
    CachePolicies["CACHE_FIRST"] = "cache-first";
    /**
     * This fetch policy will have useFetch first trying to read data
     * from your cache. If all the data needed to fulfill your query
     * is in the cache then that data will be returned. However,
     * regardless of whether or not the full data is in your cache
     * this fetchPolicy will always execute query with the network
     * interface unlike cache-first which will only execute your query
     * if the query data is not in your cache. This fetch policy optimizes
     * for users getting a quick response while also trying to keep
     * cached data consistent with your server data at the cost of extra
     * network requests.
     */
    CachePolicies["CACHE_AND_NETWORK"] = "cache-and-network";
    /**
     * This fetch policy will never return your initial data from the
     * cache. Instead it will always make a request using your network
     * interface to the server. This fetch policy optimizes for data
     * consistency with the server, but at the cost of an instant response
     * to the user when one is available.
     */
    CachePolicies["NETWORK_ONLY"] = "network-only";
    /**
     * This fetch policy will never execute a query using your network
     * interface. Instead it will always try reading from the cache. If the
     * data for your query does not exist in the cache then an error will be
     * thrown. This fetch policy allows you to only interact with data in
     * your local client cache without making any network requests which
     * keeps your component fast, but means your local data might not be
     * consistent with what is on the server.
     */
    CachePolicies["CACHE_ONLY"] = "cache-only";
    /**
     * This fetch policy will never return your initial data from the cache.
     * Instead it will always make a request using your network interface to
     * the server. Unlike the network-only policy, it also will not write
     * any data to the cache after the query completes.
     */
    CachePolicies["NO_CACHE"] = "no-cache";
    CachePolicies["EXACT_CACHE_AND_NETWORK"] = "exact-cache-and-network";
})(CachePolicies = exports.CachePolicies || (exports.CachePolicies = {}));
