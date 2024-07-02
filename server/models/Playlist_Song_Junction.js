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
});

export const PlaylistSongJunction = mongoose.model(
  "PlaylistSongJunction",
  playlistSongJuncSchema
);
