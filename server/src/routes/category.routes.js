import express from "express";

import {
	postCategory,
	getCategories,
} from "./../controllers/categoryController";

const route = express.Router();

route.get("/categories", getCategories);

route.post("/category", postCategory);

export default route;
