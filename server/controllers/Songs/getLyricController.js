import { Song } from "../../models/Song.js";

export default async function getLyricController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song found" });

    if (!song.lyric) {
      return res.json({
        lyrics: "",
      });
    }
    return res.json(song.lyric);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
