import dotenv from "dotenv";
dotenv.config();
import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function deletePlaylistController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "no id given" });

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such Playlist" });
    if (!playlist.artist.equals(user.id))
      return res.status(401).json({ message: "Not your playlist" });

    const coverArtPath = join(
      __dirname,
      "../../STORAGE/CoverArt",
      `${playlist._id}.png`
    );

    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${playlist.id}.png`,
    });

    await s3.send(command);

    await PlaylistSongJunction.deleteMany({ playlist: playlist._id });
    await Playlist.deleteOne({ _id: playlist._id });
    return res.json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
