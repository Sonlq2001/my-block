import CommentCard from './CommentCard';
import { CommentItemType } from './../../types/comment.types';
import { PostItemType } from 'features/new-post/new-post';

interface CommentDisplayProps {
  comment: CommentItemType;
  postItem: PostItemType;
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({
  comment,
  postItem,
}) => {
  return (
    <div>
      <CommentCard comment={comment} postItem={postItem}></CommentCard>
    </div>
  );
};

export default CommentDisplay;
