import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './SidebarItemTag.module.scss';
import { ExplorePathsEnum } from 'features/explore/explore';

interface SidebarItemTagProps {
  tag: string;
  imagePost?: string;
  isNotDraftPost: boolean;
}

const SidebarItemTag: React.FC<SidebarItemTagProps> = ({
  tag,
  imagePost,
  isNotDraftPost,
}) => {
  const history = useHistory();

  const clickTag = () => {
    if (!isNotDraftPost) {
      return;
    }

    history.push(`${ExplorePathsEnum.EXPLORE}?tag=${tag.slice(1)}`, {
      state: { imagePost },
    });
  };
  return (
    <div className={styles.itemTag} onClick={clickTag}>
      {tag}
    </div>
  );
};

export default SidebarItemTag;
