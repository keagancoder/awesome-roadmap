import { ReqBase, Cache } from './types';
declare type ArrayDestructure<TData = any> = [TData | undefined, boolean, Error | undefined, (variables?: object) => Promise<any>];
interface ObjectDestructure<TData = any> extends ReqBase<TData> {
    query: (variables?: object) => Promise<any>;
    cache: Cache;
}
declare type UseQuery<TData = any> = ArrayDestructure<TData> & ObjectDestructure<TData>;
export declare const useQuery: <TData = any>(urlOrQuery: string | TemplateStringsArray, queryArg?: string | undefined) => UseQuery<TData>;
export {};
