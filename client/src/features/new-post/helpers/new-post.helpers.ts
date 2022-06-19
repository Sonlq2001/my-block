import * as Yup from 'yup';

import { PostType } from './../types/new-post.types';

export const initNewPost: PostType = {
  titleInside: '',
  content: '',
  image: '',
  titleOutside: '',
  description: '',
  topic: '',
  tags: [],
  authPost: '',
};

export const schema = Yup.object().shape({
  titleInside: Yup.string(),
  content: Yup.string(),
  titleOutside: Yup.string(),
  image: Yup.string(),
  description: Yup.string(),
  topic: Yup.string(),
  tags: Yup.array<[string]>(),
});
