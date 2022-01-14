import React from "react";

import BlankLayout from "components/layouts/BlankLayout/BlankLayout";
import { RouteItemDef } from "types/routes.types";
import { AuthPathsEnum } from "../constants/auth.paths";

const LOGIN_SCREEN: RouteItemDef = {
	id: "login",
	path: AuthPathsEnum.LOGIN,
	component: React.lazy(() => import("../screens/LoginScreen/LoginScreen")),
	layout: BlankLayout,
	// isAuthRoute: true,
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
