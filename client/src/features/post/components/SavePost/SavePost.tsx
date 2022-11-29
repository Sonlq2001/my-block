import { useState } from 'react';

import StarActive from 'assets/images/star-active.png';
// import StarNotActive from 'assets/images/star-not-active.png';
import { ReactComponent as IconBookMark } from 'assets/images/icon-svg/icon-bookmark-active.svg';
import styles from './SavePost.module.scss';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { patchSavePost, patchUnSavePost } from '../../redux/post.slice';

interface SavePostProps {
  postId?: string;
  authPostId?: string;
}

const SavePost: React.FC<SavePostProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => ({
    userInfo: state.user.userInfo,
  }));
  const [isSave, setIsSave] = useState<boolean>(
    userInfo.savePost.includes(postId)
  );

  const handleSavePost = () => {
    setIsSave(!isSave);
    const actionDispatch = isSave ? patchUnSavePost : patchSavePost;
    if (postId) {
      dispatch(actionDispatch(postId));
    }
  };
  return (
    <div className={styles.savePost} onClick={handleSavePost}>
      {isSave ? (
        <img src={StarActive} alt="" />
      ) : (
        // <img src={StarNotActive} alt="" />
        <IconBookMark className={styles.iconBookMark} />
      )}
    </div>
  );
};

export default SavePost;
