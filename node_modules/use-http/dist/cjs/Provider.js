"use strict";
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
exports.Provider = void 0;
var react_1 = __importStar(require("react"));
var use_ssr_1 = __importDefault(require("use-ssr"));
var FetchContext_1 = __importDefault(require("./FetchContext"));
exports.Provider = function (_a) {
    var url = _a.url, options = _a.options, _b = _a.graphql, graphql = _b === void 0 ? false : _b, children = _a.children;
    var isBrowser = use_ssr_1.default().isBrowser;
    var defaults = react_1.useMemo(function () { return ({
        url: url || (isBrowser ? window.location.origin : ''),
        options: options || {},
        graphql: graphql // TODO: this will make it so useFetch(QUERY || MUTATION) will work
    }); }, [options, graphql, isBrowser, url]);
    return (react_1.default.createElement(FetchContext_1.default.Provider, { value: defaults }, children));
};
