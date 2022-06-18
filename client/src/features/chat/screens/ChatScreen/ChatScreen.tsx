import { useEffect, useState, useRef, useCallback } from 'react';

import { Link } from 'react-router-dom';

import styles from './ChatScreen.module.scss';

import UserOnlineAvatar from '../../components/UserOnlineAvatar/UserOnlineAvatar';
import ItemChat from '../../components/ItemChat/ItemChat';
import InputMessage from '../../components/InputMessage/InputMessage';
import ListCurrentChat from '../../components/ListCurrentChat/ListCurrentChat';
import LoadingChat from 'components/loading/LoadingChat/LoadingChat';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getConversations, getMessages } from '../../redux/chat.slice';
import { ConversationTypes } from '../../types/chat.types';

const ChatScreen = () => {
  const dispatch = useAppDispatch();

  const [currentUserChat, setCurrentUserChat] =
    useState<ConversationTypes | null>(null);

  const boxElementChat = useRef<HTMLDivElement | null>(null);

  const { messages, isLoadingMessages } = useAppSelector((state) => ({
    messages: state.chat.messages?.listMessage?.list,
    isLoadingMessages: state.chat.isLoadingMessages,
  }));

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    if (currentUserChat?._id) {
      dispatch(getMessages(currentUserChat._id));
    }
  }, [dispatch, currentUserChat?._id]);

  const handleChangeConversation = useCallback((data: ConversationTypes) => {
    setCurrentUserChat(data);
  }, []);

  // scroll to message
  useEffect(() => {
    if (messages && messages.length > 0) {
      setTimeout(() => {
        boxElementChat.current?.scrollIntoView({
          block: 'end',
        });
      }, 0);
    }
  }, [messages]);

  return (
    <div className={styles.appChat}>
      <div className={styles.sidebarChat}>
        <div className={styles.sidebarOption}>
          <Link to="/">logo</Link>
          <ul className={styles.listOption}>
            <li className={styles.itemOption}>
              <i className="las la-user-tie" />
            </li>
            <li className={styles.itemOption}>
              <i className="las la-user-tie" />
            </li>
            <li className={styles.itemOption}>
              <i className="las la-user-tie" />
            </li>
          </ul>
          <ul className={styles.listOption}>
            <li className={styles.itemOption}>
              <i className="las la-globe-americas" />
            </li>
          </ul>
        </div>

        <ListCurrentChat handleChangeConversation={handleChangeConversation} />
      </div>
      {currentUserChat ? (
        <div className={styles.conversation}>
          <div className={styles.headerChat}>
            <div className={styles.userChat}>
              <UserOnlineAvatar avatar={currentUserChat.avatar} />
              <div className={styles.userNameChat}>{currentUserChat.name}</div>
            </div>
            <div className={styles.groupAction}>
              <div>search</div>
            </div>
          </div>

          <div className={styles.contentChat}>
            {isLoadingMessages && <LoadingChat />}
            <div className={styles.listChat}>
              <div className={styles.boxChat} ref={boxElementChat}>
                {!isLoadingMessages &&
                  messages?.map((msg) => (
                    <ItemChat key={msg._id} contentMsg={msg} />
                  ))}
              </div>
            </div>

            <InputMessage recipientId={currentUserChat._id} />
          </div>
        </div>
      ) : (
        <div>Chat di</div>
      )}
    </div>
  );
};

export default ChatScreen;
