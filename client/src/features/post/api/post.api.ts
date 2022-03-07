import { AxiosResponse } from 'axios';

import api from 'api/api';
import { PostEndpointsEnum } from './../constants/post.endpoints';

const getPostApi = (id: string): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_POST.replace(/:post_id/, id));
};

const postCommentApi = (comment: any): Promise<AxiosResponse> => {
  return api.post(PostEndpointsEnum.POST_COMMENT, comment);
};

const getCommentApi = (postId: string): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_COMMENTS.replace(/:post_id/, postId));
};

const postReplyCommentApi = (comment: any): Promise<AxiosResponse> => {
  return api.post(PostEndpointsEnum.POST_REPLY_COMMENT, comment);
};

export const postApi = {
  getPostApi,
  postCommentApi,
  getCommentApi,
  postReplyCommentApi,
};
