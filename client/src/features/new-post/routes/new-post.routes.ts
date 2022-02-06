import NewPostScreen from "../screens/NewPostScreen/NewPostScreen";

import { RouteItemDef } from "types/routes.types";
import { NewPostEnumPaths } from "./../constants/new-post.path";

const NEW_POST_SCREEN: RouteItemDef = {
  id: "id_new_post",
  path: NewPostEnumPaths.NEW_POST,
  component: NewPostScreen,
};

export const NEW_POST_ROUTES = [NEW_POST_SCREEN];
