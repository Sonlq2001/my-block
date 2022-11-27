import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { AccessTokenType } from 'types/access-token.types';
import { updateNotify } from 'features/notify/notify';
import { updateMessage } from 'features/chat/chat';

const SocketClient = () => {
  const dispatch = useAppDispatch();
  const { accessToken, socketData, userInfo } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
    socketData: state.socket.socketData,
    userInfo: state.user.userInfo,
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

  // message
  useEffect(() => {
    if (!socketData) return;

    socketData.on('addMessageClient', (data) => {
      dispatch(updateMessage(data));
    });

    return () => {
      socketData.off('addMessageClient');
    };
  }, [socketData, dispatch]);

  // online / offline
  useEffect(() => {
    if (!socketData) return;

    socketData.emit('userOnline', userInfo);
  }, [socketData, userInfo]);
  return null;
};

export default SocketClient;
