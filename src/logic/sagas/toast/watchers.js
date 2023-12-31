import { takeEvery } from 'redux-saga/effects';

import { Types as ToastTypes } from 'Reducers/toast';

import { createToasts } from './';

export default [takeEvery(ToastTypes.CREATE_TOASTS, createToasts)];
