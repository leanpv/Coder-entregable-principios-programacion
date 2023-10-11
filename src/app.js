import 'dotenv/config'
import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import cookieParser from "cookie-parser";
import { initilizeSocketGame } from './controllers/socket.controllers.js';
// import socketMiddleware from "./utils/sockets.midelware.js"
import session from "express-session"
import router from "./routes/app.routes.js"
import mongoData from "./db/index.js";


const app = express();
const port = 2020;
mongoData()
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views/"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use("/", router)

// router(app)

const server = app.listen(port, () => {
  console.log(`server on port: ${port}`);
});


const io = new Server(server)
initilizeSocketGame(io)
// socketMiddleware(io)
// io.on("connection", (socket) => {
//   console.log("Connected to io server");
//   socket.on("disconnect", () => {

//     console.log("Disconnected from io server");
//   });
// });
