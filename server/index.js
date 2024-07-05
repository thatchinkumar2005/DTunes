import dotenv from "dotenv";
dotenv.config();
import express from "express";
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

dbConn();
const app = express();
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
//error handler
app.use(handleErr);
//server start
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server up and running in port ${process.env.SERVER_PORT}`);
  });
});
