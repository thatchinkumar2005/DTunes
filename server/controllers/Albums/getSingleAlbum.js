import { Album } from "../../models/Album.js";

export default async function getSingleAlbum(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);
    res.json(album);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
