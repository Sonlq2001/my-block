import express from "express";

import {
	getPosts,
	createPost,
	getPost,
	searchPost,
	viewPost,
	getPostsTrending,
	getPostsUser,
	getPostNewest,
	getPostExplore,
	getPostsType,
	getPostsVideo,
	patchLikePost,
	patchUnLikePost,
	getPostSlide,
} from "./../controllers/postController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/posts", verifyToken, getPosts);
route.post("/post", verifyToken, createPost);
route.get("/post/:slug", verifyToken, getPost);
route.get("/search", verifyToken, searchPost);
route.patch("/view_post/:post_id", verifyToken, viewPost);
route.get("/posts_trending", verifyToken, getPostsTrending);
route.get("/posts_user/:user_id", verifyToken, getPostsUser);

route.get("/post_newest", verifyToken, getPostNewest);
route.get("/post_explore", getPostExplore);
route.get("/posts_type", verifyToken, getPostsType);
route.get("/posts_video", getPostsVideo);

route.patch("/like_post/:id", verifyToken, patchLikePost);
route.patch("/unlike_post/:id", verifyToken, patchUnLikePost);

route.get("/posts_slide", getPostSlide);

export default route;
