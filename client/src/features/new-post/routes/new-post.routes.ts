import NewPostScreen from '../screens/NewPostScreen';

import { RouteItemDef } from 'types/routes.types';
import NewPostLayout from 'layouts/NewPostLayout/NewPostLayout';

import { NewPostPathEnums } from '../constants/new-post.paths';

const NEW_POST_SCREEN: RouteItemDef = {
  id: 'id_new_post',
  path: NewPostPathEnums.CERATE,
  component: NewPostScreen,
  layout: NewPostLayout,
};

const EDIT_POST_SCREEN: RouteItemDef = {
  id: 'edit-post',
  path: NewPostPathEnums.EDIT,
  component: NewPostScreen,
  layout: NewPostLayout,
};

export const NEW_POST_ROUTES = [NEW_POST_SCREEN, EDIT_POST_SCREEN];
