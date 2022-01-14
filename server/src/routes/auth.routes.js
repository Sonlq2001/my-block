import express from "express";

import {
	register,
	login,
	getAllUsers,
	deleteUser,
} from "./../controllers/authController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/users", verifyToken, getAllUsers);
route.delete("/users/:id", deleteUser);

export default route;
