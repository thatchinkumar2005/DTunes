import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import searchController from "../controllers/Search/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", verifyJwt, verifyRoles(2005, 2009), searchController);

export { searchRouter };
