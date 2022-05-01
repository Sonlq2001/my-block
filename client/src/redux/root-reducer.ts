import { combineReducers } from '@reduxjs/toolkit';

import { commonReducer } from './slices/common.slice';
import { authReducer } from 'features/auth/redux/auth.slice';
import { masterDataReducer } from 'features/master-data/master-data';
import { exploreReducer } from 'features/explore/explore';
import { postReducer } from 'features/post/post';
import { socketReducer } from './slices/socket.slice';
import { profileReducer } from 'features/profile/profile';
import { notifyReducer } from 'features/notify/notify';
import { homeReducer } from 'features/home/home';
import { userReducer } from 'features/user/user';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  masterData: masterDataReducer,
  explore: exploreReducer,
  post: postReducer,
  socket: socketReducer,
  profile: profileReducer,
  notify: notifyReducer,
  home: homeReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
