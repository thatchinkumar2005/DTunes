import mongoose from "mongoose";
import { Interaction } from "../../../models/InteractionData.js";
import { User } from "../../../models/User.js";

export default async function getAuthUserTotalPlays(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    if (!userDoc.roles.artist)
      return res.status(400).json({ message: "Not an artist" });

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
          "songDetails.artists": mongoose.Types.ObjectId.createFromHexString(
            user.id
          ),
        },
      },
      {
        $group: {
          _id: user.id,
          totalPlays: { $sum: "$count" },
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
