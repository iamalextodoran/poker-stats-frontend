import { put, select } from 'redux-saga/effects';

import Api from 'Api';
import { WHITE_LIST } from 'Constants';
import { Types as ToastTypes } from 'Reducers/toast';
import { Types as RootTypes } from 'Redux/rootReducer';
import { Types as TransientTypes } from 'Reducers/transient';

export const generalFail = function* ({ message = '' }) {
  if (!message) return;
  yield put({ type: ToastTypes.CREATE_TOASTS, toasts: [{ title: message, icon: undefined }] });
};

export const onLocationChange = function* ({ payload: router }) {
  const currentPath = router.location.pathname;

  const isInWhiteList = WHITE_LIST.RESET_TRANSIENT.some(({ path = '', exact = true }) => {
    if (exact) {
      return path === currentPath;
    } else {
      return currentPath.includes(path);
    }
  });

  if (!isInWhiteList) {
    yield put({ type: TransientTypes.RESET });
  }
};

export const rehydrated = function* () {
  const hasSession = yield select(() => false);
  const token = yield select(() => '');

  if (hasSession) {
    Api.setToken(token);
  }
};

export const reset = function* () {
  yield put({ type: RootTypes.RESET });
};
