import mongoose from "mongoose";
import { Schema } from "mongoose";

const partyReqSchema = new Schema({
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  junction: [{ type: mongoose.Schema.Types.ObjectId }],
});

export const PartyRequest = mongoose.model("PartyRequest", partyReqSchema);
