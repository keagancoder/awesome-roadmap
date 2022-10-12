import { MutableRefObject, DependencyList } from 'react';
import { Options, Res, HTTPMethod, ResponseType } from './types';
import { FunctionKeys, NonFunctionKeys } from 'utility-types';
/**
 * Used for error checking. If the condition is false, throw an error
 */
export declare function invariant(condition: boolean, format: string, a?: string, b?: string, c?: string, d?: string, e?: string, f?: string): void;
export declare const useExampleURL: () => string;
export declare function useURLRequiredInvariant(condition: boolean, method: string, optionalMessage?: string): void;
export declare const isString: (x: any) => x is string;
/**
 * Determines if the given param is an object. {}
 * @param obj
 */
export declare const isObject: (obj: any) => obj is object;
/**
 * Determines if the given param is an object that can be used as a request body.
 * Returns true for native objects or arrays.
 * @param obj
 */
export declare const isBodyObject: (obj: any) => boolean;
export declare const isFunction: (v: any) => boolean;
export declare const isNumber: (v: any) => boolean;
/**
 * Makes an object that will match the standards of a normal fetch's options
 * aka: pulls out all useFetch's special options like "onMount"
 */
export declare const pullOutRequestInit: (options?: Options | undefined) => RequestInit;
export declare const isEmpty: (x: any) => boolean;
export declare enum Device {
    Browser = "browser",
    Server = "server",
    Native = "native"
}
export declare const isBrowser: boolean;
export declare const isServer: boolean;
export declare const isNative: boolean;
export declare const tryGetData: (res: Response | undefined, defaultData: any, responseType: ResponseType) => Promise<any>;
/**
 * TODO: missing some fields that are in the mozilla docs: https://developer.mozilla.org/en-US/docs/Web/API/Response#Properties
 * 1. trailers (inconsistancy in the docs. Part says `trailers` another says `trailer`)
 * 2. useFinalURL
 */
declare type ResponseFields = (NonFunctionKeys<Res<any>> | 'data');
export declare const responseFields: ResponseFields[];
/**
 * TODO: missing some methods that are in the mozilla docs: https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods
 * 1. error
 * 2. redirect
 */
declare type ResponseMethods = Exclude<FunctionKeys<Res<any>>, 'data'>;
export declare const responseMethods: ResponseMethods[];
declare type ResponseKeys = (keyof Res<any>);
export declare const responseKeys: ResponseKeys[];
export declare const toResponseObject: <TData = any>(res?: Response | MutableRefObject<Response> | undefined, data?: any) => any;
export declare const emptyCustomResponse: any;
export declare const serializeResponse: (response: Response) => Promise<{
    body: string;
    status: number;
    statusText: string;
    headers: object;
}>;
export declare const useDeepCallback: (cb: (method: HTTPMethod) => (...args: any) => any, deps: DependencyList) => (method: HTTPMethod) => (...args: any) => any;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const isPositiveNumber: (n: number) => boolean;
export declare const makeError: (name: string | number, message: string) => Error;
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
export declare const addSlash: (input?: string | undefined, url?: string | undefined) => string;
export {};
