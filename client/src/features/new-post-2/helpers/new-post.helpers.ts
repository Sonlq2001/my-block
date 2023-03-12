import * as Yup from 'yup';

import { TypeInitForm } from '../types/new-post.types';
import { FORMAT_POST_ID, TAB_SET_IMAGE } from '../constants/new-post.constants';

export const initForm: TypeInitForm = {
  title: '',
  topics: [],
  tags: [],
  avatar: '',
  content: '',
  excerpt: '',
  format: FORMAT_POST_ID.STANDARD,
  allowComment: true,
  videoUrl: '',
};

const ruleFile = (name: string) => {
  return Yup.mixed()
    .test(name, 'Định dạng file không được hỗ trợ.', (file: File) => {
      if (file instanceof File) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      }
      return true;
    })
    .test(name, 'File ảnh quá lớn.', (file: File) => {
      if (file instanceof File) {
        return file.size < 2000000; // max size 2mb
      }
      return true;
    });
};

export const schema = Yup.object({
  avatar: ruleFile('avatar').required('Vui lòng chọn ảnh bài viết.'),
  title: Yup.string()
    .required('Vui lòng nhập tiêu đề.')
    .max(100, 'Tiêu đề vượt quá 100 ký tự.'),
  content: Yup.string().required('Vui lòng nhập nội dung bài viết.'),
  topics: Yup.array().min(1, 'Bạn cần chọn tối thiểu 1 chủ đề.'),
  tags: Yup.array()
    .of(
      Yup.object().shape({
        tag: Yup.string().required().max(20, 'Tên thẻ tag vượt quá 20 ký tự.'),
      })
    )
    .min(1, 'Nhập tối thiểu 1 thẻ tag.')
    .max(5, 'Vượt quá giới hạn 5 thẻ tag cho 1 bài viết.')
    .test('tags', 'Tên thẻ đã bị trùng.', (values) => {
      const hasMap = new Map();
      if (values?.length) {
        for (let i = 0; i < values.length; i++) {
          if (hasMap.has(values[i].tag)) {
            return false;
          }
          hasMap.set(values[i].tag, values[i].tag);
        }
      }
      return true;
    }),
  videoUrl: Yup.string().when('format', {
    is: (format: number) => format === FORMAT_POST_ID.VIDEO,
    then: Yup.string().required('Vui lòng nhập đường dẫn video youtube.'),
    otherwise: Yup.string().nullable(),
  }),
});

export const schemaEditorImage = Yup.object().shape({
  linkImage: ruleFile('linkImage').nullable(),
  altImage: Yup.string().when(['linkImage', 'tab'], {
    is: (linkImage: string, tab: number) =>
      tab === TAB_SET_IMAGE.LINK && Boolean(linkImage),
    then: Yup.string().required('Vui lòng nhập văn bản thay thế hình ảnh !'),
    otherwise: Yup.string().nullable(),
  }),
});
