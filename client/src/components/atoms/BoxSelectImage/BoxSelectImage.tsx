import { useState, useEffect, memo, useMemo } from 'react';
import clsx from 'clsx';

import { ReactComponent as IconTrash } from 'assets/images/icon-trash.svg';
import { ReactComponent as IconAddImage } from 'assets/images/icon-add-image.svg';
import styles from './BoxSelectImage.module.scss';

interface BoxSelectImageProps extends React.DOMAttributes<HTMLDivElement> {
  getImage: (image: File | string) => void;
  name: string;
  disabled?: boolean;
  title?: string;
  size?: 'large' | 'medium' | 'small';
  className?: string;
}

const BoxSelectImage: React.FC<BoxSelectImageProps> = ({
  getImage,
  name,
  disabled,
  title,
  size = 'large',
  className,
  onChange: handleChange,
  onClick: handleClick,
  ...rest
}) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  const withBoxImage = useMemo(() => {
    if (size === 'small') {
      return styles.small; // 30%
    }
    if (size === 'medium') {
      return styles.medium; // 50%
    }
    return styles.large; // 100%
  }, [size]);

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
        {imagePreview ? (
          <img
            src={imagePreview}
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
          name={name}
          hidden
          {...rest}
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
