import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/app.routes";
import db from "./config/connectDB";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

dotenv.config();
db.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const port = 5000;

app.use("/api", routes.authRoute);
app.use("/api", routes.refreshTokenRoute);
app.use("/api", routes.topicRoute);
app.use("/api", routes.postRoute);

app.listen(port, () => {
  console.log(`Server running ${port}`);
});
