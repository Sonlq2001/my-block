import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';

import ScrollToTop from './helpers/ScrollToTop';
import { getSocket } from 'redux/slices/socket.slice';
import { useAppDispatch } from 'redux/store';
import { store } from 'redux/store';

const Routes = lazy(() => import('./routes/Routes'));

const SERVER: string = 'http://localhost:5000';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket = io(SERVER, { transports: ['websocket'] });
    dispatch(getSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    const accessToken = !!store.getState().auth.accessToken;
    const listenStorage = (storageEvent: StorageEvent) => {
      console.log(storageEvent, 'storageEvent day nhe');
      if (!accessToken) {
        window.location.reload();
      }
    };
    window.addEventListener('storage', listenStorage);

    return () => {
      window.removeEventListener('storage', listenStorage);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
    </Suspense>
  );
};

export default App;
