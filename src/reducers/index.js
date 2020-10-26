// Module Start
// JS imports
import { combineReducers } from 'redux';

// Reducers
// Module export
const appReducer = combineReducers({
  reducer: reducer,
  reducer: combineReducers({
    reducer: reducer
  })
});
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

// Module export
export default rootReducer;
// Module End
