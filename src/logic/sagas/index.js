import { all } from 'redux-saga/effects';

import toastWatchers from './toast/watchers';
import settingsWatchers from './settings/watchers';
import applicationWatchers from './application/watchers';

export default function* root() {
  yield all([...applicationWatchers, ...settingsWatchers, ...toastWatchers]);
}
