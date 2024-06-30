import express from "express";
import getAuthInfoController from "../controllers/Auth/getAuthInfoController.js";
import registerController from "../controllers/Auth/registerController.js";
import loginController from "../controllers/Auth/loginController.js";

const authRouter = express.Router();

authRouter.get("/", getAuthInfoController);
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export { authRouter };
