import { HOME_ROUTES } from 'features/home/routes/home.routes';
import { ABOUT_ROUTES } from 'features/about/routes/about.routes';
import { AUTH_ROUTES } from 'features/auth/auth';
// import { NOT_FOUND_ROUTES } from 'features/not-found/not-found';
import { POST_ROUTES } from 'features/post/post';
import { PROFILE_ROUTES } from 'features/profile/profile';
import { EXPLORE_ROUTES } from 'features/explore/routes/explore.routes';
import { NEW_POST_ROUTES } from 'features/new-post/new-post';
import { CHAT_ROUTES } from 'features/chat/chat';
import { NEW_POST_2_ROUTES } from 'features/new-post-2/new-post';

export const LIST_ROUTES = [
  ...NEW_POST_2_ROUTES,
  ...CHAT_ROUTES,
  ...NEW_POST_ROUTES,
  ...EXPLORE_ROUTES,
  ...PROFILE_ROUTES,
  ...POST_ROUTES,
  ...AUTH_ROUTES,
  ...ABOUT_ROUTES,
  ...HOME_ROUTES,
  // ...NOT_FOUND_ROUTES,
];
