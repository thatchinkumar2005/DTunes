import { Song } from "../../models/Song.js";

export default async function getSingleSongController(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "No id provided" });

    const song = await Song.findById(id);
    if (!song) {
      return res.status(400).json({ message: "No such song found" });
    }

    return res.json(song);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
