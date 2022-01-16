import React from "react";

import styles from "./ChipTag.module.scss";

interface ChipTagProps {
	title: string;
}

const ChipTag: React.FC<ChipTagProps> = ({ title }) => {
	return <div className={styles.chipTag}>{title && <span>{title}</span>}</div>;
};

export default ChipTag;
