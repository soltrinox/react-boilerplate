// Module Start
// JS imports
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import setAction from '../actions/action';

// Iterfaces
interface EntityState {
  property: boolean;
}

// State initialization
const initState: EntityState = {
  property: false,
};
// Account state reducer
const account = createReducer(initState, {
  [setAction.type]: (
    state: EntityState,
    action: PayloadAction<EntityState>,
  ) => {
    const { property }: EntityState = action.payload;

    state.property = property;
  },
});

// Module export
export default account;
// Module End
