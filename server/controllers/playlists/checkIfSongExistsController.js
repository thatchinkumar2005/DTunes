import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";

export default async function checkIfSongExistController(req, res) {
  try {
    const { id } = req.params;
    const { songId } = req.body;

    const reln = await PlaylistSongJunction.findOne({
      song: songId,
      playlist: id,
    });

    return res.json(reln);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
