import { combineReducers } from '@reduxjs/toolkit';

import { commonReducer } from './slices/common.slice';
import { authReducer } from 'features/auth/redux/auth.slice';
import { masterDataReducer } from 'features/master-data/master-data';
import { exploreReducer } from 'features/explore/explore';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  masterData: masterDataReducer,
  explore: exploreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
