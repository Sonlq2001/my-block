import express from "express";

import { createComment, getComments } from "./../controllers/commentController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/comments", verifyToken, getComments);
route.post("/comment", verifyToken, createComment);

export default route;
