import { RouteItemDef } from "types/routes.types";

import BlankLayout from "components/layouts/BlankLayout/BlankLayout";
import NotFoundScreen from "./../screens/NotFound404/NotFound404";

const NOT_FOUND_SCREEN: RouteItemDef = {
  id: "id_page4040",
  path: "*",
  component: NotFoundScreen,
  layout: BlankLayout,
  isExact: true,
};

export const NOT_FOUND_ROUTES = [NOT_FOUND_SCREEN];
