import { FC, InputHTMLAttributes } from 'react';
import { Field, useFormikContext } from 'formik';
import clsx from 'clsx';

import styles from './InputRadio.module.scss';

type OptionsRadio = {
  label: string;
  value: string;
};

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id?: string;
  label?: string;
  options: OptionsRadio[];
  row?: boolean;
}

const InputRadio: FC<InputRadioProps> = ({
  name,
  id,
  label,
  value: valueInside,
  options,
  row,
  onChange,
  ...rest
}) => {
  const { handleChange } = useFormikContext();

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    handleChange(e);
  };

  return (
    <>
      {label && <label className={styles.labelGroupRadio}>{label}</label>}

      <div className={clsx(styles.boxRadio, row && styles.rowRadio)}>
        {options.length &&
          options.map((option) => (
            <div className={styles.radio} key={option.value}>
              <Field
                type="radio"
                id={option.label}
                name={name}
                className={styles.inputRadio}
                value={option.value}
                onChange={onChangeRadio}
                {...rest}
              />
              <label htmlFor={option.label} className={styles.labelRadio}>
                {option.label}
              </label>
            </div>
          ))}
      </div>
    </>
  );
};

export default InputRadio;
