import express from "express";

import {
	getPosts,
	createPost,
	getPost,
	searchPost,
	getPostUser,
} from "./../controllers/postController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/posts", verifyToken, getPosts);
route.post("/post", verifyToken, createPost);
route.get("/post/:post_id", verifyToken, getPost);
route.get("/search", searchPost);
route.get("/post_user/:user_id", getPostUser);

export default route;
