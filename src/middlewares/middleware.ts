// Module Start
// JS imports
import { Middleware } from 'redux';
import { RootState } from '../reducers/index';

const component: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const state = store.getState().entity;

  switch (action.type) {
    case 'component/action': {
      const { property } = action.payload;
      break;
    }

    default:
  }

  return next(action);
};

// Module export
export default component;
// Module End
