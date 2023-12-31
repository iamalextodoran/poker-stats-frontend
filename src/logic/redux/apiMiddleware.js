import Api from 'Api';
import { Types as TransientTypes } from 'Reducers/transient';

const setLoading = ({ isLoading, next, options }) => {
  if (!options.key) return;
  const value = isLoading ? options.value || true : false;
  next({ type: TransientTypes.LOADING, props: { [options.key]: value } });
};

const onSuccess = ({ next, rest, success }, payload = {}) => {
  if (success && success.type) {
    next({ ...rest, payload: payload.data, ...success });
  }

  if (success?.options) {
    const { props, resetTransient, updateTransient } = success.options;
    if (resetTransient) next({ type: TransientTypes.RESET });
    if (updateTransient) next({ type: TransientTypes.UPDATE_PROPS, props });
  }
};

const onFail = ({ fail, next, rest }, error = {}) => {
  if (fail && fail.type) {
    const { message = '', status = '' } = error;
    next({ ...rest, message, status, ...fail });
  }

  if (fail?.options) {
    const { props, resetTransient, updateTransient } = fail.options;
    if (resetTransient) next({ type: TransientTypes.RESET });
    if (updateTransient) next({ type: TransientTypes.UPDATE_PROPS, props });
  }
};

const onFinal = ({ load, next }) => {
  setLoading({ isLoading: false, next, options: load });
};

const apiMiddleware = () => next => action => {
  const { type, actions = {}, promise, ...rest } = action;

  const { delay = 0, load = {}, fail, success } = actions;

  if (type !== Api.API_CALL) {
    return next(action);
  }

  setLoading({ isLoading: true, next, options: load });

  setTimeout(
    () =>
      promise
        .then(onSuccess.bind(null, { next, rest, success }))
        .catch(onFail.bind(null, { fail, next, rest }))
        .finally(onFinal.bind(null, { load, next })),
    delay,
  );
};

export default apiMiddleware;
