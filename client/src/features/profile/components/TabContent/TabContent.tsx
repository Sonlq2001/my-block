import { memo } from 'react';

import styles from './TabContent.module.scss';

import PostItemProfile from 'components/atoms/PostItemProfile/PostItemProfile';

import { useAppSelector } from 'redux/store';
import { QueryParams } from '../../types/profile.types';
interface TabContentProps {
  queries: QueryParams;
  userId: string;
}

const TabContent: React.FC<TabContentProps> = ({ queries, userId }) => {
  const postsUserData = useAppSelector((state) => state.profile.postsUser.data);

  return (
    <div className={styles.itemTab}>
      {postsUserData &&
        postsUserData.length > 0 &&
        postsUserData.map((post) => (
          <PostItemProfile
            key={post._id}
            post={post}
            queries={queries}
            userId={userId}
          />
        ))}
    </div>
  );
};

export default memo(TabContent);
