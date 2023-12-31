import axios from 'axios';

import { mock } from 'Helpers';
import { API_TIMEOUT, WHITE_LIST } from 'Constants';

let token = null;

const defaultConfig = {
  baseURL: `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX || ''}`,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const api = axios.create(defaultConfig);

const interceptors = {
  handleRequest: config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  handleRequestError: async error => error,
  handleResponse: response => response.data,
  handleResponseError: async error => {
    if (Api.API_CANCELED === error.code) {
      return;
    }

    if ([Api.NETWORK_ERROR, Api.TIMEOUT_ERROR].includes(error.code)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !WHITE_LIST.UNAUTH_ENDPOINTS.includes(error.config.url)) {
      Api.onUnauthorized();
    }

    return Promise.reject(error.response?.data);
  },
};

api.interceptors.request.use(interceptors.handleRequest, interceptors.handleRequestError);
api.interceptors.response.use(interceptors.handleResponse, interceptors.handleResponseError);

const Api = {
  API_CALL: 'API_CALL',
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'ERR_NETWORK',
  TIMEOUT_ERROR: 'ECONNABORTED',
  API_CANCELED: 'ERR_CANCELED',

  catchError: error => error,

  setToken: newToken => (token = newToken),

  onUnauthorized: mock,

  delete: (path, config = defaultConfig) => {
    const request = api.delete(path, config);
    request.catch(Api.catchError);
    return request;
  },

  get: (path, params = {}, config = defaultConfig) => {
    const request = api.get(path, { ...config, params });
    request.catch(Api.catchError);
    return request;
  },

  patch: (path, body, config = defaultConfig) => {
    const request = api.patch(path, body, config);
    request.catch(Api.catchError);
    return request;
  },

  post: (path, body, config = defaultConfig) => {
    const request = api.post(path, body, config);
    request.catch(Api.catchError);
    return request;
  },

  put: (path, body, config = defaultConfig) => {
    const request = api.put(path, body, config);
    request.catch(Api.catchError);
    return request;
  },
};

export default Api;
