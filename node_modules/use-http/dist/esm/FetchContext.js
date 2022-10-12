import { createContext } from 'react';
export var FetchContext = createContext({
    url: '',
    options: {},
    graphql: false // TODO: this will make it so useFetch(QUERY || MUTATION) will work
});
export default FetchContext;
