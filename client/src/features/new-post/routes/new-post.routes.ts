import NewPostScreen from '../screens/NewPostScreen/NewPostScreen';

import { RouteItemDef } from 'types/routes.types';
import { NewPostPathsEnum } from './../constants/new-post.path';
import HiddenMenuHeaderLayout from 'layouts/HiddenMenuHeaderLayout/HiddenMenuHeaderLayout';

const NEW_POST_SCREEN: RouteItemDef = {
  id: 'id_new_post',
  path: NewPostPathsEnum.NEW_POST,
  component: NewPostScreen,
  layout: HiddenMenuHeaderLayout,
};

export const NEW_POST_ROUTES = [NEW_POST_SCREEN];
