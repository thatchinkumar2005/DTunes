import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import newPartyController from "../controllers/Party/newPartyController.js";
import { partyUpload } from "../middleware/multer/party.js";

const partyRouter = express.Router();

partyRouter.post(
  "/",
  partyUpload,
  verifyJwt,
  verifyRoles(2005, 2009),
  newPartyController
);

export { partyRouter };
