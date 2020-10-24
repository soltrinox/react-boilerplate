// Module Start
// JS imports
import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import {
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';
import App from './App';

// App store instantiation
const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware()
  ]
});
// Root
const Root = (props) => {
  const {client} = props;

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  );
};

// Properties Validation
Root.propTypes = {
  client: PropTypes.object.isRequired
}

// Module export
export default Root;
// Module End
