import dotenv from "dotenv";
dotenv.config();
import { join } from "path";
import sharp from "sharp";
import { Album } from "../../models/Album.js";
import { User } from "../../models/User.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { s3 } from "../../config/bucketConn.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function createNewAlbumController(req, res) {
  try {
    //authenticated user
    const user = req.user;
    //user document
    const userMod = await User.findOne({ _id: user.id });
    //name in body
    const { name } = req.body;

    //file
    const file = req.file;

    //bad request
    if (!name)
      return res.status(400).json({ message: "No name given to album" });
    if (!file) return res.status(400).json({ message: "select files" });
    //creating the album
    const album = await Album.create({
      name,
      artist: user.id,
    });

    //save after preproccessing the image buffer
    const editedImage = await sharp(file.buffer)
      .toFormat("png")
      .resize(1400, 1400)
      .toBuffer();

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${album.id}.png`,
      Body: editedImage,
    });

    await s3.send(command);

    return res.json(album);
  } catch (error) {
    //handle errors
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}
