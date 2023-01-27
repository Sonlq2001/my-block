export enum ProfileEndpointsEnum {
  GET_PROFILE = '/profile/:user_id',
  GET_POSTS_USER = '/posts_user/:user_id',
  GET_POSTS_SAVED = '/post_saved',
  PATCH_USER = '/update_user',
  PATCH_FOLLOWERS_USER = '/follow/:user_id',
  PATCH_UN_FOLLOWERS_USER = '/un_follow/:user_id',
}
