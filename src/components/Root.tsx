// Module Start
// JS imports
import React, { FC } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';
import App from './App';

// Types
type RootProps = {
  client: ApolloClient<NormalizedCacheObject>;
};

// App store instantiation
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});
// Root
const Root: FC<RootProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { client }: RootProps = props;

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  );
};

// Module export
export default Root;
// Module End
