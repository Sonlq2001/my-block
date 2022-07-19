import { AxiosResponse } from 'axios';

import api from 'api/api';
import { PostEndpointsEnum } from './../constants/post.endpoints';

const getPostApi = (slug: string): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_POST.replace(/:slug/, slug));
};

const postCommentApi = (comment: any): Promise<AxiosResponse> => {
  return api.post(PostEndpointsEnum.POST_COMMENT, comment);
};

const getCommentApi = ({
  postId,
  query,
}: {
  postId: string;
  query?: { page: number; perPage: number };
}): Promise<AxiosResponse> => {
  return api.get(PostEndpointsEnum.GET_COMMENTS.replace(/:post_id/, postId), {
    params: { page: query?.page, per_page: query?.perPage },
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
  return api.patch(PostEndpointsEnum.PATCH_SAVE_POST, { postId });
};

const patchUnSavePost = (postId: string): Promise<AxiosResponse> => {
  return api.patch(PostEndpointsEnum.PATCH_UN_SAVE_POST, { postId });
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
};
