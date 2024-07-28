import mongoose from "mongoose";
import { Interaction } from "../../models/InteractionData.js";
import { Song } from "../../models/Song.js";
import { User } from "../../models/User.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function playController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id not given" });
    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song" });

    userDoc.queue.currentSong = song._id;
    const intData = await Interaction.findOne({
      song: song._id,
      user: user.id,
      intType: "play",
    });
    await userDoc.save();

    if (!intData) {
      const newIntData = await Interaction.create({
        song: song._id,
        user: user.id,
        intType: "play",
        count: 1,
      });
    } else {
      intData.count++;
      intData.timeStamp = Date.now();
      await intData.save();
    }
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: song.id,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
    song.files.coverArt = url;

    return res.json(song);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
