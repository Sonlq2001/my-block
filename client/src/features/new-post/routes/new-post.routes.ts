import NewPostScreen from '../screens/NewPostScreen/NewPostScreen';

import { RouteItemDef } from 'types/routes.types';
import { NewPostPathsEnum } from './../constants/new-post.path';
import HideHeaderLayout from 'layouts/HideHeaderLayout/HideHeaderLayout';

const NEW_POST_SCREEN: RouteItemDef = {
  id: 'id_new_post',
  path: NewPostPathsEnum.NEW_POST,
  component: NewPostScreen,
  layout: HideHeaderLayout,
};

export const NEW_POST_ROUTES = [NEW_POST_SCREEN];
