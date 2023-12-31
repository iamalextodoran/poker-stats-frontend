import resolveConfig from 'tailwindcss/resolveConfig';

import ApplicationPackage from '../../../package.json';
import tailwindConfig from '../../../tailwind.config.js';

export const API_TIMEOUT = 10_000;

export const APPLICATION_VERSION = ApplicationPackage.version;

export const COLORS = resolveConfig(tailwindConfig)?.theme.colors;

export const TOAST_TIMEOUT = 3_000;

export const WHITE_LIST = {
  RESET_TRANSIENT: [],
  UNAUTH_ENDPOINTS: ['/auth/login'],
};
