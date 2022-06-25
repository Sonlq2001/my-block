import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component';

import LoadingScroll from 'components/loading/LoadingScroll/LoadingScroll';
import styles from './CustomInfiniteScroll.module.scss';

type CustomInfiniteScrollProps = Omit<
  InfiniteScrollProps,
  'next' | 'loader'
> & {
  fetchMoreData: () => void;
  children: React.ReactNode;
  loading: boolean;
};

const CustomInfiniteScroll: React.FC<CustomInfiniteScrollProps> = ({
  children,
  fetchMoreData,
  dataLength,
  hasMore,
  loading,
  ...props
}) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={dataLength}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={null}
        {...props}
      >
        {children}
      </InfiniteScroll>
      {loading && (
        <div className={styles.loadingMore}>
          <LoadingScroll />
        </div>
      )}
    </div>
  );
};

export default CustomInfiniteScroll;
