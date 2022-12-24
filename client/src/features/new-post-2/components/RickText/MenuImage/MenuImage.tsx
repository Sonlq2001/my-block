import { useState, useEffect, useCallback, memo } from 'react';

import clsx from 'clsx';
import { Editor as CoreEditor } from '@tiptap/core';

import { ReactComponent as IconImage } from 'assets/images/icon-editor/icon-image.svg';
import stylesBase from '../RickText.module.scss';
import styles from './MenuImage.module.scss';
import Modal from 'components/atoms/Modal/Modal';
import BoxSelectImage from 'components/atoms/BoxSelectImage/BoxSelectImage';
import { upLoadImage } from 'helpers/uploadImage';
import { TAB_SET_IMAGE } from 'features/new-post-2/constants/new-post.constants';

interface MenuImageProps {
  editor: CoreEditor;
}

const MenuImage: React.FC<MenuImageProps> = ({ editor }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(TAB_SET_IMAGE.LINK);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [linkImage, setLinkImage] = useState<{
    link: string | File;
    alt: string;
  }>({
    link: '',
    alt: '',
  });

  const handleResetImage = () => {
    setLinkImage({
      link: '',
      alt: '',
    });
  };

  useEffect(() => {
    handleResetImage();
  }, [tab]);

  const handleGetImage = useCallback(
    (image: File | string) => {
      setLinkImage({ ...linkImage, link: image });
    },
    [linkImage, setLinkImage]
  );

  const handleSetImage = async () => {
    if (linkImage.link instanceof File) {
      setIsLoadingImage(true);
      await upLoadImage(linkImage.link)
        .then((res) => {
          editor.chain().focus().setImage({ src: res?.img }).run();
        })
        .finally(() => setIsLoadingImage(false));
    } else if (linkImage.link && linkImage.alt) {
      editor
        .chain()
        .focus()
        .setImage({ src: linkImage.link, alt: linkImage.alt })
        .run();
    }
    handleResetImage();
    setIsModal(false);
    setTab(TAB_SET_IMAGE.LINK);
  };

  return (
    <>
      <button
        className={clsx(stylesBase.itemEditor)}
        onClick={() => setIsModal(true)}
        type="button"
      >
        <IconImage />
      </button>

      <Modal
        open={isModal}
        handleClose={() => {
          setIsModal(false);
          setTab(TAB_SET_IMAGE.LINK);
        }}
        title="Thêm ảnh"
        medium
        handSubmit={handleSetImage}
        textOk="Áp dụng"
        disabled={isLoadingImage}
      >
        <div className={styles.tabImage}>
          <button
            onClick={() => setTab(TAB_SET_IMAGE.LINK)}
            className={clsx(
              styles.buttonTabImage,
              tab === TAB_SET_IMAGE.LINK && styles.active
            )}
          >
            Chèn ảnh từ đường dẫn
          </button>
          <button
            onClick={() => setTab(TAB_SET_IMAGE.FILE)}
            className={clsx(
              styles.buttonTabImage,
              tab === TAB_SET_IMAGE.FILE && styles.active
            )}
          >
            Upload ảnh
          </button>
        </div>
        <div className={styles.groupCurrentTab}>
          {tab === TAB_SET_IMAGE.LINK && (
            <>
              <div className={styles.currentTabForm}>
                <label htmlFor="" className={styles.currentTabLabel}>
                  Đường dẫn ảnh
                </label>
                <input
                  type="text"
                  placeholder="Dán hoặc nhập URL"
                  value={linkImage.link as string}
                  onChange={(e) =>
                    setLinkImage({ ...linkImage, link: e.target.value })
                  }
                  className={styles.currentTabInput}
                />
              </div>
              <div className={styles.currentTabForm}>
                <label htmlFor="" className={styles.currentTabLabel}>
                  Văn bản thay thế (Alt - alternative text)
                </label>
                <input
                  type="text"
                  placeholder="Văn bản thay thế"
                  value={linkImage.alt}
                  onChange={(e) =>
                    setLinkImage({ ...linkImage, alt: e.target.value })
                  }
                  className={styles.currentTabInput}
                />
              </div>
            </>
          )}
          {tab === TAB_SET_IMAGE.FILE && (
            <BoxSelectImage
              getImage={handleGetImage}
              name="file-image"
              disabled={isLoadingImage}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default memo(MenuImage);
