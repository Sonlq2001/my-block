import NewPostScreen from '../screens/NewPostScreen';

import { RouteItemDef } from 'types/routes.types';
import HideHeaderLayout from 'layouts/HideHeaderLayout/HideHeaderLayout';

const NEW_POST_2_SCREEN: RouteItemDef = {
  id: 'id_new_post_2',
  path: '/new-post-2',
  component: NewPostScreen,
  layout: HideHeaderLayout,
};

export const NEW_POST_2_ROUTES = [NEW_POST_2_SCREEN];
