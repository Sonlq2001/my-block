import React, { memo } from 'react';
import clsx from 'clsx';
import { ContentEditableEvent } from 'react-contenteditable';
import { useFormikContext } from 'formik';

import styles from './PopupPost.module.scss';

import IconClose from 'assets/images/close.png';
import IconImage from 'assets/images/image.png';
import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';
import { PostType } from './../../types/new-post.types';

interface PopupPostProps {
  setPublish: (publish: boolean) => void;
  handleSubmit: (value: PostType) => void;
}

const PopupPost: React.FC<PopupPostProps> = ({ setPublish, handleSubmit }) => {
  const { values, setFieldValue } = useFormikContext<PostType>();
  const handleChangeTitleOutside = (e: ContentEditableEvent) => {
    setFieldValue('titleOutside', e.target.value);
  };

  const handleChangeDes = (e: ContentEditableEvent) => {
    setFieldValue('description', e.target.value);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFieldValue('avatar', file);
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
      .trim()
      .replace(/,/g, ' ')
      .split(' ')
      .filter((tag) => tag !== '');
    if (tags.length >= 4) {
      return;
    }
    setFieldValue('tags', tags);
  };

  return (
    <div className={styles.popupPost}>
      <div className={styles.popupClose} onClick={() => setPublish(false)}>
        <img src={IconClose} alt="" />
      </div>
      <div className={styles.popupContent}>
        <div className={styles.popupContentLeft}>
          <label htmlFor="file" className={clsx(styles.uploadFileLabel)}>
            <div className={styles.groupDecoImg}>
              <div className={styles.chooseImage}>
                <p>
                  Chọn ảnh đại diện cho bài viết của bạn sẽ giúp bài viết của
                  bạn cuốn hút hơn.
                </p>
                <img src={IconImage} alt="" />
                <p>Bấm để chọn ảnh</p>
              </div>

              {/* preview image */}
              {values.avatar && (
                <div className={styles.renderImage}>
                  <img src={URL.createObjectURL(values.avatar) || ''} alt="" />
                </div>
              )}
            </div>
            <input type="file" id="file" hidden onChange={handleChangeImage} />
          </label>

          <div className={styles.postField}>
            <ContentEditableTag
              html={values.titleOutside}
              onChange={handleChangeTitleOutside}
              className={clsx(styles.contentTag, styles.contentTagTitle)}
              data-content="Tiêu đề khi bài viết được hiện thị"
            />
          </div>

          <div className={styles.postField}>
            <ContentEditableTag
              html={values.description}
              onChange={handleChangeDes}
              className={clsx(styles.contentTag, styles.contentTagDes)}
              data-content="Mô tả khi bài viết được hiện thị"
            />
          </div>
        </div>

        <div className={styles.popupContentRight}>
          <div className={styles.postBox}>
            <label>
              Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Thiên nhiên, Cuộc sống"
              className={styles.postBoxInput}
              onChange={handleChangeTag}
            />
            <div className={styles.postBoxNote}>
              <em>
                Mỗi 1 tên thẻ cách nhau bằng 1 dấu <code>,</code>
              </em>
            </div>
          </div>

          <div className={styles.postBox}>
            <button
              className={styles.btnPublish}
              onClick={() => handleSubmit(values)}
            >
              Xuất bản ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PopupPost);
