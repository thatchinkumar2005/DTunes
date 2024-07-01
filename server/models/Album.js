import mongoose from "mongoose";
import { Schema } from "mongoose";

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

export const Album = mongoose.model("Album", albumSchema);
