import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Role } from 'common';
import { RootState, onAuthChanged } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';

import { StartPage } from 'pages/public';
import { SignInPage, SignUpPage } from 'pages/auth';
import { PageNotFound } from 'pages/error';
import PrivateRoute from 'components/private-route';
// import Routes from 'components/routes';

function App() {
  const dispatch = useAppDispatch();
  // const { isInitialLoad } = useAppSelector((state: RootState) => state.app);
  const { user, isLoading: isAuthenticating } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/">
        <Route index element={<StartPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      {/* Member Routes */}
      <Route path="/members">
        <Route
          element={
            <PrivateRoute
              user={user}
              isAuthenticating={isAuthenticating}
              authorisedRoles={[Role.Member]}
            />
          }
        >
          <Route index element={<div>{'Members Only'}</div>} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route
          element={
            <PrivateRoute
              user={user}
              isAuthenticating={isAuthenticating}
              authorisedRoles={[Role.Admin]}
            />
          }
        >
          <Route index element={<div>{'Admins Only'}</div>} />
        </Route>
      </Route>

      {/* Catch All Route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
