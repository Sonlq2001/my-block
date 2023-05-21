import { RouteItemDef } from '../../../types/routes.types';
import HomeScreen from './../screens/HomeScreen';
import { HomePathsEnum } from '../constants/home.paths';

const HOME_SCREEN: RouteItemDef = {
  id: 'id_home',
  path: HomePathsEnum.ROOT,
  component: HomeScreen,
  isExact: true,
};

export const HOME_ROUTES = [HOME_SCREEN];
