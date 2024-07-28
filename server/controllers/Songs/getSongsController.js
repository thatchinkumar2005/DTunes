import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Song } from "../../models/Song.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function getSongsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const resp = await Song.find()
      .skip((page - 1) * limit)
      .limit(limit);

    for (const song of resp) {
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
    }

    return res.json(resp);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
