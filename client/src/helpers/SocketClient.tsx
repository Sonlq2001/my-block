import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { AccessTokenType } from 'types/access-token.types';
import { updateNotify } from 'features/notify/notify';

const SocketClient = () => {
  const dispatch = useAppDispatch();
  const { accessToken, socketData } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
    socketData: state.socket.socketData,
  }));

  const decodeData = accessToken && jwt_decode<AccessTokenType>(accessToken);

  useEffect(() => {
    if (decodeData) {
      socketData?.emit('joinUser', decodeData._id);
    }
  }, [decodeData, socketData]);

  // notify
  useEffect(() => {
    if (!socketData) return;

    socketData.on('createNotifyToClient', (data) => {
      dispatch(updateNotify(data));
    });

    return () => {
      socketData.off('createNotifyToClient');
    };
  }, [socketData, dispatch]);

  return <div></div>;
};

export default SocketClient;
