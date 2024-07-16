import dotenv from "dotenv";
dotenv.config();
import { Song } from "../../models/Song.js";
import { Like } from "../../models/Like.js";
import { Interaction } from "../../models/InteractionData.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function deleteSongController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const song = await Song.findById(id);
    if (!song) return res.status(400).json({ message: "No such song" });
    if (!song.artists.includes(user.id))
      return res.status(401).json({ message: "Not your song" });

    //Junction collections
    await Like.deleteMany({ song: song._id });
    await Interaction.deleteMany({ song: song._id });
    await PlaylistSongJunction.deleteMany({ song: song._id });

    const audioCommand = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `Songs/${song.id}.mp3`,
    });
    const imageCommand = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${song.id}.png`,
    });
    s3.send(audioCommand);
    s3.send(imageCommand);
    await Song.deleteOne({ _id: song._id });
    return res.json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
