import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";

export default async function getUserSongsController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id found" });

    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such User" });

    const songs = await Song.find({ artists: resUser._id });

    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
