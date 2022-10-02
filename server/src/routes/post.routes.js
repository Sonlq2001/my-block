import express from "express";

import {
	getPosts,
	createPost,
	getPost,
	searchPost,
	viewPost,
	getPostsTrending,
	getPostsUser,
	getPostsSaved,
	getPostNewest,
	getPostExplore,
	getPostsType,
} from "./../controllers/postController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/posts", verifyToken, getPosts);
route.post("/post", verifyToken, createPost);
route.get("/post/:slug", verifyToken, getPost);
route.get("/search", verifyToken, searchPost);
route.patch("/view_post/:post_id", verifyToken, viewPost);
route.get("/posts_trending", verifyToken, getPostsTrending);
route.get("/posts_user/:user_id", getPostsUser);
route.get("/post_saved", verifyToken, getPostsSaved);
route.get("/post_newest", verifyToken, getPostNewest);
route.get("/post_explore", getPostExplore);
route.get("/posts-type", getPostsType);

export default route;
