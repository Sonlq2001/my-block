import NewPostScreen from '../screens/NewPostScreen';

import { RouteItemDef } from 'types/routes.types';
import NewPostLayout from 'layouts/NewPostLayout/NewPostLayout';

const NEW_POST_2_SCREEN: RouteItemDef = {
  id: 'id_new_post_2',
  path: '/new-post-2',
  component: NewPostScreen,
  layout: NewPostLayout,
};

export const NEW_POST_2_ROUTES = [NEW_POST_2_SCREEN];
