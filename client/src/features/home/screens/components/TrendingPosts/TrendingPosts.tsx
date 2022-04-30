import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import { ReactComponent as IconTrending } from 'assets/images/trending.svg';
import styles from './TrendingPosts.module.scss';
import PostTrendingItem from 'components/atoms/PostTrendingItem/PostTrendingItem';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import { PostPathsEnum } from 'features/post/post';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPostsTrending } from 'features/home/home';

const TrendingPosts = () => {
  const dispatch = useAppDispatch();
  const { listPostTrending, isLoadingPostsTrending } = useAppSelector(
    (state) => ({
      listPostTrending: state.home.postsTrending,
      isLoadingPostsTrending: state.home.isLoadingPostsTrending,
    })
  );
  useEffect(() => {
    dispatch(getPostsTrending());
  }, [dispatch]);
  const [postTrendingBig, ...postsTrending] = listPostTrending;

  return (
    <div className="container">
      <TitleMain
        title={'Trending Posts'}
        icon={<IconTrending />}
        description={'Dolorem rerum error assumenda temporibus quo voluptas'}
      />

      {!isLoadingPostsTrending && (
        <div className={styles.trendingGroup}>
          {listPostTrending.length > 0 && (
            <div className={styles.postMain}>
              <div className={styles.postHeader}>
                <img src={postTrendingBig.avatar.img} alt="" />
              </div>

              <div className={styles.postBody}>
                <h3 className={styles.postTitle}>
                  <Link
                    to={PostPathsEnum.POST.replace(
                      /:post_id/,
                      postTrendingBig._id
                    )}
                  >
                    {postTrendingBig.titleInside}
                  </Link>
                </h3>
                <p className={styles.postDes}>{postTrendingBig.description}</p>

                <PostCardAuth
                  auth="sonel"
                  time={moment(postTrendingBig.createdAt).fromNow()}
                />
              </div>

              <div className="post-footer"></div>
            </div>
          )}

          <div className={styles.postItemGroup}>
            {postsTrending.map((post) => (
              <PostTrendingItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;
