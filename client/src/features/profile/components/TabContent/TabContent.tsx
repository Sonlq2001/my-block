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
  const postsDraftData = useAppSelector(
    (state) => state.profile.postsDraft.data
  );
  const postsPrivateData = useAppSelector(
    (state) => state.profile.postsPrivate.data
  );

  return (
    <>
      {tab === TAB_PROFILE.PUBLIC && (
        <div className={styles.itemTab}>
          {postsUserData &&
            postsUserData.length > 0 &&
            postsUserData.map((post) => (
              <PostItemProfile key={post._id} post={post} tab={tab} />
            ))}
        </div>
      )}
      {tab === TAB_PROFILE.SAVE && (
        <div className={styles.itemTab}>
          {postsSavedData &&
            postsSavedData.length > 0 &&
            postsSavedData.map((post) => (
              <PostItemProfile key={post._id} post={post} tab={tab} />
            ))}
        </div>
      )}
      {tab === TAB_PROFILE.DRAFT && (
        <div className={styles.itemTab}>
          {postsDraftData &&
            postsDraftData.length > 0 &&
            postsDraftData.map((post) => (
              <PostItemProfile key={post._id} post={post} tab={tab} />
            ))}
        </div>
      )}
      {tab === TAB_PROFILE.PRIVATE && (
        <div className={styles.itemTab}>
          {postsPrivateData &&
            postsPrivateData.length > 0 &&
            postsPrivateData.map((post) => (
              <PostItemProfile key={post._id} post={post} tab={tab} />
            ))}
        </div>
      )}
    </>
  );
};

export default memo(TabContent);
