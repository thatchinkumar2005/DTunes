import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Album } from "../../models/Album.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function getAllAlbumsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const albums = await Album.find()
      .skip((page - 1) * limit)
      .limit(limit);

    for (const album of albums) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${album._id}.png`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
      album.files.coverArt = url;
    }

    res.json(albums);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
