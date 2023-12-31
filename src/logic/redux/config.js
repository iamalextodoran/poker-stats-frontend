import localStorage from 'redux-persist/lib/storage';

import { APPLICATION, APPLICATION_VERSION } from 'Constants';

export const localConfig = {
  blacklist: ['toast', 'router'],
  debug: false,
  key: 'poker-stats-store',
  storage: localStorage,
  version: APPLICATION_VERSION,
};
