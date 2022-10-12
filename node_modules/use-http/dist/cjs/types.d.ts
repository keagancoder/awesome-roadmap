import { ReactNode } from 'react';
import { FunctionKeys } from 'utility-types';
export declare enum HTTPMethod {
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    CONNECT = "CONNECT",
    TRACE = "TRACE"
}
export declare enum CachePolicies {
    /**
     * This is the default value where we always try reading data
     * from your cache first. If all the data needed to fulfill
     * your query is in the cache then that data will be returned.
     * useFetch will only fetch from the network if a cached result
     * is not available. This fetch policy aims to minimize the number
     * of network requests sent when rendering your component.
     */
    CACHE_FIRST = "cache-first",
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
    CACHE_AND_NETWORK = "cache-and-network",
    /**
     * This fetch policy will never return your initial data from the
     * cache. Instead it will always make a request using your network
     * interface to the server. This fetch policy optimizes for data
     * consistency with the server, but at the cost of an instant response
     * to the user when one is available.
     */
    NETWORK_ONLY = "network-only",
    /**
     * This fetch policy will never execute a query using your network
     * interface. Instead it will always try reading from the cache. If the
     * data for your query does not exist in the cache then an error will be
     * thrown. This fetch policy allows you to only interact with data in
     * your local client cache without making any network requests which
     * keeps your component fast, but means your local data might not be
     * consistent with what is on the server.
     */
    CACHE_ONLY = "cache-only",
    /**
     * This fetch policy will never return your initial data from the cache.
     * Instead it will always make a request using your network interface to
     * the server. Unlike the network-only policy, it also will not write
     * any data to the cache after the query completes.
     */
    NO_CACHE = "no-cache",
    EXACT_CACHE_AND_NETWORK = "exact-cache-and-network"
}
export interface DoFetchArgs {
    url: string;
    options: RequestInit;
    response: {
        isCached: boolean;
        id: string;
        cached?: Response;
    };
}
export interface FetchContextTypes {
    url: string;
    options: IncomingOptions;
    graphql?: boolean;
}
export interface FetchProviderProps {
    url?: string;
    options?: IncomingOptions;
    graphql?: boolean;
    children: ReactNode;
}
export declare type BodyOnly = (body: BodyInit | object) => Promise<any>;
export declare type RouteOnly = (route: string) => Promise<any>;
export declare type RouteAndBodyOnly = (route: string, body: BodyInit | object) => Promise<any>;
export declare type RouteOrBody = string | BodyInit | object;
export declare type UFBody = BodyInit | object;
export declare type RetryOpts = {
    attempt: number;
    error?: Error;
    response?: Response;
};
export declare type NoArgs = () => Promise<any>;
export declare type FetchData<TData> = (routeOrBody?: string | BodyInit | object, body?: BodyInit | object) => Promise<TData>;
export declare type RequestInitJSON = RequestInit & {
    headers: {
        'Content-Type': string;
    };
};
export interface ReqMethods<TData> {
    get: (route?: string) => Promise<TData>;
    post: FetchData<TData>;
    patch: FetchData<TData>;
    put: FetchData<TData>;
    del: FetchData<TData>;
    delete: FetchData<TData>;
    query: (query: string, variables?: BodyInit | object) => Promise<TData>;
    mutate: (mutation: string, variables?: BodyInit | object) => Promise<TData>;
    abort: () => void;
}
export interface Data<TData> {
    data: TData | undefined;
}
export interface ReqBase<TData> {
    data: TData | undefined;
    loading: boolean;
    error: Error | undefined;
    cache: Cache;
}
export interface Res<TData> extends Response {
    data?: TData | undefined;
}
export declare type Req<TData = any> = ReqMethods<TData> & ReqBase<TData>;
export declare type UseFetchArgs = [(string | IncomingOptions | OverwriteGlobalOptions)?, (IncomingOptions | OverwriteGlobalOptions | any[])?, any[]?];
export declare type UseFetchArrayReturn<TData> = [Req<TData>, Res<TData>, boolean, Error];
export declare type UseFetchObjectReturn<TData> = ReqBase<TData> & ReqMethods<TData> & {
    request: Req<TData>;
    response: Res<TData>;
};
export declare type UseFetch<TData> = UseFetchArrayReturn<TData> & UseFetchObjectReturn<TData>;
export declare type Interceptors<TData = any> = {
    request?: ({ options, url, path, route }: {
        options: RequestInit;
        url?: string;
        path?: string;
        route?: string;
    }) => Promise<RequestInit> | RequestInit;
    response?: ({ response }: {
        response: Res<TData>;
        request: RequestInit;
    }) => Promise<Res<TData>>;
};
export declare type Cache = {
    get: (name: string) => Promise<Response | undefined>;
    set: (name: string, data: Response) => Promise<void>;
    has: (name: string) => Promise<boolean>;
    delete: (...names: string[]) => Promise<void>;
    clear: () => void;
};
export interface CustomOptions {
    cacheLife: number;
    cachePolicy: CachePolicies;
    data: any;
    interceptors: Interceptors;
    loading: boolean;
    onAbort: () => void;
    onError: OnError;
    onNewData: (currData: any, newData: any) => any;
    onTimeout: () => void;
    persist: boolean;
    perPage: number;
    responseType: ResponseType;
    retries: number;
    retryOn: RetryOn;
    retryDelay: RetryDelay;
    suspense: boolean;
    timeout: number;
}
export declare type IncomingOptions = Partial<CustomOptions> & Omit<RequestInit, 'body'> & {
    body?: BodyInit | object | null;
};
export declare type Options = CustomOptions & Omit<RequestInit, 'body'> & {
    body?: BodyInit | object | null;
};
export declare type OverwriteGlobalOptions = (options: Options) => Options;
export declare type RetryOn = (<TData = any>({ attempt, error, response }: RetryOpts) => Promise<boolean>) | number[];
export declare type RetryDelay = (<TData = any>({ attempt, error, response }: RetryOpts) => number) | number;
export declare type BodyInterfaceMethods = Exclude<FunctionKeys<Body>, 'body' | 'bodyUsed' | 'formData'>;
export declare type ResponseType = BodyInterfaceMethods | BodyInterfaceMethods[];
export declare type OnError = ({ error }: {
    error: Error;
}) => void;
export declare type UseFetchArgsReturn = {
    host: string;
    path?: string;
    customOptions: {
        cacheLife: number;
        cachePolicy: CachePolicies;
        interceptors: Interceptors;
        onAbort: () => void;
        onError: OnError;
        onNewData: (currData: any, newData: any) => any;
        onTimeout: () => void;
        perPage: number;
        persist: boolean;
        responseType: ResponseType;
        retries: number;
        retryDelay: RetryDelay;
        retryOn: RetryOn | undefined;
        suspense: boolean;
        timeout: number;
        loading: boolean;
        data?: any;
    };
    requestInit: RequestInit;
    dependencies?: any[];
};
/**
 * Helpers
 */
export declare type ValueOf<T> = T[keyof T];
export declare type NonObjectKeysOf<T> = {
    [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];
export declare type ObjectValuesOf<T extends Record<string, any>> = Exclude<Exclude<Extract<ValueOf<T>, object>, never>, Array<any>>;
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export declare type Flatten<T> = Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<ObjectValuesOf<T>>;
