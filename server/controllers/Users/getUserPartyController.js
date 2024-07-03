import { Friend } from "../../models/Friend.js";
import { Party } from "../../models/Party.js";
import { User } from "../../models/User.js";

export default async function getUserPartyController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such user" });

    const friendship = await Friend.findOne({
      friend: { $all: [user.id, resUser._id] },
      status: "accepted",
    });

    if (!friendship) {
      return res.status(403).json({ message: "Not your friend" });
    }

    const party = await Party.findOne({ _id: resUser.party.id });

    return res.json(party);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
