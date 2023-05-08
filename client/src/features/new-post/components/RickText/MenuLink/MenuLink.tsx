import { memo, useCallback, useState } from 'react';
import { Editor as CoreEditor } from '@tiptap/core';
import clsx from 'clsx';

import Modal from 'components/atoms/Modal/Modal';
import { ReactComponent as IconLink } from 'assets/images/icon-editor/icon-link.svg';
import stylesBase from '../RickText.module.scss';
import styles from '../MenuImage/MenuImage.module.scss';

interface MenuImageProps {
  editor: CoreEditor;
}

const MenuLink: React.FC<MenuImageProps> = ({ editor }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('');

  const handleSetLink = useCallback(() => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setIsShowModal(false);
      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl, target: '_blank' })
      .run();
    setIsShowModal(false);
  }, [editor, linkUrl]);

  return (
    <>
      <button
        onClick={() => setIsShowModal(true)}
        className={clsx(
          editor.isActive('link') ? stylesBase.isActive : '',
          stylesBase.itemEditor
        )}
        type="button"
      >
        <IconLink />
      </button>

      <Modal
        open={isShowModal}
        handleClose={() => setIsShowModal(false)}
        title="Đường dẫn video youtube"
        small
        handleSubmit={handleSetLink}
        textOk="Áp dụng"
      >
        <div className={styles.currentTabForm}>
          <label htmlFor="" className={styles.currentTabLabel}>
            Đường dẫn liên kết
          </label>
          <input
            type="text"
            placeholder="Nhập địa chỉ liên kết"
            className={styles.currentTabInput}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default memo(MenuLink);
