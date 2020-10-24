// Module Start
// Main
// JS imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import Root from './components/Root';
import client from './apollo';
import * as serviceWorker from './serviceWorker';
import {
  checkPermission,
  subscribeUser
} from './subscription';

loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Root client={client} />
    </BrowserRouter>,
    document.getElementById('root')
  );
});

// Service Worker
serviceWorker.register();

// Push notifications
checkPermission();
subscribeUser();
// Module End
