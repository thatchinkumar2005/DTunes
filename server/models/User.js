import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  roles: {
    user: {
      type: Number,
    },
    artist: {
      type: Number,
    },
  },
  refreshToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requested: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
  releases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],

  playLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  oauth: {
    oauthProvider: { type: String },
    oauthCode: { type: String },
  },
  genres: [{ type: String }],
  party: {
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Party" }],
    currentParty: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  },
  notifications: [
    {
      notificationType: {
        type: String,
      },
      msg: {
        type: String,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
