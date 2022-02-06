import React, { ReactNode } from "react";

import styles from "./SidebarBox.module.scss";

import SidebarTitle from "components/atoms/SidebarTitle/SidebarTitle";
import SidebarItem from "components/atoms/SidebarItem/SidebarItem";

interface SidebarBoxProps {
  title: string;
  icon: ReactNode;
}

const SidebarBox: React.FC<SidebarBoxProps> = ({ title, icon }) => {
  return (
    <div className={styles.sidebarBox}>
      <div className={styles.sidebarHeader}>
        <SidebarTitle title={title} icon={icon} />
      </div>

      <div>
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </div>
  );
};

export default SidebarBox;
