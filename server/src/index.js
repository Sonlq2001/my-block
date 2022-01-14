import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import routes from "./routes/app.routes";
import db from "./config/connectDB";

const app = express();
dotenv.config();
db.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 4000;

app.use("/api", routes.authRoute);

app.listen(port, () => {
	console.log(`Server running ${port}`);
});
