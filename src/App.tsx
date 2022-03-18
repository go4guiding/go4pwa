import { useEffect } from 'react';

import { RootState, onAuthChanged } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';
import Routes from 'components/routes';

function App() {
  const dispatch = useAppDispatch();
  const {
    isLoading: isAuthenticating,
    isAuthenticated,
    user
  } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return <Routes user={user} isAuthorised={isAuthenticated} />;
}

export default App;
