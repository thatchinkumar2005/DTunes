import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
});

export const Like = mongoose.model("Like", likeSchema);
