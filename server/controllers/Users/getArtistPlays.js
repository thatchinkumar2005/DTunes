import mongoose from "mongoose";
import { Interaction } from "../../models/InteractionData.js";

export default async function getArtistPlays(req, res) {
  try {
    const { id } = req.params;

    const result = await Interaction.aggregate([
      {
        $match: {
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
        $match: {
          "songDetails.artists":
            mongoose.Types.ObjectId.createFromHexString(id),
        },
      },
      {
        $group: {
          _id: id,
          totalPlays: { $sum: "$count" },
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
