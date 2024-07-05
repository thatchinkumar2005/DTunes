import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import recommendSongsController from "../controllers/SongRecommendation/recommendSongsController.js";

const recommendRouter = express.Router();

recommendRouter.get(
  "/",
  verifyJwt,
  verifyRoles(2005, 2009),
  recommendSongsController
);
export { recommendRouter };
