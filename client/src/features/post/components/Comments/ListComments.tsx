import { FC, useEffect, useState, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';

import InputComment from './InputComment/InputComment';
import LoadingCircleDot from 'components/loading/LoadingCircleDot/LoadingCircleDot';
import Comments from './../../components/Comments/Comments';
import IconArrowDown from 'assets/images/arrow-line-down.png';

import { PostParams } from '../../types/post.types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getComments, postComment } from '../../redux/post.slice';
import styles from './ListComments.module.scss';
import { useDataToken } from 'hooks/hooks';
import { ParamsPaginate } from '../../types/comment.types';
import {
  DEFAULT_PER_PAGE_COMMENT,
  DEFAULT_PAGE_COMMENT,
} from '../../constants/post.constants';

interface ListCommentsProps {
  postId: string;
  allowComment: boolean;
}

const ListComments: FC<ListCommentsProps> = ({ postId, allowComment }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMoreCmt, setIsLoadingMoreCmt] = useState<boolean>(false);
  const [query, setQuery] = useState<ParamsPaginate>({
    page: DEFAULT_PAGE_COMMENT,
    perPage: DEFAULT_PER_PAGE_COMMENT,
  });
  const { slug } = useParams<PostParams>();
  const { _id } = useDataToken();

  const listComments = useAppSelector((state) => state.post.comments.list);
  const total = useAppSelector((state) => state.post.comments.total);
  const totalLoad = useAppSelector((state) => state.post.comments.totalLoad);

  const fetchComments = useCallback(
    async (
      queryParams: { page: number; perPage: number },
      parentComment?: string
    ) => {
      return await dispatch(
        getComments({
          slug,
          parentComment,
          ...queryParams,
        })
      );
    },
    [dispatch, slug]
  );

  useEffect(() => {
    if (!slug || !isLoading) return;
    fetchComments(query).finally(() => setIsLoading(false));
  }, [fetchComments, isLoading, query, slug]);

  const handleComment = async (value: string) => {
    if (!_id) return;

    dispatch(
      postComment({
        content: value,
        user: _id,
        post: postId,
      })
    );
  };

  const handleLoadMoreComment = () => {
    const newQuery = { ...query, page: query.page + 1 };
    setQuery(newQuery);
    setIsLoadingMoreCmt(true);
    fetchComments(newQuery).finally(() => setIsLoadingMoreCmt(false));
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!allowComment) {
    return <div>ko cmt</div>;
  }

  return (
    <div className={styles.listComment}>
      <p className={styles.totalComment}>
        {total}
        <span>bình luận</span>
      </p>
      <div className={styles.comments}>
        <InputComment getValue={handleComment} />

        <div className={styles.commentBox}>
          {listComments.length > 0 &&
            listComments.map((comment) => (
              <Comments
                key={comment._id}
                comment={comment}
                fetchComments={fetchComments}
              />
            ))}
          {totalLoad < total && (
            <button
              className={styles.btnMoreComment}
              onClick={handleLoadMoreComment}
            >
              <span>Xem thêm bình luận</span>
              {isLoadingMoreCmt ? (
                <LoadingCircleDot />
              ) : (
                <img src={IconArrowDown} alt="icon-arrow-down" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ListComments);
