import { unlink, access } from "fs/promises";
import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function deletePlaylistController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "no id given" });

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such Playlist" });
    if (!playlist.artist.equals(user.id))
      return res.status(401).json({ message: "Not your playlist" });

    const coverArtPath = join(
      __dirname,
      "../../STORAGE/CoverArt",
      `${playlist._id}.png`
    );

    try {
      await access(coverArtPath);
      await unlink(coverArtPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("file missing");
      } else {
        throw error;
      }
    }

    await PlaylistSongJunction.deleteMany({ playlist: playlist._id });
    await Playlist.deleteOne({ _id: playlist._id });
    return res.json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
