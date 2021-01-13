// Module Start
// JS imports
import { PayloadAction } from '@reduxjs/toolkit';
import { CombinedState, combineReducers } from 'redux';
import entity, { EntityState } from './reducer';

// Reducers
// Module export
const appReducer = combineReducers({
  entity,
});
const rootReducer = (
  state: CombinedState<{ entity: EntityState }> | undefined,
  action: PayloadAction,
) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

// Module export
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
// Module End
