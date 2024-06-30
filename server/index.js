import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConn from "./config/dbConn.js";
import mongoose from "mongoose";
import cors from "cors";
import { corsOpt } from "./config/corsOptions.js";

dbConn();
const app = express();

//middelwares
app.use(cors(corsOpt));

//server start
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server up and running in port ${process.env.SERVER_PORT}`);
  });
});
