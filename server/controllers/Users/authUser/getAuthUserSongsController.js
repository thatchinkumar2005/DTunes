import { Song } from "../../../models/Song.js";

export default async function getAuthUserSongsController(req, res) {
  try {
    const user = req.user;

    const songs = await Song.find({ artists: user.id });
    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
