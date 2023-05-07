import { useState, memo } from 'react';
import { Editor as CoreEditor } from '@tiptap/core';

import Modal from 'components/atoms/Modal/Modal';
import { ReactComponent as IconVideoYoutube } from 'assets/images/icon-editor/icon-video-youtube.svg';
import styles from '../MenuImage/MenuImage.module.scss';
import stylesBase from '../RickText.module.scss';

interface MenuYoutubeProps {
  editor: CoreEditor;
}

const MenuYoutube: React.FC<MenuYoutubeProps> = ({ editor }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [urlVideoYoutube, setUrlVideoYoutube] = useState<string>('');

  const handleAddYoutubeVideo = () => {
    if (urlVideoYoutube) {
      editor.commands.setYoutubeVideo({
        src: urlVideoYoutube,
      });
      setIsShowModal(false);
    }
  };

  return (
    <>
      <button
        className={stylesBase.itemEditor}
        onClick={() => setIsShowModal(true)}
        type="button"
      >
        <IconVideoYoutube />
      </button>

      <Modal
        open={isShowModal}
        handleClose={() => setIsShowModal(false)}
        title="Đường dẫn video youtube"
        small
        handSubmit={handleAddYoutubeVideo}
        textOk="Áp dụng"
      >
        <div className={styles.currentTabForm}>
          <label htmlFor="" className={styles.currentTabLabel}>
            Đường dẫn ảnh
          </label>
          <input
            type="text"
            placeholder="Dán hoặc nhập URL"
            className={styles.currentTabInput}
            value={urlVideoYoutube}
            onChange={(e) => setUrlVideoYoutube(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default memo(MenuYoutube);
