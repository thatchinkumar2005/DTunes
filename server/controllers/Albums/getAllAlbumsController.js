import { Album } from "../../models/Album.js";

export default async function getAllAlbumsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const albums = await Album.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(albums);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
