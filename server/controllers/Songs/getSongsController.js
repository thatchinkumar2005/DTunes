import { Song } from "../../models/Song.js";

export default async function getSongsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const resp = await Song.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(resp);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
