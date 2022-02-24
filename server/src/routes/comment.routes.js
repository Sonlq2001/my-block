import express from "express";

import { createComment } from "./../controllers/commentController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.post("/comment", verifyToken, createComment);

export default route;
