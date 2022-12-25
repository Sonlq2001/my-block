import { memo } from 'react';
import { Field, useFormikContext, FieldProps } from 'formik';
import get from 'lodash.get';
import clsx from 'clsx';

import styles from './InputField.module.scss';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  className,
  id,
  ...rest
}) => {
  const { errors, touched, values } = useFormikContext();

  const error = get(errors, name);
  const isError = !!(get(touched, name) && error);

  return (
    <div className={clsx(styles.wrapInput, className, isError && 'wrap-error')}>
      {label && (
        <label htmlFor={id} className={styles.labelInput}>
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field }: FieldProps) => {
          return (
            <input
              type="text"
              className={clsx(styles.inputField, isError && 'field-error')}
              id={id}
              {...rest}
              {...field}
              value={get(values, name) || ''}
            />
          );
        }}
      </Field>

      {isError && <div className="err-message">{error}</div>}
    </div>
  );
};

export default memo(InputField);
