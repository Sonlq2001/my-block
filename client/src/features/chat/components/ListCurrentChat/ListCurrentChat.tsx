import { useState, useRef, useEffect, useMemo, memo } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { useDebounce, useDataToken } from 'hooks/hooks';
import { useAppDispatch, useAppSelector } from 'redux/store';

import styles from './ListCurrentChat.module.scss';
import { ConversationTypes } from '../../types/chat.types';
import { getSearchUser } from '../../redux/chat.slice';

import UserOnline from '../UserOnline/UserOnline';
import Conversation from '../Conversation/Conversation';

const ListCurrentChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<ConversationTypes[]>([]);
  const [futureId, setFutureId] = useState<string | null>(null);
  const debounce = useDebounce(valueSearch, 700);

  const isSearch = useRef<boolean>(false);
  const { _id: authId } = useDataToken();

  const { conversations } = useAppSelector((state) => ({
    conversations: state.chat.conversations,
  }));

  // handleSearch user
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

  const dataConversations = useMemo(() => {
    let result: ConversationTypes[] = [];
    conversations.list.forEach((item) => {
      (item?.recipients || [])?.forEach((cv) => {
        if (cv._id !== authId) {
          result.push({
            ...cv,
            message: item.message,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            conversationId: item._id,
          });
        }
      });
    });
    return result;
  }, [conversations, authId]);

  return (
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
          {(isSearch.current ? dataSearch : dataConversations)?.map((item) => (
            <Conversation
              key={item._id}
              item={item}
              futureId={futureId}
              setFutureId={setFutureId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ListCurrentChat);
