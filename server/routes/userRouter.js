import express from "express";
import getAllUsersController from "../controllers/Users/getAllUsersController.js";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import getSingleUserController from "../controllers/Users/getSingleUserController.js";
import getUserSongsController from "../controllers/Users/getUserSongsController.js";
import getUserAlbumsController from "../controllers/Users/getUserAlbumsController.js";
import getUserPlaylistController from "../controllers/Users/getUserPlaylistsController.js";
import getAuthUserController from "../controllers/Users/authUser/getAuthUserController.js";
import updateAuthUserController from "../controllers/Users/authUser/updateAuthUserController.js";
import { userUpload } from "../middleware/multer/user.js";

const userRouter = express.Router();

//users
//authUser
userRouter.get(
  "/authUser",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserController
);

userRouter.put(
  "/authUser",
  userUpload,
  verifyJwt,
  verifyRoles(2005, 2009),
  updateAuthUserController
);

//all users
userRouter.get("/", verifyJwt, verifyRoles(2005, 2009), getAllUsersController);
userRouter.get(
  "/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getSingleUserController
);
userRouter.get(
  "/songs/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getUserSongsController
);
userRouter.get(
  "/albums/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getUserAlbumsController
);
userRouter.get(
  "/playlists/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getUserPlaylistController
);

userRouter.get("/authUser/info", verifyJwt, verifyRoles);
export { userRouter };
