import mongoose from "mongoose";
import { Schema } from "mongoose";

const intDataSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  },
  intType: {
    type: String,
  },
  intTime: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Boolean,
  },
  count: {
    type: Number,
  },
});

export const Interaction = mongoose.model("Interaction", intDataSchema);
