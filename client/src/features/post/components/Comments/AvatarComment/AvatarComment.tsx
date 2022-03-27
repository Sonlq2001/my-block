import styles from './AvatarComment.module.scss';

interface AvatarCommentProps {
  avatar?: string;
}

const AvatarComment: React.FC<AvatarCommentProps> = ({ avatar }) => {
  return (
    <div className={styles.avatarComment}>
      <img src={avatar} alt="" />
    </div>
  );
};

export default AvatarComment;
