import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';

import ScrollToTop from './helpers/ScrollToTop';
import { getSocket } from 'redux/slices/socket.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import SocketClient from 'helpers/SocketClient';
import { getNotifies } from 'features/notify/notify';
import { getUserInfo } from 'features/user/user';
import { store } from 'redux/store';
import Snackbar from 'components/atoms/Snackbar/Snackbar';

const Routes = lazy(() => import('./routes/Routes'));

const SERVER: string = 'http://localhost:5000';

const App = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const loggedInStateOnRedux = !!store.getState().auth.accessToken;
    const listenStorage = (storageEvent: StorageEvent) => {
      console.log(storageEvent, 'day nhe');
      if (storageEvent.key === 'auth') {
        if (loggedInStateOnRedux) {
          window.location.reload();
        }
      }
    };

    window.addEventListener('storage', listenStorage);

    return () => {
      window.removeEventListener('storage', listenStorage);
    };
  }, []);

  useEffect(() => {
    const socket = io(SERVER, { transports: ['websocket'] });
    dispatch(getSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      Promise.all([dispatch(getNotifies()), dispatch(getUserInfo())]);
    }
  }, [dispatch, accessToken]);

  return (
    <Router>
      <Suspense fallback={null}>
        {accessToken && <SocketClient />}
        <Snackbar />
        <ScrollToTop />
        <Routes />
      </Suspense>
    </Router>
  );
};

export default App;
