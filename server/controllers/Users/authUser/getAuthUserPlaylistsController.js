import { Playlist } from "../../../models/Playlist.js";

export default async function getAuthUserPlaylistsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;
    const playlists = await Playlist.find({ artist: user.id, like: false })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
