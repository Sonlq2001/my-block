import { useFormikContext } from 'formik';
import get from 'lodash.get';
import clsx from 'clsx';

import BoxSelectImage from 'components/atoms/BoxSelectImage/BoxSelectImage';

interface InputFileFieldProps extends React.DOMAttributes<HTMLDivElement> {
  name: string;
  title?: string;
  size?: 'large' | 'medium' | 'small';
  className?: string;
}

const InputFileField: React.FC<InputFileFieldProps> = ({
  name,
  title,
  size,
  className,
  ...rest
}) => {
  const { setFieldValue, errors, touched, setFieldTouched, values } =
    useFormikContext();

  const error = get(errors, name);
  const isError = !!(get(touched, name) && error);

  const handleFocusBack = () => {
    setTimeout(() => {
      if (!get(values, name)) {
        setFieldTouched(name, true);
      }
    }, 50);
    window.removeEventListener('focus', handleFocusBack);
  };

  return (
    <div className={clsx(isError && 'wrap-error', className)}>
      <BoxSelectImage
        {...rest}
        name={name}
        getImage={(file) => setFieldValue(name, file)}
        title={title}
        size={size}
        className="field-error"
        onClick={() => window.addEventListener('focus', handleFocusBack)}
        onChange={() => window.removeEventListener('focus', handleFocusBack)}
      />
      {isError && <div className="err-message">{error}</div>}
    </div>
  );
};

export default InputFileField;
