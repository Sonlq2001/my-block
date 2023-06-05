import { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import isEqual from 'lodash.isequal';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import styles from './EditProfile.module.scss';

import InputField from 'components/atoms/FormElement/InputField/InputField';
import TextareaField from 'components/atoms/FormElement/TextareaField/TextareaField';
import InputFileField from 'components/atoms/FormElement/InputFileField/InputFileField';
import Button from 'components/atoms/Button/Button';
import TitleTabSetting from '../TitleTabSetting/TitleTabSetting';

import { schema } from 'features/profile/helpers/profile-setting.helpers';
import { useAppSelector, useAppDispatch } from 'redux/store';
import { convertDataUpdateUserInfo } from 'features/profile/helpers/profile-setting.helpers';
import { ProfileUserInit } from '../../types/profile.types';
import { upLoadImage } from 'helpers/uploadImage';
import { patchUpdateUser } from '../../redux/profile.slice';
import { updateAvatarUser } from 'features/user/user';
import { ProfilePathsEnum } from '../../constants/profile.paths';
import { displaySnackbar } from 'redux/slices/snackbar.slice';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const history = useHistory();

  const initUserInfo = useMemo(() => {
    return {
      name: userInfo?.name || '',
      avatar: userInfo?.avatar || '',
      coverPhoto: userInfo?.coverPhoto || '',
      description: userInfo?.description || '',
    };
  }, [
    userInfo?.avatar,
    userInfo?.coverPhoto,
    userInfo?.description,
    userInfo?.name,
  ]);

  const checkImageChange = async (
    oldImage?: string | File,
    newImage?: string | File
  ) => {
    if (isEqual(oldImage, newImage)) {
      return undefined;
    }
    const resImage = await upLoadImage(newImage);
    return resImage?.img || '';
  };

  const handleSubmit = async (
    values: ProfileUserInit,
    { setSubmitting }: FormikHelpers<ProfileUserInit>
  ) => {
    if (!userInfo) return;

    const avatar = await checkImageChange(userInfo.avatar, values.avatar);
    const coverPhoto = await checkImageChange(
      userInfo.coverPhoto,
      values.coverPhoto
    );

    const dataUserUpdate = convertDataUpdateUserInfo(
      {
        ...values,
        avatar,
        coverPhoto,
      },
      userInfo
    );

    await dispatch(patchUpdateUser(dataUserUpdate))
      .then(unwrapResult)
      .then((res) => {
        dispatch(updateAvatarUser(res.data.avatar));
        dispatch(displaySnackbar({ message: '12' }));
        history.push(ProfilePathsEnum.PROFILE.replace(':userId', userInfo._id));
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <TitleTabSetting
        title="Chỉnh sửa hồ sơ"
        description="Thiết lập tùy chỉnh thông tin của bạn"
      />

      <Formik
        initialValues={initUserInfo}
        onSubmit={handleSubmit}
        validationSchema={schema}
        enableReinitialize
      >
        {({ isSubmitting }) => {
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

              <Button
                className={styles.bottomButton}
                type="submit"
                disabled={isSubmitting}
              >
                Cập nhập
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditProfile;
