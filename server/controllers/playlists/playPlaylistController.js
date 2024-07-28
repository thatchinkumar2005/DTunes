import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Playlist } from "../../models/Playlist.js";
import { Song } from "../../models/Song.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { User } from "../../models/User.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { s3 } from "../../config/bucketConn.js";
import { Interaction } from "../../models/InteractionData.js";

export default async function playPlaylistController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "No id given" });

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(400).json({ message: "No such playlist" });

    if (!playlist.public && !playlist.artist.equals(user.id)) {
      return res.status(403).json({ message: "Private playlist" });
    }

    const relns = await PlaylistSongJunction.find(
      { playlist: playlist._id },
      { song: 1 }
    );
    const songs = [];
    for (let songId of relns) {
      const song = await Song.findOne({ _id: songId.song });
      songs.push(song);
    }

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
    userDoc.queue.clusterId = `/playlist/${String(playlist.id)}`;
    userDoc.queue.clusterName = playlist.name;
    await userDoc.save();

    const intData = await Interaction.findOne({
      song: userDoc.queue.currentSong,
      user: user.id,
      intType: "play",
    });

    if (!intData) {
      const newIntData = await Interaction.create({
        song: userDoc.queue.currentSong,
        user: user.id,
        intType: "play",
        count: 1,
      });
    } else {
      intData.count++;
      intData.timeStamp = Date.now();
      await intData.save();
    }

    return res.json(userDoc.queue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
