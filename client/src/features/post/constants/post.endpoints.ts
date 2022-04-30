export enum PostEndpointsEnum {
  GET_POST = '/post/:post_id',
  POST_COMMENT = '/comment',
  GET_COMMENTS = '/comments/:post_id',
  POST_REPLY_COMMENT = '/reply',
  PATCH_REACTION = '/reaction/:comment_id',
  PATCH_VIEW_POST = '/view_post/:post_id',
}
