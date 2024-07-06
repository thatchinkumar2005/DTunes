import { Playlist } from "../../models/Playlist.js";
import { User } from "../../models/User.js";

export default async function getUserPlaylistController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such user" });

    const playlists = await Playlist.find({
      artist: resUser._id,
      public: true,
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
