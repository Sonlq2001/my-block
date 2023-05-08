import { AxiosResponse } from 'axios';

import api from 'api/api';
import { PostEndpointsEnum } from './../constants/post.endpoints';
import { ParamsComment } from '../types/comment.types';

const getPostApi = (slug: string): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_POST.replace(/:slug/, slug));
};

const postCommentApi = (comment: any): Promise<AxiosResponse> => {
  return api.post(PostEndpointsEnum.POST_COMMENT, comment);
};

const getCommentApi = ({
  slug,
  page,
  perPage,
}: ParamsComment): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_COMMENTS.replace(/:slug/, slug), {
    params: { page, per_page: perPage },
  });
};

const postReplyCommentApi = (comment: any): Promise<AxiosResponse> => {
  return api.post(PostEndpointsEnum.POST_REPLY_COMMENT, comment);
};

const patchReactionApi = (data: any): Promise<AxiosResponse> => {
  return api.patch(
    PostEndpointsEnum.PATCH_REACTION.replace(
      /:comment_id/,
      data.commentReaction
    ),
    data
  );
};

const patchViewPost = (id: string): Promise<AxiosResponse> => {
  return api.patch(PostEndpointsEnum.PATCH_VIEW_POST.replace(/:post_id/, id));
};

const patchSavePost = (postId: string): Promise<AxiosResponse> => {
  return api.patch(
    PostEndpointsEnum.PATCH_SAVE_POST.replace(/:post_id/, postId)
  );
};

const patchUnSavePost = (postId: string): Promise<AxiosResponse> => {
  return api.patch(
    PostEndpointsEnum.PATCH_UN_SAVE_POST.replace(/:post_id/, postId)
  );
};

const patchLikePostApi = (postId: string): Promise<AxiosResponse> => {
  return api.patch(PostEndpointsEnum.PATCH_LIKE_POST.replace(/:id/, postId));
};

const patchUnLikePostApi = (postId: string): Promise<AxiosResponse> => {
  return api.patch(PostEndpointsEnum.PATCH_UNLIKE_POST.replace(/:id/, postId));
};

const removePostApi = (postId: string): Promise<AxiosResponse> => {
  return api.delete(PostEndpointsEnum.REMOVE_POST.replace(/:post_id/, postId));
};

export const postApi = {
  getPostApi,
  postCommentApi,
  getCommentApi,
  postReplyCommentApi,
  patchReactionApi,
  patchViewPost,
  patchSavePost,
  patchUnSavePost,
  patchLikePostApi,
  patchUnLikePostApi,
  removePostApi,
};
