import { Album } from "../../models/Album.js";
import { Playlist } from "../../models/Playlist.js";
import { SearchHistory } from "../../models/SearchHistory.js";
import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";

export default async function searchController(req, res) {
  try {
    const user = req.user;
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 5;
    const q = queries?.query;
    const type = queries?.type || "all";
    const offset = (page - 1) * limit;

    let count = 0;

    const history = await SearchHistory.findOne({ user: user.id, query: q });
    if (type === "all") {
      const nameBasedSongs = await Song.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);
      count += nameBasedSongs.length;

      const genreBasedSongs = await Song.find({
        genre: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);
      count += genreBasedSongs.length;

      const nameBasedAlbums = await Album.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);
      count += nameBasedAlbums.length;

      const nameBasedPlaylists = await Playlist.find({
        name: { $regex: q, $options: "i" },
        public: true,
      })
        .skip(offset)
        .limit(limit);
      count += nameBasedPlaylists.length;

      const nameBasedArtists = await User.find({
        $or: [
          { fname: { $regex: q, $options: "i" } },
          { lname: { $regex: q, $options: "i" } },
          { username: { $regex: q, $options: "i" } },
        ],
        "roles.artist": { $exists: true },
      })
        .skip(offset)
        .limit(limit);
      count += nameBasedArtists.length;

      if (history) {
        history.resultsCount = count;
        history.queryCount++;
        history.timeStamp = Date.now();
        history.save();
      } else {
        await SearchHistory.create({
          user: user.id,
          query: q,
          resultsCount: count,
        });
      }

      return res.json({
        songs: [...nameBasedSongs, ...genreBasedSongs],
        albums: nameBasedAlbums,
        playlists: nameBasedPlaylists,
        artists: nameBasedArtists,
      });
    } else if (type === "song") {
      const nameBasedSongs = await Song.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);

      count += nameBasedSongs.length;

      const genreBasedSongs = await Song.find({
        genre: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);

      count += genreBasedSongs.length;

      if (history) {
        history.resultsCount = count;
        history.queryCount++;
        history.timeStamp = Date.now();
        history.save();
      } else {
        await SearchHistory.create({
          user: user.id,
          query: q,
          resultsCount: count,
        });
      }
      return res.json({
        songs: [...nameBasedSongs, ...genreBasedSongs],
      });
    } else if (type === "album") {
      const nameBasedAlbums = await Album.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(offset)
        .limit(limit);
      count += nameBasedAlbums.length;

      if (history) {
        history.resultsCount = count;
        history.queryCount++;
        history.timeStamp = Date.now();
        history.save();
      } else {
        await SearchHistory.create({
          user: user.id,
          query: q,
          resultsCount: count,
        });
      }
      return res.json({
        albums: nameBasedAlbums,
      });
    } else if (type === "playlist") {
      const nameBasedPlaylists = await Playlist.find({
        name: { $regex: q, $options: "i" },
        public: true,
      })
        .skip(offset)
        .limit(limit);

      count += nameBasedPlaylists.length;
      if (history) {
        history.resultsCount = count;
        history.queryCount++;
        history.timeStamp = Date.now();
        history.save();
      } else {
        await SearchHistory.create({
          user: user.id,
          query: q,
          resultsCount: count,
        });
      }
      return res.json({
        playlists: nameBasedPlaylists,
      });
    } else if (type === "artist") {
      const nameBasedArtists = await User.find({
        $or: [
          { fname: { $regex: q, $options: "i" } },
          { lname: { $regex: q, $options: "i" } },
          { username: { $regex: q, $options: "i" } },
        ],
        "roles.artist": { $exists: true },
      })
        .skip(offset)
        .limit(limit);

      count += nameBasedArtists.length;
      if (history) {
        history.resultsCount = count;
        history.queryCount++;
        history.timeStamp = Date.now();
        history.save();
      } else {
        await SearchHistory.create({
          user: user.id,
          query: q,
          resultsCount: count,
        });
      }
      return res.json({
        artists: nameBasedArtists,
      });
    } else if (type === "user") {
      const nameBasedUsers = await User.find({
        $or: [
          { fname: { $regex: q, $options: "i" } },
          { lname: { $regex: q, $options: "i" } },
          { username: { $regex: q, $options: "i" } },
        ],
      })
        .skip(offset)
        .limit(limit);

      count += nameBasedUsers.length;

      if (history) {
        history.resultsCount = count;
        history.queryCount++;
        history.timeStamp = Date.now();
        history.save();
      } else {
        await SearchHistory.create({
          user: user.id,
          query: q,
          resultsCount: count,
        });
      }
      return res.json({
        users: nameBasedUsers,
      });
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
