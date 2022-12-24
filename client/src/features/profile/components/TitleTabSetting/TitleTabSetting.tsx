import styles from './TitleTabSetting.module.scss';

interface TitleTabSettingProps {
  title: string;
  description: string;
}

const TitleTabSetting: React.FC<TitleTabSettingProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <h3 className={styles.titleTabSetting}>{title}</h3>
      <p className={styles.desTab}>{description}</p>
      <div className={styles.lineItemTab} />
    </>
  );
};

export default TitleTabSetting;
