import { TypeInitForm } from '../types/new-post.types';
import { FORMAT_POST_ID } from '../constants/new-post.constants';

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
