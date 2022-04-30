import express from "express";

import {
	getPosts,
	createPost,
	getPost,
	searchPost,
	viewPost,
	getPostsTrending,
} from "./../controllers/postController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/posts", verifyToken, getPosts);
route.post("/post", verifyToken, createPost);
route.get("/post/:post_id", verifyToken, getPost);
route.get("/search", verifyToken, searchPost);
route.patch("/view_post/:post_id", verifyToken, viewPost);
route.get("/posts_trending", verifyToken, getPostsTrending);

export default route;
