import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Song } from "../../models/Song.js";
import { s3 } from "../../config/bucketConn.js";

export default async function getSingleSongController(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "No id provided" });

    const song = await Song.findById(id);
    if (!song) {
      return res.status(400).json({ message: "No such song found" });
    }

    const imageCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${song.id}.png`,
    });
    const audioCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `Songs/${song.id}.mp3`,
    });

    const imageUrl = await getSignedUrl(s3, imageCommand, {
      expiresIn: 3600 * 24,
    });
    const audioUrl = await getSignedUrl(s3, audioCommand, {
      expiresIn: 3600 * 24,
    });

    song.files.coverArt = imageUrl;
    song.files.audio = audioUrl;

    return res.json(song);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
