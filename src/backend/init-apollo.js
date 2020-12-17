// Module Start
// Apollo Client
// JS imports
import { InMemoryCache, HttpLink, ApolloLink, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import * as ws from 'ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { environment, apiBaseUrl } from './utils.ts';

// Apollo Client configuration
const isBrowser = typeof window !== 'undefined';
// Apollo URL
const httpLink = new HttpLink({
  // Server URL (must be absolute) - Es. https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn
  uri: `${apiBaseUrl}`,
  // Additional fetch() options like `credentials` or `headers`
  credentials: 'same-origin',
});
// Authentication Middleware
const authLink = setContext((_, { headers }) => {
  let token = null;

  // LocalStorage check
  if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
    token = localStorage.getItem('authorization_token');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
/**
 * Web Socket Middleware
 * Real-time event listener
 */
const wsLink = new WebSocketLink({
  uri: environment.NODE_ENV === 'development' ? 'ws://localhost:4000' : 'ws://',
  options: {
    reconnect: true,
    connectionParams: {
      authToken:
        typeof window !== 'undefined' && typeof Storage !== 'undefined'
          ? localStorage.getItem('authorization_token')
          : '',
    },
  },
  webSocketImpl: typeof window !== 'undefined' ? WebSocket : ws,
});
/**
 * Subscriptions Middleware
 * Redirects the link to an URL checker
 * by passing an action test function
 */
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);
// Apollo Options
const apiOptions = {
  connectToDevTools: isBrowser,
  // Disables forceFetch on the server (so queries are only run once)
  ssrMode: !isBrowser,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link,
  ]),
  cache: new InMemoryCache(),
};

// Module export
export default apiOptions;
// Module End
