import { Album } from "../../models/Album.js";
import { Song } from "../../models/Song.js";

import { Like } from "../../models/Like.js";
import { Interaction } from "../../models/InteractionData.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function deleteAlbumController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);
    if (!album) return res.status(400).json({ message: "No such album found" });
    if (!album.artist.equals(user.id))
      return res.status(401).json({ message: "Not your album" });

    const albumSongs = await Song.find({ album: album._id });

    for (let song of albumSongs) {
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

      //junction collecions
      await Like.deleteMany({ song: song._id });
      await Interaction.deleteMany({ song: song._id });
      await PlaylistSongJunction.deleteMany({ song: song._id });

      await Song.deleteOne({ _id: song._id });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${album.id}.png`,
    });
    await s3.send(command);

    await Album.deleteOne({ _id: album._id });

    return res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
