import { AxiosResponse } from 'axios';
import api from 'api/api';

import { NewPostEndpointsEnum } from './../constants/new-post.endpoints';
import { PostType } from './../types/new-post.types';

const postArticleApi = (data: PostType): Promise<AxiosResponse> => {
  return api.post(NewPostEndpointsEnum.POST_ARTICLE, data);
};

export const postApi = {
  postArticleApi,
};
