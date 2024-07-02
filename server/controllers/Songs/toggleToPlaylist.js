import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { Song } from "../../models/Song.js";

export default async function toggleToPlaylist(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { playlistId } = req.body;
    if (!id || !playlistId)
      return res.status(400).json({ message: "give all values" });

    const song = await Song.findById(id);
    const playlist = await Playlist.findById(playlistId);
    if (!song || !playlist)
      return res.status(400).json({ message: "invalid id" });

    const reln = await PlaylistSongJunction.findOne({
      song: song._id,
      playlist: playlist._id,
    });

    if (!reln) {
      const newReln = await PlaylistSongJunction.create({
        song: song._id,
        playlist: playlist._id,
      });
      return res.json(newReln);
    } else {
      await PlaylistSongJunction.deleteOne({ _id: reln._id });
      return res.json({ message: "song removed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
