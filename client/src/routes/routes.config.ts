import { HOME_ROUTES } from "features/home/routes/home.routes";
import { ABOUT_ROUTES } from "features/about/routes/about.routes";
import { AUTH_ROUTES } from "features/auth/auth";
import { NOT_FOUND_ROUTES } from "features/not-found/not-found";
import { POST_ROUTES } from "features/post/post";

export const LIST_ROUTES = [
  ...POST_ROUTES,
  ...AUTH_ROUTES,
  ...ABOUT_ROUTES,
  ...HOME_ROUTES,
  ...NOT_FOUND_ROUTES,
];
