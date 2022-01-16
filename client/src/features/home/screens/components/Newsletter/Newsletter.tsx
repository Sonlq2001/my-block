import React from "react";

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
							<div>01</div>
							<span>Get more discount</span>
						</div>

						<div>
							<div>01</div>
							<span>Get more discount</span>
						</div>
					</div>
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
