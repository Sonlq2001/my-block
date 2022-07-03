import { useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import styles from './ChatScreen.module.scss';

import UserOnlineAvatar from '../../components/UserOnlineAvatar/UserOnlineAvatar';
import ItemChat from '../../components/ItemChat/ItemChat';
import InputMessage from '../../components/InputMessage/InputMessage';
import ListCurrentChat from '../../components/ListCurrentChat/ListCurrentChat';
import LoadingChat from 'components/loading/LoadingChat/LoadingChat';
import FirstLoadChat from '../../components/FirstLoadChat/FirstLoadChat';

import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  getConversations,
  getMessages,
  resetCurrentChat,
} from '../../redux/chat.slice';

const ChatScreen = () => {
  const dispatch = useAppDispatch();

  const boxElementChat = useRef<HTMLDivElement | null>(null);

  const { messages, isLoadingMessages, currentChat } = useAppSelector(
    (state) => ({
      messages: state.chat.messages?.data?.listMessage?.list,
      isLoadingMessages: state.chat.isLoadingMessages,
      currentChat: state.chat.messages.currentChatUser,
    })
  );

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    if (currentChat?._id) {
      dispatch(getMessages(currentChat._id));
    }
  }, [dispatch, currentChat?._id]);

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

  useEffect(() => {
    return () => {
      dispatch(resetCurrentChat(null));
    };
  }, [dispatch]);

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

        <ListCurrentChat />
      </div>
      {currentChat ? (
        <div className={styles.conversation}>
          <div className={styles.headerChat}>
            <div className={styles.userChat}>
              <UserOnlineAvatar avatar={currentChat.avatar} />
              <div className={styles.userNameChat}>{currentChat.name}</div>
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

            <InputMessage recipientId={currentChat._id} />
          </div>
        </div>
      ) : (
        <FirstLoadChat />
      )}
    </div>
  );
};

export default ChatScreen;
