import { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Role } from 'common';
import { RootState, onAuthChanged } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';
import { signIn } from 'store/auth';

import PrivateRoute from 'components/private-route';
import { AdminDashboard } from 'pages/admin';

function App() {
  const dispatch = useAppDispatch();
  // const { isInitialLoad } = useAppSelector((state: RootState) => state.app);
  const {
    user,
    isLoading: isAuthenticating,
    token
  } = useAppSelector((state: RootState) => state.auth);

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
        <Route index element={<span>{'Start Page'}</span>} />
        <Route path="sign-in" element={<span>{'Sign In Page'}</span>} />
        <Route path="sign-up" element={<span>{'Sign Up Page'}</span>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route element={<PR authorisedRoles={[Role.Admin, Role.Leader]} />}>
          <Route index element={<AdminDashboard user={user} token={token} />} />
        </Route>
      </Route>

      {/* Catch All Route */}
      <Route path="*" element={<span>{'Page Not Found'}</span>} />
    </Routes>
  );
}

export default App;
