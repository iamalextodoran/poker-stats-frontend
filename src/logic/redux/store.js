import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

import Api from 'Api';
import sagas from 'Sagas';
import { Creators as applicationActions } from 'Reducers/application';

import { localConfig } from './config';
import apiMiddleware from './apiMiddleware';
import rootReducer, { history } from './rootReducer';

let middlewares = [];
const loggerOptions = { collapsed: true, duration: true, timestamp: true };

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger(loggerOptions);
const routerMiddleware = createRouterMiddleware(history);

middlewares.push(apiMiddleware);
middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware);

if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
  middlewares.push(loggerMiddleware);
}

// apply middleware and integrate DevTools
const storeEnhancers = applyMiddleware(...middlewares);
const persistedReducers = persistReducer(localConfig, rootReducer);
const store = createStore(persistedReducers, storeEnhancers);

const rehydrate = () => {
  store.dispatch(applicationActions.rehydrated());
  Api.onUnauthorized = store.dispatch.bind(null, applicationActions.reset());
};

const persistor = persistStore(store, {}, rehydrate);

sagaMiddleware.run(sagas);

export default () => ({ persistor, store });
