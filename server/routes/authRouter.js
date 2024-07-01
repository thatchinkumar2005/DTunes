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
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";

const authRouter = express.Router();

authRouter.get("/", verifyJwt, verifyRoles(2005, 2009), getAuthInfoController);
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
