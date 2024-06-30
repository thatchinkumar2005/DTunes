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

dbConn();
const app = express();

//middelwares
app.use(cors(corsOpt));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//routes
app.use("/api/v1/auth/", authRouter);

//server start
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server up and running in port ${process.env.SERVER_PORT}`);
  });
});
