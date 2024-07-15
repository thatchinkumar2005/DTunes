import mongoose from "mongoose";
import { Song } from "../../models/Song.js";
import { unlink } from "fs/promises";
import { User } from "../../models/User.js";
import { Album } from "../../models/Album.js";
import { join } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { Like } from "../../models/Like.js";
import { Interaction } from "../../models/InteractionData.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function deleteSongController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song" });
    if (!song.artists.includes(user.id))
      return res.status(401).json({ message: "Not your song" });

    //Junction collections
    await Like.deleteMany({ song: song._id });
    await Interaction.deleteMany({ song: song._id });
    await PlaylistSongJunction.deleteMany({ song: song._id });

    const audioPath = join(__dirname, "/../../STORAGE/Songs", `${song.id}.mp3`);
    const coverImagePath = join(
      __dirname,
      "../../STORAGE/CoverArt",
      `${song.id}.png`
    );

    await unlink(audioPath);
    await unlink(coverImagePath);
    await Song.deleteOne({ _id: song._id });
    return res.json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
