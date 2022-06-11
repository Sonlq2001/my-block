import { memo } from 'react';

import clsx from 'clsx';

import UserOnlineAvatar from '../UserOnlineAvatar/UserOnlineAvatar';
import { useDataToken } from 'hooks/hooks';
import { ContentMessage } from '../../types/chat.types';

import styles from './ItemChat.module.scss';

interface ItemChatProps {
  contentMsg: ContentMessage;
}

const ItemChat: React.FC<ItemChatProps> = ({ contentMsg }) => {
  const { _id } = useDataToken();
  return (
    <>
      {contentMsg.sender._id !== _id && (
        <div className={clsx(styles.itemChat)}>
          <div className={styles.avatarChat}>
            <UserOnlineAvatar onlyAvatar avatar={contentMsg.sender.avatar} />
          </div>

          <div className={styles.useChatContent}>
            <div className={styles.boxChat}>
              <div className={styles.textChat}>{contentMsg.message}</div>
              <div className={styles.timeChat}>10:00</div>
            </div>
            <div className={styles.nameUserChat}>{contentMsg.sender.name}</div>

            <div className={styles.iconDropdown}>
              <i className="las la-ellipsis-v" />
            </div>
          </div>
        </div>
      )}

      {contentMsg.sender._id === _id && (
        <div className={clsx(styles.itemChat, styles.myChat)}>
          <div className={(styles.avatarChat, styles.myAvatarChat)}>
            <UserOnlineAvatar onlyAvatar avatar={contentMsg.sender.avatar} />
          </div>

          <div className={styles.useChatContent}>
            <div className={clsx(styles.boxChat, styles.myBoxChat)}>
              <div className={styles.textChat}>{contentMsg.message}</div>
              <div className={styles.timeChat}>10:00</div>
            </div>
            <div className={styles.nameUserChat}>{contentMsg.sender.name}</div>

            <div className={clsx(styles.iconDropdown, styles.myIconDropdown)}>
              <i className="las la-ellipsis-v" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ItemChat);
