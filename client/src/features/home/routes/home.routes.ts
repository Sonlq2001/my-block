import { RouteItemDef } from "../../../types/routes.types";
import HomeScreen from "./../screens/HomeScreen";

const HOME_SCREEN: RouteItemDef = {
  id: "id_home",
  path: "/",
  component: HomeScreen,
  isExact: true,
};

export const HOME_ROUTES = [HOME_SCREEN];
