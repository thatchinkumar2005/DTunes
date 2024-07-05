import { Album } from "../../models/Album.js";
import { Playlist } from "../../models/Playlist.js";
import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";

export default async function searchController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 5;
    const q = queries?.query;
    const type = queries?.type;
    const offset = (page - 1) * limit;
    console.log(queries);

    if (type === "all") {
      const nameBasedSongs = await Song.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);

      const genreBasedSong = await Song.find({
        genre: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);

      const nameBasedAlbums = await Album.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);

      const nameBasedPlaylists = await Playlist.find({
        name: { $regex: q, $options: "i" },
        public: true,
      })
        .skip(offset)
        .limit(limit);

      const nameBasedArtists = await User.find({
        $or: [
          { fname: { $regex: q, $options: "i" } },
          { lname: { $regex: q, $options: "i" } },
          { username: { $regex: q, $options: "i" } },
        ],
      })
        .skip(offset)
        .limit(limit);

      return res.json({
        songs: [...nameBasedSongs, ...genreBasedSong],
        albums: nameBasedAlbums,
        playlists: nameBasedPlaylists,
        artists: nameBasedArtists,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
