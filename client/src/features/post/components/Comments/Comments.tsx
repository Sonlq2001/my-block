import CommentDisplay from './CommentDisplay';

import { PostItemType } from 'features/new-post/new-post';

interface CommentsProps {
  postItem: PostItemType;
}

const Comments: React.FC<CommentsProps> = ({ postItem }) => {
  return (
    <div>
      {postItem.comments.map((comment) => (
        <CommentDisplay
          key={comment._id}
          comment={comment}
          postItem={postItem}
        />
      ))}
    </div>
  );
};

export default Comments;
