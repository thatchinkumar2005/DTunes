import { writeFile } from "fs/promises";
import { Song } from "../../models/Song.js";
import { Album } from "../../models/Album.js";
import { extname, join } from "path";
import { User } from "../../models/User.js";
import { v4 as uuidV4 } from "uuid";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function newSongController(req, res) {
  try {
    const user = req.user; //authenticated user

    const { name, artists, genre, albumId, highlight, lyric } = req.body; //body
    const genreLst = JSON.parse(genre); //genre list from string
    //bad requests
    if (!(name && albumId && genre))
      return res.status(400).json({ message: "Enter the mandatory fields" });
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Select file" });

    //finding the album
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(400).json({ message: "No such album found" });
    }
    if (!album.artist._id.equals(user.id)) {
      return res.status(401).json({ message: "Not your album" });
    }

    const artistsObjIds = [user.id]; //artists object id list
    if (artists) {
      const artistsLst = JSON.parse(artists); //list of string object ids
      for (let artistId of artistsLst) {
        const artist = await User.findOne({ id: artistId });
        if (!artist)
          return res.status(400).json({ message: "Artist not found" });
        artistsObjIds.push(artist._id);
      }
    }

    const song = await Song.create({
      name,
      artists: artistsObjIds,
      album: album._id,
      genre: genreLst,
      highlight,
      lyric,
    });
    const url = join(
      __dirname,
      "../../STORAGE/Songs/",
      `${song.id}${extname(file.originalname)}`
    );

    await writeFile(url, file.buffer);

    song.url = url;
    await song.save();

    for (let artistId of song.artists) {
      const artist = await User.findOne({ _id: artistId });
      artist.releases.push(song._id);
      await artist.save();
    }
    album.songs.push(song._id);
    await album.save();

    return res.json(song);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
