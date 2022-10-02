import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import { ReactComponent as IconTrending } from 'assets/images/trending.svg';
import styles from './TrendingPosts.module.scss';
import PostTrendingItem from 'components/atoms/PostTrendingItem/PostTrendingItem';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import { PostPathsEnum } from 'features/post/post';
import LoadingTrending from 'components/loading/LoadingTrending/LoadingTrending';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPostsHome } from 'features/home/home';
import { TYPE_POST } from 'features/home/home';

const TrendingPosts = () => {
  const dispatch = useAppDispatch();
  const { listPostTrending, isLoadingPostsTrending } = useAppSelector(
    (state) => ({
      listPostTrending: state.home?.postsTrending,
      isLoadingPostsTrending: state.home.isLoadingPostsTrending,
    })
  );
  useEffect(() => {
    dispatch(getPostsHome({ params: { type: TYPE_POST.LIFE } }));
  }, [dispatch]);

  const { postTrendingItem, listPost } = useMemo(
    () => ({
      postTrendingItem: listPostTrending?.data[0],
      listPost: listPostTrending?.data.slice(1),
    }),
    [listPostTrending?.data]
  );

  return (
    <div className="container">
      {isLoadingPostsTrending ? (
        <LoadingTrending />
      ) : (
        <>
          <TitleMain
            title={listPostTrending?.topic || ''}
            icon={<IconTrending />}
            description={listPostTrending?.description}
          />
          <div className={styles.trendingGroup}>
            {listPostTrending && listPostTrending.data.length > 0 && (
              <div className={styles.postMain}>
                <div className={styles.postHeader}>
                  <img src={postTrendingItem?.avatar.img} alt="" />
                </div>

                <div className={styles.postBody}>
                  <h3 className={styles.postTitle}>
                    <Link
                      to={{
                        pathname: PostPathsEnum.POST.replace(
                          /:slug/,
                          postTrendingItem?.slug.toString() || ''
                        ),
                        state: postTrendingItem?._id,
                      }}
                    >
                      {postTrendingItem?.titleInside}
                    </Link>
                  </h3>
                  <p className={styles.postDes}>
                    {postTrendingItem?.description}
                  </p>

                  <PostCardAuth
                    auth="sonel"
                    time={moment(postTrendingItem?.createdAt).fromNow()}
                  />
                </div>

                <div className="post-footer"></div>
              </div>
            )}

            <div className={styles.postItemGroup}>
              {listPost?.map((post) => (
                <PostTrendingItem key={post._id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrendingPosts;
