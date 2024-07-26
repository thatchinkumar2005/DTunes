import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Album } from "../../models/Album.js";
import { Song } from "../../models/Song.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/bucketConn.js";
import { User } from "../../models/User.js";

export default async function playAlbumController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const album = await Album.findById(id);
    if (!album) {
      return res.status(400).json({ message: "No such album found" });
    }

    const songs = await Song.find({ album: album._id });

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

    userDoc.queue.currentSongs = songs;
    userDoc.queue.currentIndex = 0;
    userDoc.queue.currentSong =
      userDoc.queue.currentSongs[userDoc.queue.currentIndex];
    userDoc.queue.clusterId = `/album/${String(album.id)}`;
    userDoc.queue.clusterName = album.name;

    await userDoc.save();

    return res.json(userDoc.queue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
