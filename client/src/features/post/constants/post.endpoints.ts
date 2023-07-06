export enum PostEndpointsEnum {
  GET_POST = '/post/:slug',
  POST_COMMENT = '/comment',
  GET_COMMENTS = '/comments',
  POST_REPLY_COMMENT = '/reply',
  PATCH_REACTION = '/reaction/:comment_id',
  PATCH_VIEW_POST = '/view_post/:post_id',
  PATCH_SAVE_POST = '/user_save_post/:post_id',
  PATCH_UN_SAVE_POST = '/user_un_save_post/:post_id',
  PATCH_LIKE_POST = '/like_post/:id',
  PATCH_UNLIKE_POST = '/unlike_post/:id',
  REMOVE_POST = '/remove_post/:post_id',
}
