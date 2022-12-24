import TitleTabSetting from '../TitleTabSetting/TitleTabSetting';

import styles from './EditSocials.module.scss';

const EditSocials = () => {
  return (
    <>
      <TitleTabSetting
        title="Mạng xã hội của bạn"
        description="Thêm các liên kết vào hồ sơ của bạn"
      />

      <div className={styles.groupSocial}>
        <div className={styles.itemSocial}>123</div>
      </div>
    </>
  );
};

export default EditSocials;
