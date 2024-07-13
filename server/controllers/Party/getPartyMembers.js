import { PartyRequest } from "../../models/PartyRequests.js";
import { User } from "../../models/User.js";

export default async function getPartyMembers(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;

    const { id } = req.params;
    const relns = await PartyRequest.find({ party: id, status: "accepted" })
      .skip((page - 1) * limit)
      .limit(limit);

    const members = [];
    for (const reln of relns) {
      const member = await User.findOne({ _id: reln.user });
      members.push(member);
    }

    return res.json(members);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
