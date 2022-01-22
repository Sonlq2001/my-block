import { RouteItemDef } from "types/routes.types";

import PostScreen from "./../screens/PostScreen/PostScreen";

const POST_SCREEN: RouteItemDef = {
  id: "id_post",
  path: "/post/:id",
  component: PostScreen,
};

export const POST_ROUTES = [POST_SCREEN];
