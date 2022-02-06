import express from "express";

import { refreshToken } from "./../controllers/refreshTokenController";
const route = express.Router();

route.post("/refresh_token", refreshToken);

export default route;
