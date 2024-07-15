import { Party } from "../../models/Party.js";
import { PartyRequest } from "../../models/PartyRequests.js";
import { User } from "../../models/User.js";

export default async function leavePartyController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findById(user.id);

    if (!userDoc.party.id) return res.status(204).end();

    const party = await Party.findOne({ _id: userDoc.party.id });
    if (!party) return res.status(400).json({ message: "No such party" });
    if (party.leader.equals(user.id))
      return res.status(400).json({ message: "Leader cannot leave Party" });

    userDoc.party = null;
    await userDoc.save();

    await PartyRequest.deleteMany({ user: userDoc._id, party: party._id });

    return res.json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
