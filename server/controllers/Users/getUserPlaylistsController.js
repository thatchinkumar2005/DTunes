import { Playlist } from "../../models/Playlist.js";
import { User } from "../../models/User.js";

export default async function getUserPlaylistController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such user" });

    const playlists = await Playlist.find({
      artist: resUser._id,
      public: true,
    });
    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
