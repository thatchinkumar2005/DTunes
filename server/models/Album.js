import mongoose from "mongoose";
import { Schema } from "mongoose";

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
  },
  releaseDate: {
    type: Date,
    default: new Date.now(),
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

export const Album = mongoose.model("Album", albumSchema);
