import { useEffect } from 'react';

import { socketWithAuth } from 'websocket';
import { AppbarWithToolbar as Appbar } from 'components/ui/appbar';
import { PrivatePageProps } from 'types/page';

function Dashboard(props: PrivatePageProps) {
  const { user, token } = props;
  const name = user?.displayName || 'No Name';

  console.log('Dashboard', user);
  useEffect(() => {
    if (!token || !user) return;
    const emit = socketWithAuth(token);
    emit('users:get', { unitId: 'MXN0IEtpbmdzbm9ydGggR3VpZGVz' }).then(
      (response) => console.log(response)
    );
  }, [token, user]);

  return (
    <>
      <Appbar position="sticky" fluid>
        <span className="">{user?.role} Dashboard</span>
      </Appbar>

      <div className="container-fluid">
        <h1>Welcome, {name}</h1>
      </div>
    </>
  );
}

export default Dashboard;
