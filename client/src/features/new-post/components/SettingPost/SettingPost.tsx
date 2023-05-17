import { useState, memo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import clsx from 'clsx';
import { useFormikContext, ErrorMessage } from 'formik';

import { FORMAT_POST, FORMAT_POST_ID } from 'features/new-post/new-post';
import styles from './SettingPost.module.scss';
import { ReactComponent as IconChecked } from 'assets/images/icon-check.svg';
import { ReactComponent as IconDropDown } from 'assets/images/icon-svg/icon-drop-down.svg';
import Switch from 'components/atoms/Switch/Switch';
import Button from 'components/atoms/Button/Button';
import InputRadio from 'components/atoms/FormElement/InputRadio/InputRadio';
import { TypeInitForm } from '../../types/new-post.types';
import { STATUS_POST } from '../../constants/new-post.constants';
interface SettingPostProps {
  setIsShowModalSetting: (status: boolean) => void;
}

const SettingPost: React.FC<SettingPostProps> = ({ setIsShowModalSetting }) => {
  const [isShowSelect, setIsShowSelect] = useState(false);
  const { values, setValues, errors, setFieldValue } =
    useFormikContext<TypeInitForm>();
  const [settingPostValue, setSettingPostValue] = useState<{
    format: number;
    excerpt: string;
    videoUrl: string;
  }>({
    format: values.format || FORMAT_POST_ID.STANDARD,
    excerpt: values.excerpt || '',
    videoUrl: values.videoUrl || '',
  });

  const handleSetValueSetting = () => {
    setValues({ ...values, ...settingPostValue });
    setIsShowModalSetting(Boolean(errors.videoUrl));
  };

  return (
    <div className={styles.settingPost}>
      <div className={styles.settingContent}>
        <h2 className={styles.headerSetting}>Tùy chọn đăng</h2>

        <div className={styles.bodySetting}>
          <div className={styles.settingGroup}>
            <label htmlFor="" className={styles.settingLabel}>
              Mô tả bài viết
            </label>
            <textarea
              name="excerpt"
              id=""
              cols={30}
              rows={10}
              className={styles.settingDes}
              onChange={(e) =>
                setSettingPostValue({
                  ...settingPostValue,
                  excerpt: e.target.value,
                })
              }
              value={settingPostValue.excerpt}
            />
          </div>

          <div className={styles.settingGroup}>
            <label htmlFor="" className={styles.settingLabel}>
              Định dạng bài đăng
            </label>
            <OutsideClickHandler onOutsideClick={() => setIsShowSelect(false)}>
              <div className={styles.groupSelect}>
                <button
                  className={styles.labelFormat}
                  onClick={() => setIsShowSelect(!isShowSelect)}
                  type="button"
                >
                  {
                    FORMAT_POST.find(
                      (item) => item.id === settingPostValue.format
                    )?.label
                  }

                  <IconDropDown className={styles.iconDropdown} />
                </button>

                {isShowSelect && (
                  <div className={styles.listFormat}>
                    {FORMAT_POST.map((item) => (
                      <div
                        key={item.id}
                        className={styles.itemFormat}
                        onClick={() => {
                          setSettingPostValue({
                            ...settingPostValue,
                            format: item.id,
                          });
                          setIsShowSelect(false);
                        }}
                      >
                        {item.id === settingPostValue.format && (
                          <IconChecked className={styles.iconChecked} />
                        )}
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          </div>

          {FORMAT_POST_ID.VIDEO === settingPostValue.format && (
            <div className={styles.settingGroup}>
              <label htmlFor="" className={styles.settingLabel}>
                Video URL (Youtube)
              </label>
              <input
                type="text"
                placeholder="Video url"
                className={styles.inputVideoUrl}
                name="videoUrl"
                onChange={(e) => {
                  setSettingPostValue({
                    ...settingPostValue,
                    videoUrl: e.target.value,
                  });
                  setFieldValue('videoUrl', e.target.value);
                }}
                value={settingPostValue.videoUrl}
              />
              <ErrorMessage
                name="videoUrl"
                component="p"
                className="msg-error"
              />
            </div>
          )}

          <div className={clsx(styles.settingGroup, styles.allowComment)}>
            <label htmlFor="" className={styles.settingLabel}>
              Cho phép bình luận bài đăng
            </label>
            <Switch name="allowComment" />
          </div>

          <div className={styles.settingGroup}>
            <label htmlFor="" className={styles.settingLabel}>
              Chế độ bài đăng
            </label>
            <InputRadio name="status" options={STATUS_POST} />
          </div>
        </div>
      </div>

      <div className={styles.footerSetting}>
        <Button
          type="button"
          onClick={() => setIsShowModalSetting(false)}
          variant="default"
          className={styles.btnCancel}
        >
          Hủy
        </Button>
        <Button type="button" onClick={handleSetValueSetting}>
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default memo(SettingPost);
