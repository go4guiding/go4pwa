import { useCallback, useEffect, useMemo } from 'react';
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

  const isUnauthorised = useMemo(
    () => !isAuthenticating && !(user && authorisedRoles.includes(user.role)),
    [isAuthenticating, authorisedRoles, user]
  );

  const render = useCallback(() => {
    if (isAuthenticating) return <div>{'Authenticating...'}</div>;
    if (isUnauthorised) return <div>{'Unauthorised Access'}</div>;
    return <Outlet />;
  }, [isAuthenticating, isUnauthorised]);

  useEffect(() => {
    if (!isAuthenticating && !user)
      navigate(`/sign-in?r=${encodeURI(location.pathname)}`);
  }, [user, isAuthenticating, location, navigate]);

  return render();
}

export default PrivateRoute;
