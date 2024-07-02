import sharp from "sharp";
import { unlink } from "fs/promises";
import { Playlist } from "../../models/Playlist.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function updatePlaylistController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { name, type } = req.body;
    const file = req.file;

    if (!id) return res.status(400).json({ message: "No id given" });

    if (!name && !type && !file) {
      return res.status(204).end();
    }

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such playlist" });
    if (!playlist.artist.equals(user.id))
      res.status(401).json({ message: "Not your Playlist" });

    playlist.name = name || playlist.name;
    playlist.public = type ? type === "public" : playlist.public;
    await playlist.save();

    if (file) {
      const coverArtPath = join(
        __dirname,
        "../../STORAGE/CoverArt",
        `${playlist.id}.png`
      );

      await unlink(coverArtPath);

      await sharp(file.buffer)
        .resize(1400, 1400)
        .toFormat("png")
        .toFile(coverArtPath);
    }
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
