import { delay, put } from 'redux-saga/effects';

import { uuid } from 'Helpers';
import { TOAST_TIMEOUT } from 'Constants';
import { Types as ToastTypes } from 'Reducers/toast';

const addId = (toast = {}) => ({ ...toast, id: uuid() });

export const createToasts = function* ({ toasts }) {
  const reshapedToasts = toasts.map(addId);
  yield put({ type: ToastTypes.PUSH_TOASTS, items: reshapedToasts });
  yield delay(TOAST_TIMEOUT);
  yield put({ type: ToastTypes.POP_TOASTS, items: reshapedToasts });
};
