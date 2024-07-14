import { Party } from "../../../models/Party.js";
import { User } from "../../../models/User.js";

export default async function getAuthUserPartyPlaylistController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });

    if (!userDoc?.party) {
      return res.json(null);
    }

    const party = await Party.findOne({ _id: userDoc.party.id });

    return res.json({ partyPlaylist: party.resultantPlaylist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
