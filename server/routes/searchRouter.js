import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import searchController from "../controllers/Search/searchController.js";
import getSearchRecommendation from "../controllers/Search/getSearchRecommendation.js";

const searchRouter = express.Router();

searchRouter.get("/", verifyJwt, verifyRoles(2005, 2009), searchController);
searchRouter.get(
  "/recommendation",
  verifyJwt,
  verifyRoles(2005, 2009),
  getSearchRecommendation
);

export { searchRouter };
