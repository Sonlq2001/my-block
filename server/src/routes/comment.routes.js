import express from "express";

import {
  createComment,
  getComments,
  replyComment,
} from "./../controllers/commentController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/comments/:post_id", verifyToken, getComments);
route.post("/comment", verifyToken, createComment);
route.post("/reply", verifyToken, replyComment);

export default route;
