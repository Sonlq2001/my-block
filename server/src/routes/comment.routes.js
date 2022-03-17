import express from "express";

import {
	createComment,
	getComments,
	replyComment,
	reactionComment,
} from "./../controllers/commentController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/comments/:post_id", verifyToken, getComments);
route.post("/comment", verifyToken, createComment);
route.post("/reply", verifyToken, replyComment);
route.post("/reply", verifyToken, replyComment);
route.patch("/reaction/:comment_id", verifyToken, reactionComment);

export default route;
