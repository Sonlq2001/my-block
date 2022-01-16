import React from "react";

import styles from "./LifeStyleItem.module.scss";
import ChipInfo from "components/atoms/ChipInfo/ChipInfo";
import ChipTag from "components/atoms/ChipTag/ChipTag";

import { ReactComponent as IconHeart } from "assets/images/icon-heart.svg";
import { ReactComponent as IconChat } from "assets/images/icon-chat.svg";
import { ReactComponent as IconDownload } from "assets/images/icon-download.svg";

interface LifeStyleItemProps {
	image: string;
}

const LifeStyleItem: React.FC<LifeStyleItemProps> = ({ image }) => {
	return (
		<div className={styles.lifeStyleItem}>
			<a href="/">
				<div className={styles.itemHeader}>
					<img src={image} alt="" />
				</div>

				<div className={styles.itemBody}>
					<div>
						<ChipTag title="Photos" />
					</div>
					<h3 className={styles.itemBodyTitle}>
						Aliquam doloremque et eum accusantium
					</h3>
					<p className={styles.itemBodyDes}>
						It has survived not only five centuries, but also the leap into
						electronic typesetting
					</p>
				</div>

				<div className={styles.interactive}>
					<div className={styles.interactiveInfo}>
						<ChipInfo icon={<IconHeart />} total={10} />

						<ChipInfo icon={<IconChat />} total={5} />
					</div>

					<div className="interactiveDownload">
						<ChipInfo icon={<IconDownload />} download />
					</div>
				</div>
			</a>
		</div>
	);
};

export default LifeStyleItem;
