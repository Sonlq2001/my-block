import { memo } from 'react';
import { Field, useFormikContext, FieldProps } from 'formik';
import get from 'lodash.get';
import clsx from 'clsx';

import styles from './TextareaField.module.scss';

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
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
        <label htmlFor={id} className={styles.labelTextarea}>
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field }: FieldProps) => {
          return (
            <textarea
              className={clsx(styles.textareaField, isError && 'field-error')}
              id={id}
              {...rest}
              {...field}
              value={get(values, name)}
            />
          );
        }}
      </Field>

      {isError && <div className="err-message">{error}</div>}
    </div>
  );
};

export default memo(TextareaField);
