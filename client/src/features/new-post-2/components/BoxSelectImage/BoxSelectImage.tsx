import { useState, useEffect, memo } from 'react';

import { ReactComponent as IconTrash } from 'assets/images/icon-trash.svg';
import { ReactComponent as IconAddImage } from 'assets/images/icon-add-image.svg';
import styles from './BoxSelectImage.module.scss';

interface BoxSelectImageProps {
  getImage: (image: File | string) => void;
  name: string;
  disabled?: boolean;
}

const BoxSelectImage: React.FC<BoxSelectImageProps> = ({
  getImage,
  name,
  disabled,
}) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handlePreviewImage = (file: File | null) => {
    if (file) {
      getImage(file);
      setImagePreview(URL.createObjectURL(file as File));
    }
  };

  return (
    <label
      htmlFor={name}
      className={styles.imageBoxSelect}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
        handlePreviewImage(file);
      }}
    >
      {imagePreview ? (
        <img src={imagePreview} alt="" className={styles.imagePreview} />
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
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;
          handlePreviewImage(file);
        }}
        disabled={disabled}
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
  );
};

export default memo(BoxSelectImage);
