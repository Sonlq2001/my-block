import React from "react";
import { RouteItemDef } from "../../../types/routes.types";
const HomeScreen = React.lazy(() => import("./../screens/HomeScreen"));

export const HOME_SCREEN: RouteItemDef = {
	id: "id_home",
	path: "/",
	component: HomeScreen,
	pageTitle: "Home",
};

export const HOME_ROUTES = [HOME_SCREEN];
