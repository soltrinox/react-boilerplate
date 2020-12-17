// Module Start
// JS impots
import { Workbox } from 'workbox-window';

// Utilities
// Types
type CookieStatus = {
  accepted: boolean;
  alert: boolean;
  feedback: boolean;
};
type Prompt = {
  onAccept: () => void;
  onReject: () => void;
};

// Environment variables
const environment: NodeJS.ProcessEnv = process.env;
// Google Tag Manager
const googleTagManagerAuthDev: string | undefined =
  environment.REACT_APP_GTM_AUTH_DEV;
const googleTagManagerAuthProd: string | undefined =
  environment.REACT_APP_GTM_AUTH_PROD;
// Web Push
const vapidPublicKey: string | undefined =
  environment.REACT_APP_VAPID_PUBLIC_KEY;
// API
const apiBaseUrl: string =
  environment.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://';
// Main paths
const navigationPaths = ['/'];
// Testing
// Data fetch mock
const dataFetch: (path: string) => Promise<Response> = async (path) =>
  fetch(apiBaseUrl + path).then((res) => res.json());

/**
 * @description Response status checking
 * @author Luca Cattide
 * @date 2020-12-17
 * @param {Response} response
 * @returns {Promise<Response>}
 */
function checkStatus(response: Response): Promise<Response> {
  if (response.status !== 200) {
    const error: Error = new Error(response.statusText);

    return Promise.reject(error);
  }
  return Promise.resolve(response);
}

/**
 * @description Authentication token setter
 * @author Luca Cattide
 * @date 2020-12-17
 * @param {(object | null)} [data=null]
 * @returns {Promise<any>}
 */
async function setAuthToken(data: object | null = null): Promise<any> {
  let token: string | null = null;

  // Data check
  if (data) {
    token = data!.token;
  }
  // LocalStorage check
  if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
    // Token check
    if (token && !localStorage.getItem('authorization_token')) {
      localStorage.setItem('authorization_token', token);
    } else {
      localStorage.removeItem('authorization_token');
    }
  }
}

/**
 * @description Authentication getter
 * @author Luca Cattide
 * @date 2020-12-17
 * @returns {boolean}
 */
function getAuthentication(): boolean {
  let authenticated: boolean = false;

  // LocalStorage check
  if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
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
 * @date 2020-12-17
 * @param {string} name
 * @returns {string}
 */
function handleCookiesCheck(name: string): string {
  // Existing check
  if (document.cookie.length > 0) {
    let index: number = document.cookie.indexOf(name + '=');

    // Index check
    if (index !== -1) {
      index = index + name.length + 1;

      let f: number = document.cookie.indexOf(';', index);

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
function handleCookiesStatus(name: string): CookieStatus {
  const cookie: string = handleCookiesCheck(name);
  const status: CookieStatus = {
    accepted: false,
    alert: false,
    feedback: false,
  };

  // Cookie check
  // If not exists
  if (cookie === '') {
    switch (name) {
      case 'cookie_law':
        status.alert = true;
        break;

      default:
    }
  } else if (cookie !== '') {
    // Else if exist
    switch (name) {
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
 * @date 2020-12-17
 * @param {string} base64String
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding: string = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64: string = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData: string = window.atob(base64);
  const outputArray: Uint8Array = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

/**
 * @description User notification permission
 * @author Luca Cattide
 * @date 2020-12-17
 */
function checkPermission(): void {
  // Push API check
  if (
    'Notification' in window &&
    navigator.serviceWorker &&
    navigationPaths.includes(window.location.pathname)
  ) {
    // Permission request
    Notification.requestPermission((status) => {
      console.log('Notification permission status:', status);
    });
  }
}

/**
 * @description User notification subscription sending
 * @author Luca Cattide
 * @date 2020-06-12
 * @param {object} subscription Notification subscription
 * @returns
 */
function sendSubscription(subscription: object): Promise<void | Response> {
  let token: string | null = null;

  // LocalStorage check
  if (
    typeof window !== 'undefined' &&
    typeof Storage !== 'undefined' &&
    localStorage.getItem('authorization_token')
  ) {
    token = localStorage.getItem('authorization_token');
  }
  // Authorization check
  if (token) {
    return fetch(`${apiBaseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          mutation SetNotification($subscription: String!) {
            setNotification(subscription: $subscription) {
              id
              notification
            }
          }
        `,
        variables: {
          subscription: JSON.stringify(subscription),
        },
      }),
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then(() => {
        console.log('Subscription updated');
      });
  }

  console.log('Not authenticated');
}

/**
 * @description User notification subscription setter
 * @author Luca Cattide
 * @date 2020-12-17
 */
function subscribeUser(): void {
  if (
    'serviceWorker' in navigator &&
    navigationPaths.includes(window.location.pathname)
  ) {
    navigator.serviceWorker.ready.then((reg) => {
      if (!reg.pushManager) {
        console.log('Push manager unavailable');

        return;
      }

      reg.pushManager.getSubscription().then((existedSubscription) => {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request');
          reg.pushManager
            .subscribe({
              applicationServerKey: urlBase64ToUint8Array(vapidPublicKey!),
              userVisibleOnly: true,
            })
            .then((sub) => {
              console.log('New subscription added');

              sendSubscription(sub);
            })
            .catch((e) => {
              if (Notification.permission === 'denied') {
                console.warn('Permission for notifications was denied');
              } else {
                console.error('Unable to subscribe to push', e);
              }
            });
        } else {
          console.log('Existed subscription detected');

          sendSubscription(existedSubscription);
        }
      });
    });
  }
}

// Service Worker refresh UI prompt getter
const createUIPrompt: (options: Prompt) => void = (options) => {
  // TODO: Custom prompt implementation
  if (confirm('New version available. Do you want to update?')) {
    options.onAccept();
  }
};
// Service Worker Update
const refresh = () => {
  // Existing check
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    window.workbox !== undefined
  ) {
    const wb = new Workbox('/service-worker.ts');
    const showSkipWaitingPrompt = () => {
      const prompt = createUIPrompt({
        onAccept: () => {
          wb.addEventListener('controlling', () => {
            window.location.reload();
          });
          wb.messageSkipWaiting();
        },
        onReject: () => {
          // TODO: Custom prompt closing
        },
      });
    };

    wb.addEventListener('waiting', showSkipWaitingPrompt);
    wb.register();
  }
};

// Module export
export {
  environment,
  googleTagManagerAuthDev,
  googleTagManagerAuthProd,
  vapidPublicKey,
  apiBaseUrl,
  navigationPaths,
  dataFetch,
  setAuthToken,
  getAuthentication,
  handleCookiesCheck,
  checkPermission,
  subscribeUser,
  refresh,
};
// Module End
