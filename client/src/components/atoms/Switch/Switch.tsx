import { memo, useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import styles from './Switch.module.scss';

interface SwitchProps {
  name: string;
}

const Switch: React.FC<SwitchProps> = ({ name, ...props }) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [checked, setChecked] = useState<boolean>(!!values[name]);

  useEffect(() => {
    setFieldValue(name, checked);
  }, [checked, name, setFieldValue]);

  return (
    <label className={styles.switch}>
      <input
        {...props}
        type="checkbox"
        hidden
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
        checked={checked}
        value={JSON.stringify(checked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default memo(Switch);
