import { writeFile, unlink } from "fs/promises";
import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";
import { extname, join } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function updateSongController(req, res) {
  try {
    const user = req.user;

    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const { name, artists, genre, highlight, lyric } = req.body;
    const file = req.file;
    if (!name && !artists && !genre && !highlight && !file && !lyric)
      return res.status(204).end();

    const artistsObjIds = [user.id];
    if (artists) {
      for (let artistId of artists) {
        const artist = await User.findOne({ id: artistId });
        if (!artist) res.status(400).json({ message: "Artist not found" });
        artistsObjIds.push(artist._id);
      }
    }

    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song found" });
    if (!song.artists.includes(user.id))
      return res.status(401).json({ message: "Not your song" });

    song.name = name || song.name;
    song.genre = genre || song.genre;
    song.highlight = highlight || song.highlight;
    song.artists = artistsObjIds || song.artists;
    song.lyric = lyric || song.lyric;

    if (file) {
      await unlink(song.url);
      const url = join(
        __dirname,
        "../../STORAGE/Songs/",
        `${song.id}${extname(file.originalname)}`
      );

      await writeFile(url, file.buffer);
      song.url = url;
      await song.save();
    }
    return res.json(song);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
