import express from "express";
import verifyJwt from "../middleware/Auth/verifyJwt.js";
import verifyRoles from "../middleware/Auth/verifyRoles.js";
import toggleFriendRequestController from "../controllers/Friends/toggleFriendReqController.js";
import respondToRequestController from "../controllers/Friends/respondToReqController.js";

const friendRouter = express.Router();

friendRouter.post(
  "/toggleRequest/:id",
  verifyJwt,
  verifyRoles(2005, 2009),
  toggleFriendRequestController
);

friendRouter.post(
  "/respondRequest/:id",
  verifyJwt,
  verifyRoles(2009, 2005),
  respondToRequestController
);
export { friendRouter };