import { Cache } from '../types';
declare const getLocalStorage: ({ cacheLife }: {
    cacheLife: number;
}) => Cache;
export default getLocalStorage;
