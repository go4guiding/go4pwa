import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Role, UserState } from 'types/auth';

type PrivateRouteProps = {
  user: UserState;
  isAuthenticating: boolean;
  authorisedRoles: Role[];
};

function PrivateRoute(Props: PrivateRouteProps) {
  const { authorisedRoles, user, isAuthenticating } = Props;
  const location = useLocation();
  const navigate = useNavigate();

  const isUnauthorised =
    !isAuthenticating && !(user && authorisedRoles.includes(user.role));

  useEffect(() => {
    if (!isAuthenticating && !user)
      navigate(`/sign-in?r=${encodeURI(location.pathname)}`);
  }, [user, isAuthenticating, location, navigate]);

  return !isUnauthorised ? <Outlet /> : <div>{'Unauthorised Access'}</div>;
}

export default PrivateRoute;
