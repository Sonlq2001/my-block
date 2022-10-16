import { AxiosResponse } from 'axios';
import api from 'api/api';

import { NewPostEndpointsEnum } from './../constants/new-post.endpoints';
import { PostBody } from './../types/new-post.types';

const postArticleApi = (data: PostBody): Promise<AxiosResponse> => {
  return api.post(NewPostEndpointsEnum.POST_ARTICLE, data);
};

export const postApi = {
  postArticleApi,
};
