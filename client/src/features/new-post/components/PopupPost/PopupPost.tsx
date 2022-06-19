import React, { memo, useEffect, useState } from 'react';
import clsx from 'clsx';
import { ContentEditableEvent } from 'react-contenteditable';
import { useFormikContext } from 'formik';

import styles from './PopupPost.module.scss';

import IconClose from 'assets/images/close.png';
import IconImage from 'assets/images/image.png';
import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';
import { PostType } from './../../types/new-post.types';
import LoadingCircle from 'components/loading/LoadingCircle/LoadingCircle';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getTopics } from 'features/master-data/master-data';

interface PopupPostProps {
  setPublish: (publish: boolean) => void;
  handleSubmit: () => void;
  isSubmit: boolean;
}

const PopupPost: React.FC<PopupPostProps> = ({
  setPublish,
  handleSubmit,
  isSubmit,
}) => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<string[]>([]);
  const { values, setFieldValue } = useFormikContext<PostType>();
  const handleChangeTitleOutside = (e: ContentEditableEvent) => {
    setFieldValue('titleOutside', e.target.value);
  };

  const handleChangeDes = (e: ContentEditableEvent) => {
    setFieldValue('description', e.target.value);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFieldValue('avatar', file);
      setFieldValue('previewImage', URL.createObjectURL(file as Blob));
    }
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const listTag = e.target.value
      .trim()
      .split(',')
      .filter((tag) => tag !== '');

    setTimeout(() => {
      setTags(listTag);
    }, 700);
    setFieldValue('tags', listTag);

    if (listTag.length > 4) {
      return;
    }
  };

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      values.previewImage && URL.revokeObjectURL(values.previewImage);
    };
  }, [values.previewImage]);

  const { topics } = useAppSelector((state) => ({
    topics: state.masterData.topics,
  }));

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
              {values.previewImage && (
                <div className={styles.renderImage}>
                  <img src={values.previewImage} alt="" />
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
            <label>Chọn danh mục cho bài viết.</label>
            <select
              name="topic"
              id=""
              onChange={(e) => setFieldValue('topic', e.target.value)}
            >
              {topics?.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.postBox}>
            <label>
              Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.
            </label>
            <div className={styles.groupTag}>
              <div>
                {tags.length > 0 &&
                  tags.map((tag, index) => (
                    <span key={index} className={styles.itemTag}>
                      #{tag.trim()} {index < tags.length - 1 && ','}
                    </span>
                  ))}
              </div>
            </div>
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
              className={clsx(styles.btnPublish, isSubmit && styles.disabled)}
              onClick={handleSubmit}
              type="submit"
            >
              {isSubmit && <LoadingCircle size="small" />}
              Xuất bản ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PopupPost);
