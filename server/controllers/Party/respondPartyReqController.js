import { Party } from "../../models/Party.js";
import { PartyRequest } from "../../models/PartyRequests.js";
import { Playlist } from "../../models/Playlist.js";
import { PlaylistSongJunction } from "../../models/Playlist_Song_Junction.js";
import { User } from "../../models/User.js";

export default async function respondPartyRequestController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });
    const { id } = req.params;
    const { playlistId, response } = req.body;
    if (!id) return res.status(400).json({ message: "No party id given" });

    const contribPlaylist = await Playlist.findById(playlistId);
    const partyRequest = await PartyRequest.findById(id);

    if (!partyRequest || partyRequest.status !== "requested")
      return res.status(400).json({ message: "No such request" });
    if (!partyRequest.user.equals(user.id))
      return res.status(400).json({ message: "Not your Request" });

    if (response === "accept") {
      if (!playlistId)
        res.status(400).json({ message: "No playlist id given" });

      if (!contribPlaylist)
        return res.status(400).json({ message: "No such playlist" });

      if (!contribPlaylist.artist.equals(user.id))
        return res.status(401).json({ message: "Not your Playlist" });
      if (!contribPlaylist.public)
        return res.status(400).json({ message: "Provide a Public Playlist" });
      if (contribPlaylist.party) {
        return res
          .status(400)
          .json({ message: "You cannot add another party Playlist" });
      }

      if (userDoc?.party?.id)
        return res.status(400).json({ message: "Already in a party" });
    }

    if (response === "accept") {
      const party = await Party.findOne({ _id: partyRequest.party });
      const partyplaylist = await Playlist.findOne({
        _id: party.resultantPlaylist,
      });

      const songRelns = await PlaylistSongJunction.find({
        playlist: contribPlaylist._id,
      });

      for (let reln of songRelns) {
        const preExits = await PlaylistSongJunction.findOne({
          song: reln.song._id,
          playlist: partyplaylist._id,
        });
        if (preExits) {
        } else {
          await PlaylistSongJunction.create({
            song: reln.song._id,
            playlist: partyplaylist._id,
          });
        }
      }

      userDoc.party.id = party._id;
      userDoc.party.playlist = contribPlaylist._id;
      await userDoc.save();

      partyRequest.status = "accepted";
      await partyRequest.save();

      return res.json({
        partyRequest,
        party,
        partyplaylist,
      });
    } else if (response === "reject") {
      partyRequest.status = "rejected";
      await partyRequest.save();
      return res.json({ partyRequest });
    } else {
      return res.json({ message: "Not a valid response" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
