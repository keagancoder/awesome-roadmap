import { Cache, CachePolicies } from './types';
/**
 * Eventually, this will be replaced by use-react-storage, so
 * having this as a hook allows us to have minimal changes in
 * the future when switching over.
 */
declare type UseCacheArgs = {
    persist: boolean;
    cacheLife: number;
    cachePolicy: CachePolicies;
};
declare const useCache: ({ persist, cacheLife, cachePolicy }: UseCacheArgs) => Cache;
export default useCache;
