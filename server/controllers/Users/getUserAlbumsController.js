import { Album } from "../../models/Album.js";
import { User } from "../../models/User.js";

export default async function getUserAlbumsController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such user" });

    const albums = await Album.find({ artist: resUser._id });
    return res.json(albums);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
