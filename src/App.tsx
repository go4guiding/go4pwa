import { useEffect } from 'react';

import { RootState, onAuthChanged } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';

function App() {
  const dispatch = useAppDispatch();
  const { isLoading: isAuthenticating } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return null;
}

export default App;
