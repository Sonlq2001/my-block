import { memo } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import { unwrapResult } from '@reduxjs/toolkit';

import UserOnlineAvatar from '../UserOnlineAvatar/UserOnlineAvatar';

import styles from './Conversation.module.scss';
import { ConversationTypes } from '../../types/chat.types';
import {
  deleteConversation,
  resetCurrentChat,
  currentChatUser,
} from '../../redux/chat.slice';
import { useAppDispatch } from 'redux/store';

interface ConversationProps {
  item: ConversationTypes;
  futureId: string | null;
  setFutureId: (id: string | null) => void;
}

const Conversation: React.FC<ConversationProps> = ({
  item,
  futureId,
  setFutureId,
}) => {
  const dispatch = useAppDispatch();

  const handleConversation = () => {
    dispatch(deleteConversation(item.conversationId))
      .then(unwrapResult)
      .then((res) => {
        dispatch(resetCurrentChat(res.conversation._id));
        setFutureId(null);
      })
      .catch((error) => {
        // to do handle error
        console.log('lỗi xóa conversation');
      });
  };
  return (
    <div className={styles.itemMsg}>
      {futureId === item._id && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setFutureId(null);
          }}
        >
          <ul className={clsx(styles.listFuture)}>
            <li className={styles.itemFuture} onClick={handleConversation}>
              Xóa hội thoại
            </li>
          </ul>
        </OutsideClickHandler>
      )}
      <div
        className={styles.boxMsg}
        onClick={() => {
          dispatch(currentChatUser(item));
        }}
      >
        <UserOnlineAvatar avatar={item.avatar} />
        <div className={styles.itemContent}>
          <div className={styles.itemName}>{item.name}</div>
          {item?.message && (
            <div className={styles.itemContentMsg}>{item?.message}</div>
          )}
        </div>
        <div className={styles.itemTime}>
          {item?.createdAt && <>{moment(item.createdAt).format('DD-MM-YY')}</>}
          <span
            className={clsx(styles.btnConversation)}
            onClick={(e) => {
              e.stopPropagation();
              setFutureId(item._id === futureId ? null : item._id);
            }}
          >
            <i className="las la-ellipsis-h" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Conversation);
