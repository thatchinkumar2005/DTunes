import { join } from "path";
import { unlink } from "fs/promises";
import { Album } from "../../models/Album.js";
import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { Like } from "../../models/Like.js";
import { Interaction } from "../../models/InteractionData.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function deleteAlbumController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);
    if (!album) return res.status(400).json({ message: "No such album found" });
    if (!album.artist.equals(user.id))
      return res.status(401).json({ message: "Not your album" });

    const albumSongs = await Song.find({ album: album._id });

    for (let song of albumSongs) {
      const audioPath = join(
        __dirname,
        "../../STORAGE/Songs",
        `${song.id}.mp3`
      );
      const coverArtPath = join(
        __dirname,
        "../../STORAGE/CoverArt",
        `${song.id}.png`
      );
      await unlink(audioPath);
      await unlink(coverArtPath);

      //junction collecions
      await Like.deleteMany({ song: song._id });
      await Interaction.deleteMany({ song: song._id });
      await PlaylistSongJunction.deleteMany({ song: song._id });

      await Song.deleteOne({ _id: song._id });
    }

    const coverArtPath = join(
      __dirname,
      "../../STORAGE/CoverArt",
      `${album.id}.png`
    );
    await unlink(coverArtPath);

    await Album.deleteOne({ _id: album._id });

    return res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
