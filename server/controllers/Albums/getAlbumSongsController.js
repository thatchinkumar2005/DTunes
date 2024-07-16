import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Album } from "../../models/Album.js";
import { Song } from "../../models/Song.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function getAlbumSongsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);
    if (!album) {
      return res.status(400).json({ message: "No such album found" });
    }

    const songs = await Song.find({ album: album._id })
      .skip((page - 1) * limit)
      .limit(limit);

    for (const song of songs) {
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

    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
