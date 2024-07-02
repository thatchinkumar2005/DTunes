import express from "express";
import getAllPlaylistsController from "../controllers/playlists/getAllPlaylistsController.js";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import getSinglePlaylistController from "../controllers/playlists/getSinglePlaylistController.js";
import createPlaylistController from "../controllers/playlists/createPlaylistController.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import updatePlaylistController from "../controllers/playlists/updatePlaylistController.js";
import deletePlaylistController from "../controllers/playlists/deletePlaylistController.js";
import { playlistUpload } from "../middleware/multer/playlist.js";
import getAllPlaylistSongsController from "../controllers/playlists/getAllPlaylistSongsController.js";

const playlistRouter = express.Router();

playlistRouter.get(
  "/",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAllPlaylistsController
);

playlistRouter.get(
  "/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getSinglePlaylistController
);

playlistRouter.post(
  "/",
  playlistUpload,
  verifyJwt,
  verifyRoles(2005, 2009),
  createPlaylistController
);

playlistRouter.put(
  "/:id",
  playlistUpload,
  verifyJwt,
  verifyRoles(2005, 2009),
  updatePlaylistController
);

playlistRouter.delete(
  "/:id",
  verifyJwt,
  verifyRoles(2005, 2005),
  deletePlaylistController
);

playlistRouter.get(
  "/songs/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAllPlaylistSongsController
);

export { playlistRouter };
