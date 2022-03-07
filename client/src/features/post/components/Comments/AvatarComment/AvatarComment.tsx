import styles from './AvatarComment.module.scss';

interface AvatarCommentProps {
  avatar?: string;
}

const AvatarComment: React.FC<AvatarCommentProps> = ({ avatar }) => {
  return (
    <div className={styles.avatarComment}>
      <img
        src="https://cdn.pixabay.com/photo/2016/02/19/20/57/iceland-1211171_960_720.jpg"
        alt=""
      />
    </div>
  );
};

export default AvatarComment;
