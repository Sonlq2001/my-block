import { AxiosResponse } from 'axios';

import api from 'api/api';
import { PostEndpointsEnum } from './../constants/post.endpoints';

const getPostApi = (id: string): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_POST.replace(/:post_id/, id));
};

export const postCommentApi = (comment: any): Promise<AxiosResponse> => {
  return api.post(PostEndpointsEnum.POST_COMMENT, comment);
};

export const postApi = {
  getPostApi,
  postCommentApi,
};
