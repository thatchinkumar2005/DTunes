import mongoose from "mongoose";
import { Schema } from "mongoose";

const playlistSongJuncSchema = new Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
  },
  junction: [{ type: mongoose.Schema.Types.ObjectId }],
});

export const PlaylistSongJunction = mongoose.model(
  "PlaylistSongJunction",
  playlistSongJuncSchema
);
