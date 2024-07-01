import mongoose from "mongoose";
import { Schema } from "mongoose";

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
  ],
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  genre: [
    {
      type: String,
    },
  ],
  lyric: {
    type: String,
  },
  highlight: {
    from: {
      type: Number,
    },
    to: {
      type: Number,
    },
  },
});

export const Song = mongoose.model("Song", songSchema);
