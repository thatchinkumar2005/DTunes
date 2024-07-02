import { join } from "path";
import sharp from "sharp";
import { Album } from "../../models/Album.js";
import { User } from "../../models/User.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function createNewAlbumController(req, res) {
  try {
    //authenticated user
    const user = req.user;
    //user document
    const userMod = await User.findOne({ _id: user.id });
    //name in body
    const { name } = req.body;
    //file
    const file = req.file;
    //bad request
    if (!name || !file)
      return res.status(400).json({ message: "No name given to album" });
    //creating the album
    const album = await Album.create({
      name,
      artist: user.id,
    });
    //cover art's path
    const coverArtPath = join(
      __dirname,
      "../../STORAGE/CoverArt",
      `${album.id}.png`
    );
    //save after preproccessing the image buffer
    await sharp(file.buffer)
      .toFormat("png")
      .resize(1400, 1400)
      .toFile(coverArtPath);
    //static url for the file
    const coverArtUrl = `http://localhost:7777/serverStorage/CoverArt/${album.id}.png`;

    //saving in album
    album.files.coverArt = coverArtUrl;
    await album.save();
    //responding with created album
    return res.json(album);
  } catch (error) {
    //handle errors
    return res.status(500).json({
      message: error.message,
    });
  }
}
