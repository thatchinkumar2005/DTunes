import express from "express";
import getAuthInfoController from "../controllers/Auth/getAuthInfoController.js";
import registerController from "../controllers/Auth/registerController.js";
import loginController from "../controllers/Auth/loginController.js";
import refreshController from "../controllers/Auth/refreshController.js";
import logoutController from "../controllers/Auth/logoutController.js";
import {
  googleOauthTokenExchanger,
  passport,
} from "../controllers/Auth/oauth/google/google.js";

const authRouter = express.Router();

authRouter.get("/", getAuthInfoController);
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/refresh", refreshController);
authRouter.get("/logout", logoutController);

authRouter.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get("/oauth/google/token", googleOauthTokenExchanger);

export { authRouter };
