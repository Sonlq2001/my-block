import { Link } from 'react-router-dom';

import { CommentItemType } from './../../types/comment.types';
import { PostItemType } from 'features/new-post/new-post';

interface CommentCardProps {
  comment: CommentItemType;
  postItem: PostItemType;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div>
      <Link to="/">
        <span>{comment.user.name}</span>
      </Link>

      <span>{comment.content}</span>
    </div>
  );
};

export default CommentCard;
