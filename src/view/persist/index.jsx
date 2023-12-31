import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from 'Redux/store';
import { history } from 'Redux/rootReducer';

import Application from '../application';

const { persistor, store } = createStore();

const Persist = () => (
  <Provider store={store}>
    <ReduxRouter history={history}>
      <PersistGate persistor={persistor}>
        <Application />
      </PersistGate>
    </ReduxRouter>
  </Provider>
);

export default Persist;
