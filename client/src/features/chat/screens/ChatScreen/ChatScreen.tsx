import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import styles from './ChatScreen.module.scss';

import UserOnline from '../../components/UserOnline/UserOnline';
import Conversation from '../../components/Conversation/Conversation';
import UserOnlineAvatar from '../../components/UserOnlineAvatar/UserOnlineAvatar';
import ItemChat from '../../components/ItemChat/ItemChat';
import InputMessage from '../../components/InputMessage/InputMessage';

import { useDataToken } from 'hooks/hooks';
import { useDebounce } from 'hooks/hooks';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  getSearchUser,
  getConversations,
  getMessages,
} from '../../redux/chat.slice';
import { ConversationTypes } from '../../types/chat.types';

const ChatScreen = () => {
  const dispatch = useAppDispatch();
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<ConversationTypes[]>([]);
  const [currentUserChat, setCurrentUserChat] =
    useState<ConversationTypes | null>(null);
  const debounce = useDebounce(valueSearch, 700);
  const { _id: authId } = useDataToken();

  const isSearch = useRef<boolean>(false);

  const { conversations, messages } = useAppSelector((state) => ({
    conversations: state.chat.conversations,
    messages: state.chat.messages,
  }));

  useEffect(() => {
    if (!debounce.trim()) {
      setDataSearch([]);
      isSearch.current = false;
      return;
    }
    isSearch.current = true;
    dispatch(getSearchUser({ q: debounce }))
      .then(unwrapResult)
      .then((res) => setDataSearch(res.useSearched));
  }, [debounce, dispatch]);

  const handleChangeConversation = useCallback((data: ConversationTypes) => {
    setCurrentUserChat(data);
  }, []);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    if (currentUserChat?._id) {
      dispatch(getMessages(currentUserChat._id));
    }
  }, [dispatch, currentUserChat?._id]);

  const dataConversations = useMemo(() => {
    let result: ConversationTypes[] = [];
    conversations.list.forEach((item) => {
      (item?.recipients || [])?.forEach((cv) => {
        if (cv._id !== authId) {
          result.push({ ...cv, message: item.message });
        }
      });
    });
    return result;
  }, [conversations, authId]);

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
        <div className={styles.groupOption}>
          <div className={styles.itemTabOption}>
            <div className={styles.itemTabHeader}>
              <h2 className={styles.itemTabTxt}>Chats</h2>
              <div className={styles.groupSearch}>
                <i className="las la-search" />
                <input
                  type="text"
                  placeholder="Search messages or users"
                  onChange={(e) => setValueSearch(e.target.value)}
                  value={valueSearch}
                />
              </div>
            </div>

            {/* carousel todo user online */}
            <div className={styles.groupUseOnline}>
              <UserOnline />
              <UserOnline />
            </div>
          </div>

          {/* list message */}
          <div className={styles.groupRecent}>
            <h3>Recent</h3>
            <div className={styles.groupMsg}>
              {(isSearch.current ? dataSearch : dataConversations)?.map(
                (item) => (
                  <Conversation
                    key={item._id}
                    item={item}
                    handleChangeConversation={handleChangeConversation}
                  />
                )
              )}
            </div>
          </div>
        </div>
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
            <div className={styles.listChat}>
              <div className={styles.boxChat}>
                {messages.list?.map((msg) => (
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
