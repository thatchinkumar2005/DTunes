import mongoose from "mongoose";
import { Like } from "../../models/Like.js";
import { Song } from "../../models/Song.js";

export default async function likeController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song" });

    const like = await Like.findOne({
      user: user.id,
      song: song._id,
    });

    if (!like) {
      await Like.create({
        user: user.id,
        song: song._id,
      });
      return res.json({
        liked: true,
      });
    } else {
      await Like.deleteOne({ _id: like._id });
      return res.json({
        liked: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
