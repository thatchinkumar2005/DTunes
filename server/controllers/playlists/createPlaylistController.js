import dotenv from "dotenv";
dotenv.config();
import sharp from "sharp";
import { Playlist } from "../../models/Playlist.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function createPlaylistController(req, res) {
  try {
    const user = req.user;
    const { name, type } = req.body;
    if (!name) return res.status(400).json({ message: "No name given" });
    const file = req.file;

    const playlist = await Playlist.create({
      name,
      public: type === "public",
      artist: user.id,
    });

    if (file) {
      const editedImage = await sharp(file.buffer)
        .resize(1400, 1400)
        .toFormat("png")
        .toBuffer();

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Body: editedImage,
        Key: `CoverArt/${playlist.id}.png`,
      });

      await s3.send(command);
    }
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
