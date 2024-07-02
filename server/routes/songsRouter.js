import express from "express";
import getSongsController from "../controllers/Songs/getSongsController.js";
import newSongController from "../controllers/Songs/newSongController.js";
import getSingleSongController from "../controllers/Songs/getSingleSongController.js";
import { upload } from "../middleware/multer/Upload.js";
import updateSongController from "../controllers/Songs/updateSongController.js";
import deleteSongController from "../controllers/Songs/deleteSongController.js";
import getLyricController from "../controllers/Songs/getLyricController.js";
import likeController from "../controllers/Songs/likeController.js";
import playController from "../controllers/Songs/playController.js";
import getLikesController from "../controllers/Songs/getLikesController.js";
import toggleToPlaylist from "../controllers/Songs/toggleToPlaylist.js";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";

const songsRouter = express.Router();

songsRouter.get("/", verifyJwt, verifyRoles(2005, 2009), getSongsController);
songsRouter.get(
  "/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getSingleSongController
);
songsRouter.post("/", upload, verifyJwt, verifyRoles(2009), newSongController);
songsRouter.put(
  "/:id",
  upload,
  verifyJwt,
  verifyRoles(2009),
  updateSongController
);
songsRouter.delete("/:id", verifyJwt, verifyRoles(2009), deleteSongController);
songsRouter.get(
  "/lyric/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getLyricController
);
songsRouter.get(
  "/play/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  playController
);
songsRouter.get(
  "/like/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  likeController
);
songsRouter.get(
  "/getLikes/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getLikesController
);
songsRouter.post(
  "/toggleToPlaylist/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  toggleToPlaylist
);

export { songsRouter };
