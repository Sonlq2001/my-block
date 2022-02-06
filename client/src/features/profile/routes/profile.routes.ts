import { RouteItemDef } from "types/routes.types";
import ProfileScreen from "./../screens/ProfileScreen/ProfileScreen";

const PROFILE_SCREEN: RouteItemDef = {
  id: "id_profile",
  path: "/profile/:id",
  component: ProfileScreen,
};

export const PROFILE_ROUTES = [PROFILE_SCREEN];
