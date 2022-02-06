import React, { ReactNode } from "react";
import clsx from "clsx";

import SidebarTitle from "components/atoms/SidebarTitle/SidebarTitle";
import SidebarItemTag from "components/atoms/SidebarItemTag/SidebarItemTag";

import styles from "./../SidebarBox/SidebarBox.module.scss";
import styleTag from "./SidebarTag.module.scss";

interface SidebarTagProps {
  title: string;
  icon: ReactNode;
}

const SidebarTag: React.FC<SidebarTagProps> = ({ title, icon }) => {
  const tags: string[] = [
    "woman",
    "Voluptates sit",
    "Voluptas",
    "Vitae quisquam",
    "Velit",
    "Soluta placeat",
    "Sit eligendi",
    "Qui",
  ];
  return (
    <div className={clsx(styles.sidebarBox, styleTag.sidebarTag)}>
      <div className={styles.sidebarHeader}>
        <SidebarTitle title={title} icon={icon} />
      </div>

      <div className={styleTag.sidebarTags}>
        {tags.map((item) => (
          <SidebarItemTag key={item} tag={item} />
        ))}
      </div>
    </div>
  );
};

export default SidebarTag;
