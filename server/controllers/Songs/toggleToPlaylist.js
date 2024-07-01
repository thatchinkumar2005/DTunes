import { Playlist } from "../../models/Playlist.js";
import { Song } from "../../models/Song.js";

export default async function toggleToPlaylist(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { playlistId } = req.body;
    if (!id) return res.status(400).json({ message: "id not given" });
    if (!playlistId)
      return res.status(400).json({ message: "playlistId not given" });

    const playlist = await Playlist.findOne({ id: playlistId });
    const song = await Song.findById(id);

    if (!song) return res.status(400).json({ message: "No such song" });
    if (!playlist) return res.status(400).json({ message: "No such playlist" });
    if (playlist.artist.id.toString() !== user.id) {
      return res.status(401).json({
        message: "Not your Playlist",
      });
    }

    playlist.songs.push(song._id);
    const result = await playlist.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
