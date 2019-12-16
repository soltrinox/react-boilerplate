// Module Start
// JS imports
import fetch from 'isomorphic-unfetch'

// Utilities
// API
const apiAuthorizationUrl = 'https://';
const apiBaseUrl = 'https://';
// TODO: replace with reader client in production
const apiOptions = '';
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

// Module export
export {apiAuthorizationUrl, apiBaseUrl, apiOptions, dataFetch, checkStatus};
// Module End
