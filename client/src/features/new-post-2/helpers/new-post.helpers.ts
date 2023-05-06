import * as Yup from 'yup';

import { TypeInitForm, PostItemType } from '../types/new-post.types';
import {
  FORMAT_POST_ID,
  TAB_SET_IMAGE,
  MAX_LENGTH_TITLE,
  MAX_LENGTH_TAG,
  MIN_LENGTH,
  MAX_LENGTH_CHARACTER_TAG,
  MAX_SIZE_FILE,
  FILES_ACCEPT,
  STATUS_POST,
} from '../constants/new-post.constants';

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
  status: STATUS_POST.PUBLIC,
};

const ruleFile = (name: string) => {
  return Yup.mixed()
    .test(name, 'Định dạng file không được hỗ trợ.', (file: File) => {
      if (file instanceof File) {
        return FILES_ACCEPT.includes(file.type);
      }
      return true;
    })
    .test(name, 'File ảnh quá lớn.', (file: File) => {
      if (file instanceof File) {
        return file.size < MAX_SIZE_FILE; // max size 2mb
      }
      return true;
    });
};

export const schema = Yup.object({
  avatar: ruleFile('avatar').required('Vui lòng chọn ảnh bài viết.'),
  title: Yup.string()
    .required('Vui lòng nhập tiêu đề.')
    .max(MAX_LENGTH_TITLE, 'Tiêu đề vượt quá 100 ký tự.'),
  content: Yup.string().required('Vui lòng nhập nội dung bài viết.'),
  topics: Yup.array().min(
    MIN_LENGTH,
    `Bạn cần chọn tối thiểu ${MIN_LENGTH} chủ đề.`
  ),
  tags: Yup.array()
    .of(
      Yup.object().shape({
        tag: Yup.string()
          .required()
          .max(
            MAX_LENGTH_CHARACTER_TAG,
            `Tên thẻ tag vượt quá ${MAX_LENGTH_CHARACTER_TAG} ký tự.`
          ),
      })
    )
    .min(MIN_LENGTH, `Nhập tối thiểu ${MIN_LENGTH} thẻ tag.`)
    .max(
      MAX_LENGTH_TAG,
      `Vượt quá giới hạn ${MAX_LENGTH_TAG} thẻ tag cho 1 bài viết.`
    )
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

export const convertPostEdit = (data: PostItemType): TypeInitForm => ({
  title: data?.title || '',
  avatar: data?.avatar?.img || '',
  content: data?.content || '',
  excerpt: data?.excerpt || '',
  topics: data?.topics?.map((topic) => topic._id) || [],
  tags: data?.tags?.map((item) => ({ idTag: item._id, tag: item.tag })) || [],
  format: data?.format || FORMAT_POST_ID.STANDARD,
  allowComment: data?.allowComment || true,
  videoUrl: data?.videoUrl || '',
  status: data?.status || STATUS_POST.PUBLIC,
  _id: data?._id || '',
});
