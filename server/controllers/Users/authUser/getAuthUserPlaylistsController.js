import { Playlist } from "../../../models/Playlist.js";

export default async function getAuthUserPlaylistsController(req, res) {
  try {
    const user = req.user;
    const playlists = await Playlist.find({ artist: user.id });
    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
