import mongoose from "mongoose";
import { Schema } from "mongoose";

const friendsSchema = new Schema({
  status: {
    type: String,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  friend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Friend = mongoose.model("Friend", friendsSchema);
