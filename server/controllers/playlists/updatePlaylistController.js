import dotenv from "dotenv";
dotenv.config();
import sharp from "sharp";
import { Playlist } from "../../models/Playlist.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function updatePlaylistController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { name, type } = req.body;
    const file = req.file;

    if (!id) return res.status(400).json({ message: "No id given" });

    if (!name && !type && !file) {
      return res.status(204).end();
    }

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such playlist" });
    if (!playlist.artist.equals(user.id))
      return res.status(401).json({ message: "Not your Playlist" });

    playlist.name = name || playlist.name;
    playlist.public = type ? type === "public" : playlist.public;
    await playlist.save();

    if (file) {
      const editedImage = await sharp(file.buffer)
        .resize(1400, 1400)
        .toFormat("png")
        .toBuffer();

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${playlist.id}.png`,
        Body: editedImage,
      });

      await s3.send(command);
    }
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
