import { takeLatest } from 'redux-saga/effects';
import { ROUTER_ON_LOCATION_CHANGED } from '@lagunovsky/redux-react-router';

import { Types as ApplicationTypes } from 'Reducers/application';

import { generalFail, onLocationChange, rehydrated, reset } from './';

export default [
  takeLatest(ROUTER_ON_LOCATION_CHANGED, onLocationChange),

  takeLatest(ApplicationTypes.GENERAL_FAIL, generalFail),
  takeLatest(ApplicationTypes.REHYDRATED, rehydrated),
  takeLatest(ApplicationTypes.RESET, reset),
];
