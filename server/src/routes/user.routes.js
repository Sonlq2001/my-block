import express from "express";

import {
	getUser,
	patchUseSavePost,
	useUnSavePost,
	getUserInfo,
	getUserSearch,
	patchUpdateUser,
} from "./../controllers/userController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/profile/:user_id", verifyToken, getUser);
route.patch("/user_save_post/:post_id", verifyToken, patchUseSavePost);
route.patch("/user_un_save_post/:post_id", verifyToken, useUnSavePost);
route.get("/user_info", verifyToken, getUserInfo);
route.get("/users/search", getUserSearch);
route.patch("/update_user", verifyToken, patchUpdateUser);
export default route;
