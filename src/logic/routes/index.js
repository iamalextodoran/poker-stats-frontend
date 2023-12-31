import Pages from 'Pages';

import Paths from './paths';

// public

const SignIn = {
  path: Paths.public.SIGN_IN_PATH,
  element: Pages.public.SignIn,
};

const SignUp = {
  path: Paths.public.SIGN_UP_PATH,
  element: Pages.public.SignUp,
};

// session

const Dashboard = {
  path: Paths.session.DASHBOARD_PATH,
  element: Pages.session.Dashboard,
};

const Settings = {
  path: `${Paths.session.SETTINGS_PATH}/:tabName?/:secondaryTabName?`,
  element: Pages.session.Settings,
};

// universal

const NotFound = {
  path: Paths.universal.NOT_FOUND_PATH,
  element: Pages.universal.NotFound,
};

export const publicRoutes = [SignIn, SignUp];

export const sessionRoutes = [Dashboard, Settings];

export const universalRoutes = [NotFound];

export default { public: publicRoutes, session: sessionRoutes, universal: universalRoutes };
