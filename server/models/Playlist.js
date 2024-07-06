import mongoose from "mongoose";
import { Schema } from "mongoose";

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  files: {
    coverArt: {
      type: String,
    },
  },
  public: {
    type: Boolean,
    default: false,
  },
  party: {
    type: Boolean,
    default: false,
  },
  like: {
    type: Boolean,
    default: false,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
