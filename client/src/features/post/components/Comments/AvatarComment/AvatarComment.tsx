import { Link } from 'react-router-dom';

import styles from './AvatarComment.module.scss';
import { ProfilePathsEnum } from 'features/profile/profile';

interface AvatarCommentProps {
  avatar?: string;
  userId: string;
}

const AvatarComment: React.FC<AvatarCommentProps> = ({ avatar, userId }) => {
  return (
    <div className={styles.avatarComment}>
      <Link to={ProfilePathsEnum.PROFILE.replace(/:user_id/, userId)}>
        <img src={avatar} alt="" />
      </Link>
    </div>
  );
};

export default AvatarComment;
