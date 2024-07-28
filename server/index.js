import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dbConn from "./config/dbConn.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { corsOpt } from "./config/corsOptions.js";
import { authRouter } from "./routes/authRouter.js";
import credentials from "./middleware/general/credentials.js";
import handleErr from "./middleware/general/handleErr.js";
import { songsRouter } from "./routes/songsRouter.js";
import { albumRouter } from "./routes/albumRouter.js";
import { playlistRouter } from "./routes/playlistRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { friendRouter } from "./routes/friendRouter.js";
import { partyRouter } from "./routes/partyRouter.js";
import { searchRouter } from "./routes/searchRouter.js";
import { recommendRouter } from "./routes/recommendRouter.js";
import { log } from "console";
import handleSockets from "./socket/index.js";

dbConn();
const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

handleSockets(io);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middelwares

//static server
app.use("/serverStorage", express.static(join(__dirname, "STORAGE")));
//set Access-Control-Allow-Credentials before Cors only for allowed origins
app.use(credentials);
//cors
app.use(cors(corsOpt));

//other middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//routes

//public
app.use("/api/v1/auth/", authRouter); //auth router

//private
app.use("/api/v1/songs/", songsRouter); //songs router
app.use("/api/v1/albums/", albumRouter); //album router
app.use("/api/v1/playlists/", playlistRouter); //playlist router
app.use("/api/v1/users/", userRouter); //user router
app.use("/api/v1/friend/", friendRouter); //friend router
app.use("/api/v1/party/", partyRouter);
app.use("/api/v1/search/", searchRouter);
app.use("/api/v1/recommend/", recommendRouter);
//error handler
app.use(handleErr);
//server start
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  server.listen(process.env.SERVER_PORT || 7777, () => {
    console.log(
      `server up and running in port ${process.env.SERVER_PORT || 7777}`
    );
  });
});
