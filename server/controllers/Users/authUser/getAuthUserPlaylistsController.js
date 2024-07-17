import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Playlist } from "../../../models/Playlist.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../../config/bucketConn.js";

export default async function getAuthUserPlaylistsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const user = req.user;
    const playlists = await Playlist.find({ artist: user.id, party: false })
      .skip((page - 1) * limit)
      .limit(limit);

    for (const playlist of playlists) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${playlist.id}.png`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

      playlist.files.coverArt = url;
    }

    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
