import mongoose from "mongoose";
import { Like } from "../../models/Like.js";

export default async function getLikesController(req, res) {
  try {
    const { id } = req.params;
    const likesCount = await Like.countDocuments({
      song: mongoose.Types.ObjectId.createFromHexString(id),
    });

    return res.json({
      likes: likesCount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
