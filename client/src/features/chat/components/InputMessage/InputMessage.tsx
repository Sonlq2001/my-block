import { useState, useRef, useEffect, memo } from 'react';
import clsx from 'clsx';
import { unwrapResult } from '@reduxjs/toolkit';

import Icons from 'components/atoms/Icons/Icons';
import styles from './InputMessage.module.scss';
import { useDataToken } from 'hooks/hooks';
import { postMessage } from '../../redux/chat.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

interface InputMessageProps {
  recipientId: string;
}

const InputMessage: React.FC<InputMessageProps> = ({ recipientId }) => {
  const dispatch = useAppDispatch();
  const [contentChat, setContentChat] = useState<string>('');
  const [isEmoji, setIsEMoji] = useState<boolean>(false);
  const refInput = useRef<HTMLInputElement>(null);

  const { socket } = useAppSelector((state) => ({
    socket: state.socket.socketData,
  }));

  const { _id } = useDataToken();

  const handleAutoFocusInput = () => {
    return refInput.current?.focus();
  };

  const handleCallSubmit = async () => {
    if (!contentChat.trim()) {
      return;
    }
    const resMsg = await dispatch(
      postMessage({
        sender: _id,
        message: contentChat,
        recipient: recipientId,
      })
    );
    setContentChat('');
    handleAutoFocusInput();

    const dataMsg = unwrapResult(resMsg);
    // handle websocket
    socket && socket.emit('addMessage', dataMsg);
  };

  const handleSubmitChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      handleCallSubmit();
    }
  };

  useEffect(() => {
    handleAutoFocusInput();
  }, []);

  return (
    <div className={styles.groupSendChat}>
      <div className={styles.inputChat}>
        <input
          type="text"
          placeholder="Enter Message..."
          onChange={(e) => setContentChat(e.target.value)}
          onKeyPress={handleSubmitChat}
          value={contentChat}
          ref={refInput}
        />
      </div>
      <div className={styles.attackChat}>
        <div className={clsx(styles.attackChatItem)}>
          <button
            className={clsx(styles.chatItem)}
            onClick={() => setIsEMoji(!isEmoji)}
          >
            <Icons
              open={isEmoji}
              content={contentChat}
              setContent={setContentChat}
            />
          </button>
        </div>
        <div className={clsx(styles.attackChatItem)}>
          <button className={clsx(styles.chatItem)}>
            <i className="las la-paperclip" />
          </button>
        </div>
        <div className={clsx(styles.attackChatItem)}>
          <button className={clsx(styles.chatItem)}>
            <i className="las la-image" />
          </button>
        </div>
        <div className={clsx(styles.attackChatItem)}>
          <button
            className={clsx(styles.chatItemSend, styles.chatItem)}
            onClick={handleCallSubmit}
          >
            <i className="las la-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(InputMessage);
