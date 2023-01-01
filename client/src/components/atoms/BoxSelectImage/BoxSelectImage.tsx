import { useState, useEffect, memo, useMemo } from 'react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import get from 'lodash.get';

import { ReactComponent as IconTrash } from 'assets/images/icon-trash.svg';
import { ReactComponent as IconAddImage } from 'assets/images/icon-add-image.svg';
import styles from './BoxSelectImage.module.scss';

interface BoxSelectImageProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  getImage: (image: File | string) => void;
  name: string;
  disabled?: boolean;
  title?: string;
  sizeBox?: 'large' | 'medium' | 'small';
  className?: string;
  onDelete?: () => void;
}

const BoxSelectImage: React.FC<BoxSelectImageProps> = ({
  getImage,
  name,
  disabled,
  title,
  sizeBox = 'large',
  className,
  onChange: handleChange,
  onClick: handleClick,
  onDelete,
  ...rest
}) => {
  const { values } = useFormikContext();
  const [imagePreview, setImagePreview] = useState<string>('');

  const withBoxImage = useMemo(() => {
    if (sizeBox === 'small') {
      return styles.small; // 30%
    }
    if (sizeBox === 'medium') {
      return styles.medium; // 50%
    }
    return styles.large; // 100%
  }, [sizeBox]);

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handlePreviewImage = (file: File | null) => {
    if (file) {
      getImage(file);
      setTimeout(() => {
        setImagePreview(URL.createObjectURL(file as File));
      }, 100);
    }
  };

  const imageData = get(values, name);

  return (
    <>
      {title && <div className={styles.titleImageBox}>{title}</div>}
      <label
        htmlFor={name}
        className={clsx(styles.imageBoxSelect, withBoxImage, className)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
          handlePreviewImage(file);
        }}
      >
        {imagePreview || imageData ? (
          <img
            src={imagePreview || imageData}
            alt="preview-img"
            className={styles.imagePreview}
          />
        ) : (
          <>
            <div className={styles.imageBoxIcon}>
              <IconAddImage />
            </div>
            <div className={styles.imageBoxNote}>Chọn 1 file</div>
          </>
        )}

        <div className={styles.imageBoxDes}>PNG, JPG, GIF, WEBP, SVG ...</div>
        <input
          type="file"
          id={name}
          hidden
          {...rest}
          name={name}
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            handlePreviewImage(file);
            if (handleChange) {
              handleChange(e);
            }
            e.target.value = '';
          }}
          disabled={disabled}
          onClick={handleClick}
        />
        <button
          className={styles.btnTrash}
          onClick={() => {
            setImagePreview('');
            getImage('');
            if (onDelete) {
              onDelete();
            }
          }}
          type="button"
        >
          <IconTrash className={styles.iconTrash} />
        </button>
      </label>
    </>
  );
};

export default memo(BoxSelectImage);
