import { Album } from "../../models/Album.js";
import { Song } from "../../models/Song.js";

export default async function getAlbumSongsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);
    if (!album) {
      return res.status(400).json({ message: "No such album found" });
    }

    const songs = await Song.find({ album: album._id })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
