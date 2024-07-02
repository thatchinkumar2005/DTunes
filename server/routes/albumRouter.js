import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import getAllAlbumsController from "../controllers/Albums/getAllAlbumsController.js";
import getSingleAlbum from "../controllers/Albums/getSingleAlbum.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import createNewAlbumController from "../controllers/Albums/createNewAlbumController.js";
import { albumUpload } from "../middleware/multer/album.js";
import updateAlbumController from "../controllers/Albums/updateAlbumController.js";
import deleteAlbumController from "../controllers/Albums/deleteAlbumController.js";

const albumRouter = express.Router();

albumRouter.get(
  "/",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAllAlbumsController
);
albumRouter.get("/:id", verifyJwt, verifyRoles(2005, 2009), getSingleAlbum);
albumRouter.post(
  "/",
  albumUpload,
  verifyJwt,
  verifyRoles(2009),
  createNewAlbumController
);
albumRouter.put(
  "/:id",
  albumUpload,
  verifyJwt,
  verifyRoles(2009),
  updateAlbumController
);
albumRouter.delete("/:id", verifyJwt, verifyRoles(2009), deleteAlbumController);

export { albumRouter };
