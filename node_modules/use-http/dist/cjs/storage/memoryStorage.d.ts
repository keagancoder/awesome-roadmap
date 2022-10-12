import { Cache } from '../types';
declare const getMemoryStorage: ({ cacheLife }: {
    cacheLife: number;
}) => Cache;
export default getMemoryStorage;
