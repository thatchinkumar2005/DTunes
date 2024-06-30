import mongoose from "mongoose";
import { Schema } from "mongoose";

const partySchema = new Schema({
  name: {
    type: String,
  },
  leader: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    members: {
      requested: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      accepted: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
});

export const Party = mongoose.model("Party", partySchema);
