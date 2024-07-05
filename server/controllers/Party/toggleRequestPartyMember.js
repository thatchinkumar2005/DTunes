import { Party } from "../../models/Party.js";
import { PartyRequest } from "../../models/PartyRequests.js";
import { User } from "../../models/User.js";

export default async function togglerequestPartyMemberController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });
    const { userId } = req.body;
    const id = userDoc.party.id;

    if (!id) return res.status(400).json({ message: "No party Id given" });
    if (!userId) return res.status(400).json({ message: "No userId Id given" });

    const requestee = await User.findById(userId);
    const party = await Party.findById(id);

    if (!requestee) return res.status(400).json({ message: "No such User" });
    if (requestee._id.equals(user.id))
      return res.status(400).json({ message: "You cannot request yourself" });
    if (!party) return res.status(400).json({ message: "No such Party" });
    if (!party.leader.equals(user.id))
      return res.status(401).json({ message: "Not your Party" });

    const reln = await PartyRequest.findOne({
      party: party._id,
      user: requestee._id,
    });

    console.log(reln);

    if (!reln) {
      const newReln = await PartyRequest.create({
        party: party._id,
        user: requestee._id,
        junction: [party._id, party._id],
        status: "requested",
      });
      return res.json(newReln);
    } else {
      switch (reln.status) {
        case "requested":
          await PartyRequest.deleteMany({ _id: reln._id });
          return res.json({ message: "unrequested" });
        case "rejected":
          reln.status = "requested";
          await reln.save();
          return res.json(reln);
        case "accepted":
          return res.json({ message: "Already Friends" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
