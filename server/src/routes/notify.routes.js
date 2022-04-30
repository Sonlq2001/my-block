import express from "express";

import { createNotify, getNotifies } from "./../controllers/notifyController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/notifies", verifyToken, getNotifies);
route.post("/notify", verifyToken, createNotify);

export default route;
