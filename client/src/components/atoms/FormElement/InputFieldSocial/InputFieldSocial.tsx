import { memo } from 'react';
import clsx from 'clsx';
import { Field, FieldProps, useFormikContext } from 'formik';
import get from 'lodash.get';

import styles from './InputFieldSocial.module.scss';

interface InputFieldSocialProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  title: string;
  name: string;
  icon: React.ReactNode;
}

const InputFieldSocial: React.FC<InputFieldSocialProps> = ({
  className,
  title,
  name,
  onChange,
  icon,
  id,
  ...rest
}) => {
  const { values, handleChange, errors, touched } = useFormikContext();

  const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    handleChange(e);
  };

  const error = get(errors, name);
  const isError = !!(get(touched, name) && error);

  return (
    <div
      className={clsx(styles.itemSocial, isError && 'wrap-error', className)}
    >
      <label htmlFor={id} className={styles.titleSocial}>
        {title}
      </label>
      <div className={styles.inputSocial}>
        <span
          className={clsx(styles.iconSocial, isError && 'field-icon__error')}
        >
          {icon}
        </span>
        <Field name={name}>
          {({ field }: FieldProps) => {
            return (
              <input
                type="text"
                className={clsx(styles.linkSocial, isError && 'field-error')}
                id={id}
                {...field}
                {...rest}
                onChange={customHandleChange}
                value={get(values, name) || ''}
              />
            );
          }}
        </Field>
      </div>
      {isError && <div className="err-message">{error}</div>}
    </div>
  );
};

export default memo(InputFieldSocial);
