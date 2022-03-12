import { RouteItemDef } from 'types/routes.types';
import ProfileScreen from './../screens/ProfileScreen/ProfileScreen';
import { ProfilePathsEnum } from './../constants/profile.paths';

const PROFILE_SCREEN: RouteItemDef = {
  id: 'id_profile',
  path: ProfilePathsEnum.PROFILE,
  component: ProfileScreen,
};

export const PROFILE_ROUTES = [PROFILE_SCREEN];
