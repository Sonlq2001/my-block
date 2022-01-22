import React from "react";
import clsx from "clsx";

import TitleMain from "components/atoms/TitleMain/TitleMain";
import styles from "./Newsletter.module.scss";
import { ReactComponent as IconHappy } from "assets/images/icon-happy.svg";

const Newsletter: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.newsletter}>
        <div className={styles.newsletterLeft}>
          <TitleMain
            title="Join our newsletter"
            icon={<IconHappy />}
            description="Read and share new perspectives on just about any topic. Everyone’s welcome."
          />

          <div className={styles.listNote}>
            <div className={styles.listNoteItem}>
              <div className={styles.listNoteIndex}>01</div>
              <span className={styles.listNoteContent}>Get more discount</span>
            </div>

            <div className={styles.listNoteItem}>
              <div
                className={clsx(styles.listNoteIndex, styles.listNoteIndex2)}
              >
                02
              </div>
              <span className={styles.listNoteContent}>
                Get premium magazines
              </span>
            </div>
          </div>

          <form action="" className={styles.formBox}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Your email"
                className={styles.formInput}
              />
              <button className={styles.formBtn}>
                <i className="las la-arrow-right" />
              </button>
            </div>
          </form>
        </div>

        <div className={styles.newsletterRight}>
          <img
            src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/SVG-subcribe2.efb832b2-1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
