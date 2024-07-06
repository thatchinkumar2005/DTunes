import { Song } from "../../../models/Song.js";

export default async function getAuthUserSongsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;

    const songs = await Song.find({ artists: user.id })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
