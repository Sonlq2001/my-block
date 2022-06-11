import { memo } from 'react';

import { REACTION_ICONS } from 'constants/icon.constants';

import styles from './Icons.module.scss';

interface IconsProps {
  open: boolean;
  setContent: (content: string) => void;
  content: string;
}

const Icons: React.FC<IconsProps> = ({ open, setContent, content }) => {
  return (
    <div className={styles.boxIcon}>
      <div className={styles.chooseIcon}>😀</div>
      {open && (
        <div className={styles.listIcon}>
          {REACTION_ICONS.map((icon) => (
            <div
              className={styles.icon}
              key={icon}
              onClick={() => setContent(content + icon)}
            >
              {icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Icons);
