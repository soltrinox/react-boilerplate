// Module Start
const component = store => next => action => {
  const state = store.getState().ui.component;

  switch(action.type) {
    case 'component/action':
      const {propery} = action.payload;
      break;

    default:
  }

  return next(action);
};

// Module export
export default component;
// Module End
