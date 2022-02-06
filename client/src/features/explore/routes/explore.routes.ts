import { RouteItemDef } from "types/routes.types";

import ExploreScreen from "./../screens/ExploreScreen/ExploreScreen";
import { ExplorePathsEnum } from "./../constants/explore.paths";

const EXPLORE_SCREEN: RouteItemDef = {
  id: "id_explore",
  path: ExplorePathsEnum.EXPLORE,
  component: ExploreScreen,
};

export const EXPLORE_ROUTES = [EXPLORE_SCREEN];
