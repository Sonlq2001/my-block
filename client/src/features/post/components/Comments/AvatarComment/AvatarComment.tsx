import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './AvatarComment.module.scss';
import { ProfilePathsEnum } from 'features/profile/profile';

interface AvatarCommentProps {
  avatar: string;
  userId: string;
}

const AvatarComment: FC<AvatarCommentProps> = ({ avatar, userId }) => {
  return (
    <div className={styles.avatarComment}>
      <Link to={ProfilePathsEnum.PROFILE.replace(/:userId/, userId)}>
        <img src={avatar} alt="avatar-comment" />
      </Link>
    </div>
  );
};

export default memo(AvatarComment);
