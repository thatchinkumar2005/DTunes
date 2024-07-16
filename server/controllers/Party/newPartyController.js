import sharp from "sharp";
import { Party } from "../../models/Party.js";
import { Playlist } from "../../models/Playlist.js";
import { User } from "../../models/User.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";

export default async function newPartyController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });
    const { name, contribPlaylistId } = req.body;
    const file = req.file;

    if (!name) return res.status(400).json({ message: "No name given" });
    if (!contribPlaylistId)
      res.status(400).json({ message: "No contributing playlist given" });

    const contribPlaylist = await Playlist.findById(contribPlaylistId);

    if (!contribPlaylist)
      return res.status(400).json({ message: "No such playlist" });
    if (!contribPlaylist.artist.equals(user.id))
      return res.status(401).json({ message: "Not your Playlist" });
    if (!contribPlaylist.public)
      return res.status(403).json({ message: "Provide a Public Playlist" });
    if (userDoc?.party?.id) {
      return res.status(400).json({ message: "Already in a Party" });
    }

    const partyplaylist = await Playlist.create({
      name,
      artist: user.id,
      public: true,
      party: true,
    });

    const party = await Party.create({
      name,
      leader: user.id,
      resultantPlaylist: partyplaylist._id,
    });

    if (file) {
      const editedFile = await sharp(file.buffer)
        .resize(1400, 1400)
        .toFormat("png")
        .toBuffer();

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${party.id}.png`,
        Body: editedFile,
      });

      const commandPlaylist = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `CoverArt/${partyplaylist.id}.png`,
        Body: editedFile,
      });

      await s3.send(command);
      await s3.send(commandPlaylist);
    }

    const songs = await PlaylistSongJunction.find({
      playlist: contribPlaylist._id,
    });

    for (let junReln of songs) {
      const reln = await PlaylistSongJunction.create({
        playlist: partyplaylist._id,
        song: junReln.song,
      });
    }

    userDoc.party.id = party._id;
    userDoc.party.playlist = contribPlaylist._id;
    await userDoc.save();

    return res.json({
      party,
      partyplaylist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
