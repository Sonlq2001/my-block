import { HOME_ROUTES } from "features/home/routes/home.routes";
import { ABOUT_ROUTES } from "features/about/routes/about.routes";
import { AUTH_ROUTES } from "features/auth/auth";

export const LIST_ROUTES = [...AUTH_ROUTES, ...ABOUT_ROUTES, ...HOME_ROUTES];
