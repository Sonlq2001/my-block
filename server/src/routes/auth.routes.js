import express from "express";

import { logout, loginGoogle } from "./../controllers/authController";
import { verifyToken } from "./../middleware/verifyToken";

const route = express.Router();

route.post("/logout", verifyToken, logout);
route.post("/login_google", loginGoogle);

export default route;
