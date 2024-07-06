import { Album } from "../../../models/Album.js";

export default async function getAuthUserAlbumsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;
    const result = await Album.find({ artist: user.id })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
