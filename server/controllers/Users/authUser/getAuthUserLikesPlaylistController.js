import { Playlist } from "../../../models/Playlist.js";

export default async function getAuthUserLikesPlaylistController(req, res) {
  try {
    const user = req.user;
    const likePlaylist = await Playlist.findOne({
      artist: user.id,
      like: true,
    });

    return res.json(likePlaylist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
