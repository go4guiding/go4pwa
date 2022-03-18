import { useCallback, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes as RouterRoutes,
  useLocation
} from 'react-router-dom';

import { Role } from 'common';
import { RouteProps, RoutesProps } from 'types/routes';
import publicRoutes from 'routes/public';

async function getPrivateRoutes(role: string) {
  const routes: RouteProps[] = [];

  switch (role) {
    case Role.Admin: {
      const adminRoutes = (await import('routes/admin')).default;
      routes.push(...adminRoutes);
      break;
    }
    case Role.Member: {
      const memberRoutes = (await import('routes/member')).default;
      routes.push(...memberRoutes);
      break;
    }
    default:
      break;
  }

  return routes;
}

function Routes(props: RoutesProps) {
  const [privateRoutes, setPrivateRoutes] = useState<RouteProps[]>([]);
  const location = useLocation();
  const { user, isAuthorised } = props;

  const renderRoute = useCallback(
    (routeProps: RouteProps, isPrivate: boolean = false) => {
      const { path, component: Component, name, ...otherProps } = routeProps;
      let element = Component && <Component />;

      if (!isAuthorised && isPrivate)
        element = (
          <Navigate
            key={name}
            to={`/sign-in?r=${encodeURI(location.pathname)}`}
            replace
          />
        );

      return <Route {...otherProps} key={name} path={path} element={element} />;
    },
    [isAuthorised, location]
  );

  useEffect(() => {
    if (!user || !user.role) return setPrivateRoutes([]);
    getPrivateRoutes('admin')
      .then(setPrivateRoutes)
      .catch((error) => {
        console.error(error);
        setPrivateRoutes([]);
      });
  }, [user]);

  return (
    <RouterRoutes>
      {publicRoutes.map((route) => renderRoute(route))}
      {privateRoutes.map((route) => renderRoute(route, true))}
    </RouterRoutes>
  );
}

export default Routes;
