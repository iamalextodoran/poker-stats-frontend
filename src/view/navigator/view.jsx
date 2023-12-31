import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';

import Paths from 'Routes/paths';
import { publicRoutes, sessionRoutes, universalRoutes } from 'Routes';

// mount all route types even if the user has session or not
// redirect and show a toast if needed
const renderRoute = ({ hasSession, isSessionRoute }, route) => {
  const shouldRedirect = (!hasSession && isSessionRoute) || (hasSession && !isSessionRoute);
  const redirectTo = hasSession ? Paths.session.DEFAULT_PATH : Paths.public.DEFAULT_PATH;

  return (
    <Route
      key={route.path}
      path={route.path}
      element={shouldRedirect ? <Navigate to={redirectTo} replace={true} /> : <route.element />}
    />
  );
};

const Navigator = ({ hasSession = false }) => (
  <Routes>
    {publicRoutes.map(renderRoute.bind(null, { hasSession, isSessionRoute: false }))}
    {sessionRoutes.map(renderRoute.bind(null, { hasSession, isSessionRoute: true }))}
    {universalRoutes.map(renderRoute.bind(null, { hasSession: null, isSessionRoute: null }))}

    <Route path={'*'} element={<Navigate to={Paths.universal.NOT_FOUND_PATH} replace={true} />} />
  </Routes>
);

Navigator.propTypes = {
  hasSession: PropTypes.bool,
};

export default Navigator;
