import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConn from "./config/dbConn.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { corsOpt } from "./config/corsOptions.js";
import { authRouter } from "./routes/authRouter.js";
import credentials from "./middleware/credentials.js";
import handleErr from "./middleware/general/handleErr.js";

dbConn();
const app = express();

//middelwares

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
app.use("/api/v1/auth/", authRouter);

//error handler
app.use(handleErr);
//server start
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server up and running in port ${process.env.SERVER_PORT}`);
  });
});
