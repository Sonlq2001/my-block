import clsx from 'clsx';

import { ReactComponent as IconBookMark } from 'assets/images/icon-svg/icon-bookmark.svg';
import styles from './SavePost.module.scss';

import { useToggleSavePost } from 'hooks/useToggleSavePost';

interface SavePostProps {
  postId: string;
}

const SavePost: React.FC<SavePostProps> = ({ postId }) => {
  const { handleSavePost, activeSaved } = useToggleSavePost(postId);
  return (
    <button className={styles.savePost} onClick={handleSavePost}>
      <IconBookMark
        className={clsx(
          styles.iconBookMark,
          activeSaved && styles.activeBookMark
        )}
      />
    </button>
  );
};

export default SavePost;
