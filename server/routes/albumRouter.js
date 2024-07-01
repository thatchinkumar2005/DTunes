import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import getAllAlbumsController from "../controllers/Albums/getAllAlbumsController.js";
import getSingleAlbum from "../controllers/Albums/getSingleAlbum.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import createNewAlbumController from "../controllers/Albums/createNewAlbumController.js";

const albumRouter = express.Router();

albumRouter.get(
  "/",
  verifyJwt,
  verifyRoles(2005, 2009),
  getAllAlbumsController
);
albumRouter.get("/:id", verifyJwt, verifyRoles(2005, 2009), getSingleAlbum);
albumRouter.post("/", verifyJwt, verifyRoles(2009), createNewAlbumController);

export { albumRouter };
