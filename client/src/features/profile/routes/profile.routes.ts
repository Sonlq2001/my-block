import { RouteItemDef } from 'types/routes.types';
import ProfileScreen from './../screens/ProfileScreen/ProfileScreen';
import ProfileSettingScreen from './../screens/ProfileSettingScreen/ProfileSettingScreen';
import { ProfilePathsEnum } from './../constants/profile.paths';

const PROFILE_SCREEN: RouteItemDef = {
  id: 'id_profile',
  path: ProfilePathsEnum.PROFILE,
  component: ProfileScreen,
};

const EDIT_PROFILE_SCREEN: RouteItemDef = {
  id: 'id_edit_profile',
  path: ProfilePathsEnum.PROFILE_SETTING,
  component: ProfileSettingScreen,
};

export const PROFILE_ROUTES = [PROFILE_SCREEN, EDIT_PROFILE_SCREEN];
