// Module Start
// JS imports
import React, { forwardRef } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Link as RouterLink } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  ApolloLink,
  split
} from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import * as ws from 'ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {
  Avatar,
  Tooltip
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
  Euro,
  AttachMoney
} from '@material-ui/icons';
import fetch from 'isomorphic-unfetch';
import i18n from 'i18next';

// Utilities
// Environment variables
const environment = process.env;
// E-Mail
const emailService = environment.REACT_APP_EMAIL_SERVICE;
const emailTemplate = environment.REACT_APP_EMAIL_TEMPLATE;
const emailTemplateCookies = environment.REACT_APP_EMAIL_TEMPLATE_COOKIES;
const emailUser = environment.REACT_APP_EMAIL_USER;
// reCaptcha
const recaptchaSecretKey= environment.REACT_APP_RECAPTCHA_SECRET_KEY;
// Google Tag Manager
const googleTagManagerAuthDev = environment.REACT_APP_GTM_AUTH_DEV;
const googleTagManagerAuthProd = environment.REACT_APP_GTM_AUTH_PROD;
// Web Push
const vapidPublicKey = environment.REACT_APP_VAPID_PUBLIC_KEY;
// Admin - E-Mail
const emailAdmin = '';
// API
const apiBaseUrl = environment.NODE_ENV === 'development' ?
  'http://localhost:4000' :
  'https://';
// Apollo Client configuration
const isBrowser = typeof window !== 'undefined';
// Apollo URL
const httpLink = createHttpLink({
  // Server URL (must be absolute) - Es. https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn
  uri: `${apiBaseUrl}`,
  // Additional fetch() options like `credentials` or `headers`
  credentials: 'same-origin'
});
// Authentication Middleware
const authLink = setContext((_, {headers}) => {
  let token = null;

  // LocalStorage check
  if ((typeof window !== 'undefined') && (typeof(Storage) !== 'undefined')) {
    token = localStorage.getItem('authorization_token');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});
/**
 * Web Socket Middleware
 * Real-time event listener
 */
const wsLink = new WebSocketLink({
  uri: environment.NODE_ENV === 'development' ?
    'ws://localhost:4000' :
    'ws://',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: ((typeof window !== 'undefined') &&
      (typeof(Storage) !== 'undefined')) ?
        localStorage.getItem('authorization_token') :
        '',
    }
  },
  webSocketImpl: (typeof window !== 'undefined') ?
    WebSocket :
    ws
});
/**
 * Subscriptions Middleware
 * Redirects the link to an URL checker
 * by passing an action test function
 */
const link = split(({query}) => {
  const {kind, operation} = getMainDefinition(query);

  return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, authLink.concat(httpLink));
// Apollo Options
const apiOptions = {
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
    link
  ]),
  cache: new InMemoryCache()
};
// Text validation pattern
const patternText = /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
// E-Mail validation pattern
const patternEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/**
 * - Minimum eight characters
 * - at least one uppercase letter
 * - one lowercase letter
 * - one number and one special character
 */
const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.-_@$!%*?&])[A-Za-z\d.-_@$!%*?&]{8,}$/;
// Main paths
const navigationPaths = [
  '/',
];
// Testing
// Setup
const setup = (container) => beforeEach(() => {
  // Setup a DOM element as a render target
  container = document.createElement('div');

  document.body.appendChild(container);
});
// Teardown
const teardown = (container) => afterEach(() => {
  // Cleanup on exiting
  unmountComponentAtNode(container);

  container.remove();

  container = null;
});
// Data Fetch Mock
const dataFetch = async (path, options = {}) => {
  return fetch(apiBaseUrl + path).then(res => res.json());
};

/**
 * @description Response status checking
 * @author Luca Cattide
 * @date 2019-08-09
 * @param {object} response Request response
 * @returns
 */
function checkStatus(response) {
  if ((response.status !== 200)) {
    const error = new Error(response.statusText);

    return Promise.reject(error);
  } else {
    return Promise.resolve(response);
  }
}

/**
 * @description Authentication token setter
 * @author Luca Cattide
 * @date 2020-02-27
 * @param {object} [data=null]
 */
async function setAuthToken(data = null) {
  let token = null;

  // Data check
  if (data) {
    token = data.token;
  }
  // LocalStorage check
  if ((typeof window !== 'undefined') && (typeof(Storage) !== 'undefined')) {
    // Token check
    if (token && !localStorage.getItem('authorization_token')) {
      localStorage.setItem('authorization_token', token);
    } else {
      localStorage.removeItem('authorization_token');
    }
  }
};

/**
 * @description Authentication getter
 * @author Luca Cattide
 * @date 2020-02-28
 * @returns
 */
function getAuthentication() {
  let authenticated = false;

  // LocalStorage check
  if (typeof window !== 'undefined' && typeof(Storage) !== 'undefined') {
    // Logged in user check
    if (localStorage.getItem('authorization_token')) {
      authenticated = true;
    }
  }

  return authenticated;
}

/**
 * @description Cookies check handler
 * @author Luca Cattide
 * @date 2020-06-10
 * @param {string} name Cookie name
 * @returns
 */
function handleCookiesCheck(name) {
  // Existing check
  if (document.cookie.length > 0) {
    let index = document.cookie.indexOf(name + '=');

    // Index check
    if (index !== -1) {
      index = index + name.length + 1;

      let f = document.cookie.indexOf(';', index);

      if (f === -1) {
        f = document.cookie.length;
      }

      return unescape(document.cookie.substring(index, f));
    } else {
      return '';
    }
  }

  return '';
}

/**
 * @description Cookies status handler
 * @author Luca Cattide
 * @date 2020-06-10
 * @param {string} name Cookie name
 * @returns
 */
function handleCookiesStatus(name) {
  const cookie = handleCookiesCheck(name);
  const status = {
    accepted: false,
    alert: false,
    feedback: false
  };

  // Cookie check
  // If not exists
  if (cookie === '') {
    switch(name) {
      case 'cookie_law':
        status.alert = true;
        break;

      default:
    }
  } else if (cookie !== '') {
    // Else if exist
    switch(name) {
      case 'cookie_law':
        status.accepted = true;
        break;

      case 'google':
        status.accepted = true;
        status.feedback = true;
        break;

      default:
    }
  }

  return status;
}

/**
 * @description URL conversion
 * @author Luca Cattide
 * @date 2020-06-12
 * @param {string} base64String URL
 * @returns
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+")
  .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray
}

// Module export
export {
  emailService,
  emailTemplate,
  emailTemplateCookies,
  emailUser,
  recaptchaSecretKey,
  googleTagManagerAuthDev,
  googleTagManagerAuthProd,
  vapidPublicKey,
  emailAdmin,
  apiBaseUrl,
  patternText,
  patternEmail,
  patternPassword,
  navigationPaths,
  apiOptions,
  setup,
  teardown,
  dataFetch,
  checkStatus,
  setAuthToken,
  getAuthentication,
  handleCookiesCheck,
  handleCookiesStatus,
  urlBase64ToUint8Array
};
// Module End
