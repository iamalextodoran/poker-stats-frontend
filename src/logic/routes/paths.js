const SIGN_IN_PATH = '/';
const SIGN_UP_PATH = '/sign-up';

const DASHBOARD_PATH = '/dashboard';
const SETTINGS_PATH = '/settings';

const NOT_FOUND_PATH = '/404';

const publicPaths = {
  DEFAULT_PATH: SIGN_IN_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
};

const sessionPaths = {
  DASHBOARD_PATH,
  DEFAULT_PATH: DASHBOARD_PATH,
  SETTINGS_PATH,
};

const universalPaths = { NOT_FOUND_PATH };

export default { public: publicPaths, session: sessionPaths, universal: universalPaths };
