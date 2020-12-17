// Module Start
// Main
// JS imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import Root from './components/Root';
import client from './backend/apollo';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { checkPermission, subscribeUser } from './subscription';
import { reportWebVitals, sendToGTM } from './reportWebVitals';

loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Root client={client} />
    </BrowserRouter>,
    document.getElementById('root'),
  );
});

// Service Worker
serviceWorkerRegistration.register();

// Push notifications
checkPermission();
subscribeUser();
// Web Vitals
reportWebVitals(sendToGTM);
// Module End
