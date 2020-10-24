// Module Start
// JS imports
import fetch from 'isomorphic-unfetch';
import {
  vapidPublicKey,
  apiBaseUrl,
  urlBase64ToUint8Array,
  navigationPaths,
  checkStatus
} from './utils';

/**
 * @description User notification permission
 * @author Luca Cattide
 * @date 2020-06-12
 * @export
 */
function checkPermission() {
  // Push API check
  if ('Notification' in window && navigator.serviceWorker &&
  navigationPaths.includes(window.location.pathname)) {
    // Permission request
    Notification.requestPermission((status) => {
      console.log('Notification permission status:', status);
    });
  }
}

/**
 * @description User notification subscription setter
 * @author Luca Cattide
 * @date 2020-06-12
 */
function subscribeUser() {
  if ('serviceWorker' in navigator &&
  navigationPaths.includes(window.location.pathname)) {
    navigator.serviceWorker.ready.then((reg) => {
      if (!reg.pushManager) {
        console.log('Push manager unavailable');

        return;
      }

      reg.pushManager.getSubscription()
      .then((existedSubscription) => {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request');
          reg.pushManager.subscribe({
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
            userVisibleOnly: true
          }).then((sub) => {
            console.log('New subscription added');

            sendSubscription(sub);
          }).catch((e) => {
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

/**
 * @description User notification subscription sending
 * @author Luca Cattide
 * @date 2020-06-12
 * @param {object} subscription Notification subscription
 * @returns
 */
function sendSubscription(subscription) {
  let token = null;

  // LocalStorage check
  if (((typeof window !== 'undefined') && (typeof(Storage) !== 'undefined')) &&
  (localStorage.getItem('authorization_token'))) {
    token = localStorage.getItem('authorization_token');
  }
  // Authorization check
  if (token) {
    return fetch(`${apiBaseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
          subscription: JSON.stringify(subscription)
        }
      })
    }).then(checkStatus).then(res => res.json()).then(() => {
      console.log('Subscription updated');
    });
  } else {
    console.log('Not authenticated');
  }
}

// Module export
export {
  checkPermission,
  subscribeUser
};
// Module End
