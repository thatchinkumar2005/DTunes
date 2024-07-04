import { Party } from "../../../models/Party.js";
import { User } from "../../../models/User.js";

export default async function getAuthUserPartyController(req, res) {
  try {
    const user = req.user;

    const resUser = await User.findOne({ _id: user.id });

    return res.json(resUser.party);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
