import { writeFile, unlink } from "fs/promises";
import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";
import { join } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
import sharp from "sharp";
import mp3Converter from "../../utils/mp3Converter.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function updateSongController(req, res) {
  try {
    //get authenticated user
    const user = req.user;
    //get song id
    const { id } = req.params;
    //bad requests
    if (!id) return res.status(400).json({ message: "No id given" });
    //update fields
    const { name, artists, genre, highlight, lyric } = req.body;
    //update files
    const files = req.files;
    //if no fields are updated ---> 204
    if (!name && !artists && !genre && !highlight && !files && !lyric)
      return res.status(204).end();

    //artist obj ids
    const artistsObjIds = [user.id];
    if (artists) {
      //pushing other artist ids and validating
      for (let artistId of artists) {
        const artist = await User.findOne({ id: artistId });
        if (!artist) res.status(400).json({ message: "Artist not found" });
        artistsObjIds.push(artist._id);
      }
    }

    //finding the song
    const song = await Song.findById(id);
    //bad request
    if (!song) return res.status(400).json({ message: "No such song found" });
    //checking for permissions
    if (!song.artists.includes(user.id))
      return res.status(401).json({ message: "Not your song" });

    //updating
    song.name = name || song.name;
    song.genre = genre || song.genre;
    song.highlight = highlight || song.highlight;
    song.artists = artistsObjIds || song.artists;
    song.lyric = lyric || song.lyric;

    await song.save();

    //update files if files are provided
    if (files) {
      if (files.file) {
        //audio file
        const audioPath = join(
          __dirname,
          "../../STORAGE/Songs",
          `${song.id}.mp3`
        );
        await unlink(audioPath);
        await mp3Converter({ buffer: files.file[0].buffer, path: audioPath });
      }
      if (files.coverArt) {
        //cover art
        const coverArtPath = join(
          __dirname,
          "../../STORAGE/CoverArt/",
          `${song.id}.png`
        );
        await unlink(coverArtPath);
        await sharp(files.coverArt[0].buffer)
          .resize(1400, 1400)
          .toFormat("png")
          .toFile(coverArtPath);
      }
    }

    //returning updated song
    return res.json(song);
  } catch (error) {
    //handle error
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
