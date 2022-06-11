import express from "express";

import {
	getUser,
	useSavePost,
	useUnSavePost,
	getUserInfo,
	getUserSearch,
} from "./../controllers/userController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/profile/:user_id", verifyToken, getUser);
route.patch("/user_save_post", verifyToken, useSavePost);
route.patch("/user_un_save_post", verifyToken, useUnSavePost);
route.get("/user_info", verifyToken, getUserInfo);
route.get("/users/search", getUserSearch);

export default route;
