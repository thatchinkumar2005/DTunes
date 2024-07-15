import { Friend } from "../../models/Friend.js";
import { User } from "../../models/User.js";

export default async function getAllUserFriendsController(req, res) {
  try {
    const queries = req.query;
    const page = queries?.page || 1;
    const limit = queries?.limit || 10;
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });

    const resUser = await User.findById(id);
    if (!resUser) return res.status(400).json({ message: "No such User" });

    const friendship = await Friend.findOne({
      friend: { $all: [user.id, resUser._id] },
      status: "accepted",
    });

    if (!friendship) {
      return res.status(403).json({ message: "Not your friend" });
    }

    const friends = await Friend.find(
      { friend: resUser._id, status: "accepted" },
      { friend: 1 }
    )
      .skip((page - 1) * limit)
      .limit(limit);

    const result = friends.map((lst) => {
      return lst.friend.find((i) => !i.equals(resUser._id));
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
