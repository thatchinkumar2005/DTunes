import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Playlist } from "../../models/Playlist.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";

export default async function getSinglePlaylistController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such playlist" });
    if (!playlist.public && !playlist.artist.equals(user.id))
      res.status(401).json({ message: "Private Playlist" });

    try {
      const exists = await s3.send(
        new HeadObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `CoverArt/${playlist.id}.png`,
        })
      );
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${playlist.id}.png`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

      playlist.files.coverArt = url;
    } catch (error) {
      console.log("no file");
    }

    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
