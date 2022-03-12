import express from "express";

import { getUser } from "./../controllers/userController";

const route = express.Router();

route.get("/profile/:user_id", getUser);

export default route;
