import mongoose from "mongoose";
import { Interaction } from "../../../models/InteractionData.js";

export default async function getAuthUserAnalyticsController(req, res) {
  try {
    const user = req.user;

    const totalPlayed = await Interaction.aggregate()
      .match({
        user: mongoose.Types.ObjectId.createFromHexString(user.id),
        intType: "play",
      })
      .group({
        _id: "$user",
        played: { $sum: "$count" },
      });

    const dayWiseAnalysis = await Interaction.aggregate()
      .match({
        user: mongoose.Types.ObjectId.createFromHexString(user.id),
        intType: "play",
      })
      .project({
        yearMonthDay: {
          $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" },
        },
        song: 1,
        count: 1,
      })
      .group({
        _id: "$yearMonthDay",
        totalPlays: { $sum: "$count" },
        songs: { $addToSet: "$song" },
      })
      .sort({
        _id: 1,
      })
      .limit(1000);

    const artistAnalysis = await Interaction.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId.createFromHexString(user.id),
          intType: "play",
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "song",
          foreignField: "_id",
          as: "songDetails",
        },
      },
      {
        $unwind: "$songDetails",
      },
      {
        $unwind: "$songDetails.artists",
      },
      {
        $group: {
          _id: "$songDetails.artists",
          totalPlays: { $sum: "$count" },
        },
      },
      {
        $group: {
          _id: null,
          totalPlaysAllArtists: { $sum: "$totalPlays" },
          artists: { $push: { artist: "$_id", totalPlays: "$totalPlays" } },
        },
      },
      {
        $unwind: "$artists",
      },
      {
        $lookup: {
          from: "users", // Assuming "users" is the collection name for artists
          localField: "artists.artist", // Assuming _id in users is the ObjectId of the artist
          foreignField: "_id",
          as: "artistDetails",
        },
      },
      {
        $unwind: "$artistDetails",
      },
      {
        $project: {
          artistName: "$artistDetails.fname", // Adjust this based on the structure of your "users" collection
          totalPlays: "$artists.totalPlays",
          percentage: {
            $multiply: [
              { $divide: ["$artists.totalPlays", "$totalPlaysAllArtists"] },
              100,
            ],
          },
        },
      },
      {
        $sort: { percentage: -1 },
      },
      {
        $limit: 1000,
      },
    ]);

    const genreAnalysis = await Interaction.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId.createFromHexString(user.id),
          intType: "play",
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "song",
          foreignField: "_id",
          as: "songDetails",
        },
      },
      {
        $unwind: "$songDetails",
      },
      {
        $unwind: "$songDetails.genre",
      },
      {
        $group: {
          _id: "$songDetails.genre",
          totalSongs: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalSongsAllGenres: { $sum: "$totalSongs" },
          genres: { $push: { genre: "$_id", totalSongs: "$totalSongs" } },
        },
      },
      {
        $unwind: "$genres",
      },
      {
        $project: {
          _id: "$genres.genre",
          totalSongs: "$genres.totalSongs",
          percentage: {
            $multiply: [
              { $divide: ["$genres.totalSongs", "$totalSongsAllGenres"] }, // Calculate percentage of songs for each genre
              100,
            ],
          },
        },
      },
      {
        $sort: { percentage: -1 },
      },
      {
        $limit: 1000,
      },
    ]);

    return res.json({
      totalPlayed: totalPlayed[0].played,
      dayWiseAnalysis,
      artistAnalysis,
      genreAnalysis,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
