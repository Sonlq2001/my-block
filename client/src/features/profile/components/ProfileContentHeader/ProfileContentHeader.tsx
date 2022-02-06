import styles from "./ProfileContentHeader.module.scss";

const ProfileContentHeader = () => {
  return (
    <div className={styles.profileContentHeader}>
      <div className={styles.authAvatar}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/if9tk5uy-ki-1-e1633222611780.jpg"
          alt=""
        />
      </div>

      <div className={styles.authContent}>
        <h2 className={styles.authName}>LE QUANG SON</h2>
        <div className={styles.authDes}>
          <p>
            Amet maxime est nostrum molestiae dolorem ipsum nisi. Placeat eos
            aut et animi error aut et. Error porro error velit voluptate aut.
            Eligendi qui eos explicabo soluta officia.
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ProfileContentHeader;
