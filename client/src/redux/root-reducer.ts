import { combineReducers } from '@reduxjs/toolkit';

import { commonReducer } from './slices/common.slice';
import { authReducer } from 'features/auth/redux/auth.slice';
import { masterDataReducer } from 'features/master-data/master-data';
import { exploreReducer } from 'features/explore/explore';
import { postReducer } from 'features/post/post';
import { socketReducer } from './slices/socket.slice';
import { profileReducer } from 'features/profile/profile';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  masterData: masterDataReducer,
  explore: exploreReducer,
  post: postReducer,
  socket: socketReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
