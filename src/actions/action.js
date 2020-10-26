// Module Start
// JS imports
import { createAction } from '@reduxjs/toolkit';

// Actions
const setAction = createAction('action/setAction',
function prepare(action) {
  return {
    payload: {
      action
    }
  };
});

// Module export
export {
  setAction
};
// Module End
