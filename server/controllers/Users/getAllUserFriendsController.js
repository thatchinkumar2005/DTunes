import { Friend } from "../../models/Friend";
import { User } from "../../models/User";

export default async function getAllUserFriendsController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such User" });

    const friendship = await Friend.findOne({
      friend: [user._id, resUser._id],
    });

    if (!friendship) {
      return res.status(403).json({ message: "Not your friend" });
    }

    const friends = await Friend.find({ friend: resUser._id });
    return res.json(friends);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
