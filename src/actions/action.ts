// Module Start
// JS imports
import { createAction } from '@reduxjs/toolkit';

// Actions
const setAction = createAction('action/setAction', (action: string) => ({
  payload: {
    action,
  },
}));

// Module export
export default setAction;
// Module End
