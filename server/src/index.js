import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/app.routes";
import db from "./config/connectDB";

const app = express();
dotenv.config();
db.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const port = 4000;

app.use("/api", routes.authRoute);
app.use("/api", routes.refreshTokenRoute);

app.listen(port, () => {
  console.log(`Server running ${port}`);
});
