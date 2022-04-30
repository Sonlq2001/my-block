import express from "express";

import {
	createNotify,
	getNotifies,
	patchReadNotify,
} from "./../controllers/notifyController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.get("/notifies", verifyToken, getNotifies);
route.post("/notify", verifyToken, createNotify);
route.patch("/read_notify", verifyToken, patchReadNotify);

export default route;
