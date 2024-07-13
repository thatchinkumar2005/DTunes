import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import newPartyController from "../controllers/Party/newPartyController.js";
import { partyUpload } from "../middleware/multer/party.js";
import togglerequestPartyMemberController from "../controllers/Party/toggleRequestPartyMember.js";
import respondPartyRequestController from "../controllers/Party/respondPartyReqController.js";
import deletePartyController from "../controllers/Party/deletePartyController.js";
import leavePartyController from "../controllers/Party/leavePartyController.js";
import getPartyMembers from "../controllers/Party/getPartyMembers.js";

const partyRouter = express.Router();

partyRouter.get(
  "/members/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  getPartyMembers
);

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

partyRouter.delete(
  "/",
  verifyJwt,
  verifyRoles(2005, 2009),
  deletePartyController
);

partyRouter.delete(
  "/leave",
  verifyJwt,
  verifyJwt,
  verifyRoles(2005, 2009),
  leavePartyController
);

export { partyRouter };
