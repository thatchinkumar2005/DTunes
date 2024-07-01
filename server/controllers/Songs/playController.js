import mongoose from "mongoose";
import { Interaction } from "../../models/InteractionData.js";
import { Song } from "../../models/Song.js";

export default async function playController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id not given" });
    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song" });

    const intData = await Interaction.findOne({
      song: song._id,
      user: mongoose.Schema.ObjectId(user.id),
      intType: "play",
    });

    if (!intData) {
      const newIntData = await Interaction.create({
        song: song._id,
        user: mongoose.Schema.ObjectId(user.id),
        intType: "play",
        count: 1,
      });
      return res.json(newIntData);
    } else {
      intData.count++;
      await intData.save();
      return res.json(intData);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
