import { memo } from 'react';

import UserOnlineAvatar from '../UserOnlineAvatar/UserOnlineAvatar';

import styles from './Conversation.module.scss';
import { ConversationTypes } from '../../types/chat.types';

interface ConversationProps {
  item: ConversationTypes;
  handleChangeConversation: (data: ConversationTypes) => void;
}

const Conversation: React.FC<ConversationProps> = ({
  item,
  handleChangeConversation,
}) => {
  return (
    <div
      className={styles.itemMsg}
      onClick={() => handleChangeConversation(item)}
    >
      <UserOnlineAvatar avatar={item.avatar} />

      <div className={styles.itemContent}>
        <div className={styles.itemName}>{item.name}</div>
        {item?.message && (
          <div className={styles.itemContentMsg}>{item?.message}</div>
        )}
      </div>
      {item?.time && <div className={styles.itemTime}>{item.time}</div>}
    </div>
  );
};

export default memo(Conversation);
