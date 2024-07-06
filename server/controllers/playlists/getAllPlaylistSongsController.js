import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { Song } from "../../models/Song.js";

export default async function getAllPlaylistSongsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "No id given" });

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such playlist" });

    if (!playlist.public && !playlist.artist.equals(user.id)) {
      return res.status(403).json({ message: "Private playlist" });
    }

    const relns = await PlaylistSongJunction.find(
      { playlist: playlist._id },
      { song: 1 }
    )
      .skip((page - 1) * limit)
      .limit(limit);
    const songs = [];
    for (let songId of relns) {
      const song = await Song.findOne({ _id: songId.song });
      songs.push(song);
    }

    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
