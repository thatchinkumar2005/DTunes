import dotenv from "dotenv";
dotenv.config();
import { Party } from "../../models/Party.js";
import { PartyRequest } from "../../models/PartyRequests.js";
import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { User } from "../../models/User.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/bucketConn.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function deletePartyController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    if (!userDoc?.party?.id) {
      return res.status(400).json({ message: "Not in a party" });
    }

    const party = await Party.findOne({ _id: userDoc.party.id });
    if (!party) return res.status(400).json({ message: "No such Party" });

    if (!party.leader.equals(user.id))
      return res.status(401).json({ message: "Not your Party" });

    const members = await PartyRequest.find({
      party: party._id,
    });
    const partyplaylist = await Playlist.findOne({
      _id: party.resultantPlaylist,
    });

    for (let reln of members) {
      const member = await User.findOne({ _id: reln.user });
      member.party = null;
      await member.save();
      await PartyRequest.deleteOne({ _id: reln._id });
    }

    await Playlist.deleteOne({ _id: partyplaylist._id });
    await PlaylistSongJunction.deleteMany({
      playlist: partyplaylist._id,
    });

    userDoc.party = null;
    await userDoc.save();

    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `CoverArt/${party.id}.png`,
    });
    await s3.send(command);

    await Party.deleteOne({ _id: party._id });

    return res.json({
      message: "deleted",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
