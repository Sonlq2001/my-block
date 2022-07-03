import ImageFirstLoadChat from 'assets/images/first-load-chat.png';

import styles from './FirstLoadChat.module.scss';

const FirstLoadChat = () => {
  return (
    <div className={styles.boxFirstLoad}>
      <img src={ImageFirstLoadChat} alt="" />
      <div className={styles.boxCaption}>
        <h2>Nhắn tin chia sẻ cùng bạn bè và những người cùng sở thích</h2>
      </div>
    </div>
  );
};

export default FirstLoadChat;
