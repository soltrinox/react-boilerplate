// Module Start
// JS imports
import { Middleware } from 'redux';
import { RootState } from '../store';

const component: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const state = store.getState().ui.component;

  switch (action.type) {
    case 'component/action':
      const { property } = action.payload;
      break;

    default:
  }

  return next(action);
};

// Module export
export default component;
// Module End
