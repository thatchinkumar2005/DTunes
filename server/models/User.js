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
  bio: {
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
  oauth: {
    oauthProvider: { type: String },
    oauthCode: { type: String },
  },
  genres: [{ type: String }],
  party: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
    },
    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  },
  files: {
    profilePic: {
      type: String,
    },
  },

  queue: {
    currentSong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
    currentSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    currentIndex: {
      type: Number,
    },
    clusterName: {
      type: String,
      default: "recommendation",
    },
    clusterId: {
      type: String,
      value: "/recommend",
    },
  },
});

export const User = mongoose.model("User", userSchema);
