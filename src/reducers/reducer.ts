// Module Start
// JS imports
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import setAction from '../actions/action';

// Iterfaces
export interface EntityState {
  property: boolean;
}

// State initialization
const initState: EntityState = {
  property: false,
};
// Entity state reducer
const entity = createReducer(initState, {
  [setAction.type]: (
    state: EntityState,
    action: PayloadAction<EntityState>,
  ) => {
    const { property }: EntityState = action.payload;

    state.property = property;
  },
});

// Module export
export default entity;
// Module End
