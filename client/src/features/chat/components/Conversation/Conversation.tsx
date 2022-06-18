import { memo } from 'react';
import moment from 'moment';

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
      {item?.createdAt && (
        <div className={styles.itemTime}>
          {moment(item.createdAt).format('DD-MM-YY')}
          <span className={styles.btnConversation}>
            <i className="las la-ellipsis-h" />
          </span>

          {/* <ul className={styles.listFuture}>
            <li className={styles.itemFuture}>Xóa hội thoại</li>
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default memo(Conversation);
