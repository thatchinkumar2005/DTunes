import { Playlist } from "../../models/Playlist.js";

export default async function getAllPlaylistsController(req, res) {
  try {
    const queries = req.queries;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const playlists = await Playlist.find({ public: true })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
