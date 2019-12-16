// Module Start
// Main
// JS imports
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';
import {
  apiAuthorizationUrl,
  apiBaseUrl,
  apiOptions
} from './utils';

const isBrowser = typeof window !== 'undefined';
const customFetch = async (uri, options) => {
  const response = await fetch(apiAuthorizationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: apiOptions
  });
  const json = await response.json();

  if (typeof(Storage) !== 'undefined') {
    if (!sessionStorage.getItem('access_token')) {
      sessionStorage.setItem('access_token', json.access_token);
    }
  }

  options.headers.Authorization = `Bearer ${json.access_token}`;

  return fetch(uri, options);
};
// Apollo URL
const httpLink = createHttpLink({
  // Server URL (must be absolute) - Es. https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn
  uri: `${apiBaseUrl}/graphql`,
  // Additional fetch() options like `credentials` or `headers`
  credentials: 'same-origin',
  fetch: customFetch
})
// Apollo instantiation
const client = new ApolloClient({
  connectToDevTools: isBrowser,
  // Disables forceFetch on the server (so queries are only run once)
  ssrMode: !isBrowser,
  link: ApolloLink.from([
    onError(({
      graphQLErrors,
      networkError
    }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({
            message,
            locations,
            path
          }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    httpLink
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));
serviceWorker.register();
// Module End
