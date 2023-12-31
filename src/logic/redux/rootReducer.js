import { combineReducers } from 'redux';
import { createActions } from 'reduxsauce';
import { createBrowserHistory } from 'history';
import { createRouterReducer } from '@lagunovsky/redux-react-router';

import reducers from 'Reducers';

export const { Types } = createActions(
  {
    reset: null,
  },
  { prefix: 'state/' },
);

export const history = createBrowserHistory();

const combinedReducers = combineReducers({
  application: reducers.application,
  router: createRouterReducer(history),
  settings: reducers.settings,
  toast: reducers.toast,
  transient: reducers.transient,
});

const rootReducer = (state = {}, action = {}) => {
  if (action.type === Types.RESET) {
    state = {
      application: { ...state.application },
      router: undefined,
      settings: undefined,
      toast: undefined,
      transient: undefined,
    };
  }
  return combinedReducers(state, action);
};

export default rootReducer;
