import { Formik, Form } from 'formik';

import styles from './EditProfile.module.scss';

import InputField from 'components/atoms/FormElement/InputField/InputField';
import TextareaField from 'components/atoms/FormElement/TextareaField/TextareaField';
import InputFileField from 'components/atoms/FormElement/InputFileField/InputFileField';
import Button from 'components/atoms/Button/Button';
import TitleTabSetting from '../TitleTabSetting/TitleTabSetting';

import {
  schema,
  initSchema,
} from 'features/profile/helpers/profile-setting.helpers';

const EditProfile = () => {
  return (
    <>
      <TitleTabSetting
        title="Chỉnh sửa hồ sơ"
        description="Thiết lập tùy chỉnh thông tin của bạn"
      />

      <Formik
        initialValues={initSchema}
        onSubmit={(values) => console.log(values)}
        validationSchema={schema}
      >
        {() => {
          return (
            <Form>
              <InputFileField name="avatar" title="Ảnh đại diện" size="small" />

              <InputFileField
                name="coverPhoto"
                title="Ảnh bìa"
                className={styles.elForm}
              />

              <InputField
                name="name"
                label="Tên đại diện"
                placeholder="Tên nick đại diện cho bạn"
                className={styles.elForm}
              />

              <TextareaField
                name="description"
                placeholder="Mô tả bản thân của bạn ( sở thích, thể thao, ý kiến ... )"
                label="Mô tả bản thân"
                rows={5}
                className={styles.elForm}
              />

              <div className={styles.bottomButton}>
                <Button type="submit">Cập nhập</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditProfile;
