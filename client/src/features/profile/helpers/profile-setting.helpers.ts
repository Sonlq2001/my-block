import * as Yup from 'yup';
import isEqual from 'lodash.isequal';

import { MAX_NAME, MAX_DESCRIPTION } from '../constants/profile.constants';
import { UserInfoType } from 'features/user/user';
import { ProfileUserInit } from '../types/profile.types';

const urlRegex = /(?<url>https?:\/\/[\w/:%#$&?()~.=+-]+)/gi;

const validateFile = (name: string) =>
  Yup.mixed()
    .required('Vui lòng chọn ảnh')
    .test(name, 'Định dạng file ảnh không đúng', (value: File) => {
      return (
        (value &&
          ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)) ||
        (typeof value === 'string' && value !== undefined)
      );
    });

const maxValue = (maxLength: number) =>
  Yup.string().max(maxLength, `Số lượng vượt quá ${maxLength} ký tự`);

export const schema = Yup.object({
  avatar: validateFile('avatar'),
  coverPhoto: validateFile('coverPhoto'),
  name: maxValue(MAX_NAME).required('Vui lòng nhập tên đại diện'),
  description: maxValue(MAX_DESCRIPTION).required(
    'Vui lòng nhập mô tả bản thân'
  ),
});

export const schemaSocialLink = Yup.object().shape({
  socials: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().nullable(),
        link: Yup.string().matches(
          urlRegex,
          'Định dạng đường dẫn không hợp lệ'
        ),
      })
    )
    .nullable(),
});

export const initSchema = {
  avatar: '',
  coverPhoto: '',
  name: '',
  description: '',
};

export const convertDataUpdateUserInfo = (
  initData: ProfileUserInit,
  data: UserInfoType
) => {
  return {
    ...initData,
    name: isEqual(initData.name, data.name) ? undefined : initData.name,
    description: isEqual(initData.description, data.description)
      ? undefined
      : initData.description,
  };
};
