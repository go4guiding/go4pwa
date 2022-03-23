import { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Role } from 'common';
import { RootState, onAuthChanged } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';

import PrivateRoute from 'components/private-route';

function App() {
  const dispatch = useAppDispatch();
  // const { isInitialLoad } = useAppSelector((state: RootState) => state.app);
  const { user, isLoading: isAuthenticating } = useAppSelector(
    (state: RootState) => state.auth
  );

  const PR = useMemo(
    () => (props: any) =>
      (
        <PrivateRoute
          {...props}
          user={user}
          isAuthenticating={isAuthenticating}
        />
      ),
    [user, isAuthenticating]
  );

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/">
        <Route index element={<div>{'Start Page'}</div>} />
        <Route path="sign-in" element={<div>{'Sign In Page'}</div>} />
        <Route path="sign-up" element={<div>{'Sign Up Page'}</div>} />
      </Route>

      {/* Member Routes */}
      <Route path="/members">
        <Route element={<PR authorisedRoles={[Role.Member]} />}>
          <Route index element={<div>{'Members Only'}</div>} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route element={<PR authorisedRoles={[Role.Admin]} />}>
          <Route index element={<div>{'Admins Only'}</div>} />
        </Route>
      </Route>

      {/* Catch All Route */}
      <Route path="*" element={<div>{'Page Not Found'}</div>} />
    </Routes>
  );
}

export default App;
