import mongoose from "mongoose";
import { Song } from "../../models/Song.js";
import { unlink } from "fs/promises";
import { User } from "../../models/User.js";
import { Album } from "../../models/Album.js";

export default async function deleteSongController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song" });
    if (!song.artists.includes(user.id))
      return res.status(401).json({ message: "Not your song" });

    for (let artistId of song.artists) {
      const artist = await User.findOne({ _id: artistId });
      artist.releases.splice(artist.releases.indexOf(song._id), 1);
      await artist.save();
    }
    const album = await Album.findOne({ _id: song.album });
    album.songs.splice(album.songs.indexOf(song._id), 1);
    await album.save();
    await unlink(song.url);
    await Song.deleteOne({ _id: song._id });
    res.json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
