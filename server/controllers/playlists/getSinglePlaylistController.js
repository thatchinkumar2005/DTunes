import { Playlist } from "../../models/Playlist.js";

export default async function getSinglePlaylistController(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such playlist" });
    if (!playlist.public) res.status(401).json({ message: "Private Playlist" });

    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
