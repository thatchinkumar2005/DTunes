import mongoose from "mongoose";
import { Schema } from "mongoose";

const partySchema = new Schema({
  name: {
    type: String,
  },
  file: {
    coverArt: {
      type: String,
    },
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resultantPlaylist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
  },
});

export const Party = mongoose.model("Party", partySchema);
