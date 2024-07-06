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
import getAuthUserSongsController from "../controllers/Users/authUser/getAuthUserSongsController.js";
import getAuthUserAlbumsController from "../controllers/Users/authUser/getAuthUserAlbumsController.js";
import getAuthUserPlaylistsController from "../controllers/Users/authUser/getAuthUserPlaylistsController.js";
import getAllUserFriendsController from "../controllers/Users/getUserFriendsController.js";
import getAuthUserFriendsController from "../controllers/Users/authUser/getAuthUserFriendsController.js";
import getAuthUserPartyController from "../controllers/Users/authUser/getAuthUserPartyController.js";
import getUserPartyController from "../controllers/Users/getUserPartyController.js";
import getAuthUserFriendRequests from "../controllers/Users/authUser/getAuthUserFriendRequests.js";
import getAuthUserFrndReln from "../controllers/Users/authUser/getAuthUserFrndRelnController.js";
import getAuthUserSearchHistoryController from "../controllers/Users/authUser/getAuthUserSearchHistoryController.js";
import promoteToArtistController from "../controllers/Users/authUser/promoteToArtistController.js";

const userRouter = express.Router();

//users
//authUser
userRouter.get(
  "/authUser",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserController
);

userRouter.get(
  "/authUser/songs",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserSongsController
);

userRouter.get(
  "/authUser/albums",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserAlbumsController
);

userRouter.get(
  "/authUser/playlists",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserPlaylistsController
);

userRouter.get(
  "/authUser/friends",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserFriendsController
);

userRouter.get(
  "/authUser/party",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserPartyController
);

userRouter.get(
  "/authUser/friendRequests",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserFriendRequests
);

userRouter.get(
  "/authUser/getReln/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserFrndReln
);

userRouter.get(
  "/authUser/searchHistory",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAuthUserSearchHistoryController
);

userRouter.put(
  "/authUser",
  userUpload,
  verifyJwt,
  verifyRoles(2005, 2009),
  updateAuthUserController
);

userRouter.post(
  "/authUser/promote",
  verifyJwt,
  verifyRoles(2005, 2009),
  promoteToArtistController
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

userRouter.get(
  "/friends/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAllUserFriendsController
);

userRouter.get(
  "/party/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getUserPartyController
);
export { userRouter };
