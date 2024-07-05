import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import newPartyController from "../controllers/Party/newPartyController.js";
import { partyUpload } from "../middleware/multer/party.js";
import togglerequestPartyMemberController from "../controllers/Party/toggleRequestPartyMember.js";
import respondPartyRequestController from "../controllers/Party/respondPartyReqController.js";

const partyRouter = express.Router();

partyRouter.post(
  "/",
  partyUpload,
  verifyJwt,
  verifyRoles(2005, 2009),
  newPartyController
);

partyRouter.post(
  "/request",
  verifyJwt,
  verifyRoles(2005, 2009),
  togglerequestPartyMemberController
);

partyRouter.post(
  "/respond/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  respondPartyRequestController
);

export { partyRouter };
