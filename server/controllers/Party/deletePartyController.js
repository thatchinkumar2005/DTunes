import { unlink, access } from "fs/promises";
import { Party } from "../../models/Party.js";
import { PartyRequest } from "../../models/PartyRequests.js";
import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { User } from "../../models/User.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
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
      status: "accepted",
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

    const coverArtPath = join(
      __dirname,
      "../STORAGE/CoverArt",
      `${party.id}.png`
    );
    try {
      await access(coverArtPath);
      await unlink(coverArtPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("file missing");
      } else {
        throw error;
      }
    }

    return res.json({
      message: "deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
