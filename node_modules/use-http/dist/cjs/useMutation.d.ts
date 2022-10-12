import { ReqBase } from './types';
declare type ArrayDestructure<TData = any> = [TData | undefined, boolean, Error | undefined, (variables?: object) => Promise<any>];
interface ObjectDestructure<TData = any> extends ReqBase<TData> {
    mutate: (variables?: object) => Promise<any>;
}
declare type UseMutation<TData = any> = ArrayDestructure<TData> & ObjectDestructure<TData>;
export declare const useMutation: <TData = any>(urlOrMutation: string | TemplateStringsArray, mutationArg?: string | undefined) => UseMutation<TData>;
export {};
