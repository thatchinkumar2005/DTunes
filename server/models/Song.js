import mongoose from "mongoose";
import { Schema } from "mongoose";

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  aritist: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
      },
    },
  ],
  album: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    name: {
      type: String,
    },
  },
  releaseDate: {
    type: Date,
    default: new Date.now(),
  },
  genre: [
    {
      type: String,
    },
  ],

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
