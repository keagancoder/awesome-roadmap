import useSSR from 'use-ssr';
import { invariant } from './utils';
import { CachePolicies } from './types';
import getLocalStorage from './storage/localStorage';
import getMemoryStorage from './storage/memoryStorage';
var NETWORK_ONLY = CachePolicies.NETWORK_ONLY, NO_CACHE = CachePolicies.NO_CACHE;
var useCache = function (_a) {
    var persist = _a.persist, cacheLife = _a.cacheLife, cachePolicy = _a.cachePolicy;
    var _b = useSSR(), isNative = _b.isNative, isServer = _b.isServer;
    invariant(!(isServer && persist), 'There is no persistent storage on the Server currently! 🙅‍♂️');
    invariant(!(isNative && persist), 'React Native support for persistent cache is not yet implemented. 🙅‍♂️');
    invariant(!(persist && [NO_CACHE, NETWORK_ONLY].includes(cachePolicy)), "You cannot use option 'persist' with cachePolicy: " + cachePolicy + " \uD83D\uDE45\u200D\u2642\uFE0F");
    // right now we're not worrying about react-native
    if (persist)
        return getLocalStorage({ cacheLife: cacheLife || (24 * 3600000) });
    return getMemoryStorage({ cacheLife: cacheLife });
};
export default useCache;
