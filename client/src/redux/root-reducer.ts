import { combineReducers } from "@reduxjs/toolkit";

import { commonReducer } from "./slices/common.slice";
import { authReducer } from "features/auth/redux/auth.slice";

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
