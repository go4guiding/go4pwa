import { useEffect } from 'react';

import { RootState, onAuthChanged } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';
import Routes from 'components/routes';

function App() {
  const dispatch = useAppDispatch();
  const {
    isLoading: isAuthenticating,
    isValid: isAuthValid,
    user
  } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return <Routes user={user} isAuthorised={!isAuthenticating && isAuthValid} />;
}

export default App;
