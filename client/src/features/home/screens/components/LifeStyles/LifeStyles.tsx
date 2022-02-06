import React, { useState } from "react";
import clsx from "clsx";

import TitleMain from "components/atoms/TitleMain/TitleMain";
import { ReactComponent as IconStyle } from "assets/images/icon-palette.svg";
import styles from "./LifeStyles.module.scss";
import stylesCommon from "styles/common.module.scss";

import LifeStyleItem from "components/atoms/LifeStyleItem/LifeStyleItem";
import { dataLifeStyles } from "features/home/constants/thumy-data";

const LifeStyles: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  return (
    <div className="container">
      <div className={styles.lifeStyles}>
        <TitleMain
          title="Life styles"
          icon={<IconStyle />}
          description="Discover the most outstanding articles in all topics of life."
        />

        <div className={styles.lifeStylesTab}>
          <div className={styles.navigationTab}>
            <div>
              <button
                className={clsx(stylesCommon.navigationTabItem, {
                  [stylesCommon.active]: tabIndex === 1,
                })}
                onClick={() => setTabIndex(1)}
              >
                All
              </button>
              <button
                className={clsx(stylesCommon.navigationTabItem, {
                  [stylesCommon.active]: tabIndex === 2,
                })}
                onClick={() => setTabIndex(2)}
              >
                Toys
              </button>
              <button
                className={clsx(stylesCommon.navigationTabItem, {
                  [stylesCommon.active]: tabIndex === 3,
                })}
                onClick={() => setTabIndex(3)}
              >
                Photos
              </button>
            </div>

            <button className={stylesCommon.btnViewAll}>
              <span>View All</span>
              <i className="las la-arrow-right" />
            </button>
          </div>

          <div className={styles.groupTabs}>
            {tabIndex === 1 && (
              <div className={styles.tabItem}>
                {dataLifeStyles.map((item) => (
                  <LifeStyleItem key={item.id} image={item.img} />
                ))}
              </div>
            )}

            {tabIndex === 2 && <div className="tabs-items">2</div>}

            {tabIndex === 3 && <div className="tabs-items">3</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeStyles;
