import { unlink } from "fs/promises";
import { join } from "path";
import { Album } from "../../models/Album.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import sharp from "sharp";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function updateAlbumController(req, res) {
  try {
    const user = req.user;

    const { id } = req.params;
    if (!id) return res.status(500).json({ message: "No id given" });

    const { name } = req.body;
    const file = req.file;

    if (!name && !file) return res.status(204).end();

    const album = await Album.findById(id);
    if (!album) return res.status(400).json({ message: "No such Album" });
    if (!album.artist.equals(user.id)) {
      return res.status(401).json({ message: "Not your album" });
    }

    album.name = name || album.name;
    if (file) {
      const coverArtPath = join(
        __dirname,
        "../../STORAGE/CoverArt",
        `${album.id}.png`
      );
      await unlink(coverArtPath);
      await sharp(file.buffer)
        .resize(1400, 1400)
        .toFormat("png")
        .toFile(coverArtPath);
    }
    return res.json(album);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
