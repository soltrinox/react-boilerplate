// Module Start
// JS imports
import { ApolloClient } from '@apollo/client';
import apiOptions from './init-apollo';

// Apollo instantiation
const client = new ApolloClient(apiOptions);

// Module export
export default client;
// Module End
