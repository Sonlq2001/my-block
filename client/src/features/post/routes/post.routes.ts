import { RouteItemDef } from 'types/routes.types';

import PostScreen from './../screens/PostScreen/PostScreen';
import { PostPathsEnum } from './../constants/post.paths';
import HeaderProgressBar from 'layouts/HeaderProgressBar/HeaderProgressBar';

const POST_SCREEN: RouteItemDef = {
  id: 'id_post',
  path: PostPathsEnum.POST,
  component: PostScreen,
  layout: HeaderProgressBar,
};

export const POST_ROUTES = [POST_SCREEN];
