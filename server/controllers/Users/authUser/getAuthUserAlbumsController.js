import { Album } from "../../../models/Album.js";

export default async function getAuthUserAlbumsController(req, res) {
  try {
    const user = req.user;
    const result = await Album.find({ artist: user.id });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
