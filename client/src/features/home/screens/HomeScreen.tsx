import { memo } from "react";

import TrendingPosts from "./components/TrendingPosts/TrendingPosts";
import HotTopics from "./components/HotTopics/HotTopics";
import LifeStyles from "./components/LifeStyles/LifeStyles";
import Newsletter from "./components/Newsletter/Newsletter";

import styles from "./HomeScreen.module.scss";

const HomeScreen = () => {
	return (
		<div className={styles.homeGroup}>
			<TrendingPosts />

			<HotTopics />

			<LifeStyles />

			<Newsletter />
		</div>
	);
};

export default memo(HomeScreen);
