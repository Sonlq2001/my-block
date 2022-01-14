import React from "react";
import { RouteItemDef } from "types/routes.types";

const AboutScreen = React.lazy(() => import("./../screens/AboutScreen"));

export const ABOUT_SCREEN: RouteItemDef = {
	id: "id_about",
	path: "/about",
	component: AboutScreen,
};

export const ABOUT_ROUTES = [ABOUT_SCREEN];
