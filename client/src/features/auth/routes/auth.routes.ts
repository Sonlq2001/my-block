import BlankLayout from "components/layouts/BlankLayout/BlankLayout";
import LoginScreen from "./../screens/LoginScreen/LoginScreen";

import { RouteItemDef } from "types/routes.types";
import { AuthPathsEnum } from "../constants/auth.paths";

const LOGIN_SCREEN: RouteItemDef = {
  id: "login",
  path: AuthPathsEnum.LOGIN,
  component: LoginScreen,
  layout: BlankLayout,
  isExact: true,
  // isAuthRoute: true,
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
