import { Outlet } from 'react-router-dom';
import { Role, UserState } from 'types/auth';

type PrivateRouteProps = {
  user: UserState;
  isAuthenticating: boolean;
  authorisedRoles: Role[];
};

function PrivateRoute(Props: PrivateRouteProps) {
  const { authorisedRoles, user, isAuthenticating } = Props;
  console.log('PrivateRoute!', Props);
  return <Outlet />;
}

export default PrivateRoute;
