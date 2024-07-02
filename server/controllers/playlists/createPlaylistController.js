import sharp from "sharp";
import { Playlist } from "../../models/Playlist.js";
import { join } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function createPlaylistController(req, res) {
  try {
    const user = req.user;
    const { name, type } = req.body;
    if (!name) return res.status(400).json({ message: "No name given" });
    const file = req.file;

    const playlist = await Playlist.create({
      name,
      public: type === "public",
      artist: user.id,
    });

    if (file) {
      const coverArtPath = join(
        __dirname,
        "../../STORAGE/CoverArt",
        `${playlist.id}.png`
      );
      await sharp(file.buffer)
        .resize(1400, 1400)
        .toFormat("png")
        .toFile(coverArtPath);
      playlist.files.coverArt = `http://localhost:7777/serverStorage/CoverArt/${playlist.id}.png`;

      await playlist.save();
    }
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
