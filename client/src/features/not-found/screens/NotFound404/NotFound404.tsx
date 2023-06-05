import React from 'react';

import ImageNotFound from 'assets/images/404.png';
import styles from './NotFound404.module.scss';
import Button from 'components/atoms/Button/Button';
import { HomePathsEnum } from 'features/home/home';

const NotFound404: React.FC = () => {
  return (
    <div className={styles.contentNotFound}>
      <img src={ImageNotFound} alt="not-found" />
      <p className={styles.textNotFound}>Trang bạn tìm kiếm không tồn tại.</p>

      <Button to={HomePathsEnum.ROOT}>Quay về trang chủ</Button>
    </div>
  );
};

export default NotFound404;
