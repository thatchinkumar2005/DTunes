import mongoose from "mongoose";
import { Schema } from "mongoose";

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  files: {
    coverArt: {
      type: String,
    },
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
});

export const Album = mongoose.model("Album", albumSchema);
