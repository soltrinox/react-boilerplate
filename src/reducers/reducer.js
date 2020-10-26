// Module Start
// JS imports
import { createReducer } from '@reduxjs/toolkit';
import {
  setAction
} from '../../actions/ui/actions';

// State initialization
const initState = {
  property: false
};
// Account state reducer
const account = createReducer(initState, {
  [setAction.type]: (state, action) => {
    const {property} = action.payload;

    state.property = property;
  }
});

// Module export
export default account;
// Module End
