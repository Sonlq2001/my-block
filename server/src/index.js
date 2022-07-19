import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import routes from "./routes/app.routes";
import db from "./config/connectDB";
import SocketServer from "./config/socket";
import a from "./routes/category.routes";

const app = express();
const port = 5000;
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

app.use("/api", routes.authRoute);
app.use("/api", routes.refreshTokenRoute);
app.use("/api", routes.topicRoute);
app.use("/api", routes.postRoute);
app.use("/api", routes.commentRoute);
app.use("/api", routes.userRoute);
app.use("/api", routes.notiFyRoute);
app.use("/api", routes.messageRoute);
app.use("/api", a);

// socket
const http = createServer(app);
export const io = new Server(http);

io.on("connection", (socket) => {
	SocketServer(socket);
});

http.listen(port, () => {
	console.log(`Server running ${port}`);
});
