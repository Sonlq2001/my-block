import { RouteItemDef } from 'types/routes.types';

import PostScreen from './../screens/PostScreen/PostScreen';
import { PostPathsEnum } from './../constants/post.paths';

const POST_SCREEN: RouteItemDef = {
  id: 'id_post',
  path: PostPathsEnum.POST,
  component: PostScreen,
};

export const POST_ROUTES = [POST_SCREEN];
