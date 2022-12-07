import { memo } from 'react';

import styles from './TabContent.module.scss';

import PostItemProfile from 'components/atoms/PostItemProfile/PostItemProfile';

import { useAppSelector } from 'redux/store';
import { TAB_PROFILE } from '../../constants/profile.constants';

interface TabContentProps {
  tab: string;
}

const TabContent: React.FC<TabContentProps> = ({ tab }) => {
  const postsUserData = useAppSelector((state) => state.profile.postsUser.data);
  const postsSavedData = useAppSelector(
    (state) => state.profile.postsSaved.data
  );

  return (
    <>
      {tab === TAB_PROFILE.PUBLIC && (
        <div className={styles.itemTab}>
          {postsUserData &&
            postsUserData.length > 0 &&
            postsUserData.map((post) => (
              <PostItemProfile key={post._id} post={post} />
            ))}
        </div>
      )}
      {tab === TAB_PROFILE.SAVE && (
        <div className={styles.itemTab}>
          {postsSavedData &&
            postsSavedData.length > 0 &&
            postsSavedData.map((post) => (
              <PostItemProfile key={post._id} post={post} />
            ))}
        </div>
      )}
    </>
  );
};

export default memo(TabContent);
