import express from "express";

import { createTopic, getTopics } from "./../controllers/topicController";

const route = express.Router();

route.get("/topics", getTopics);
route.post("/topic", createTopic);

export default route;
