import { Friend } from "../../models/Friend.js";
import { User } from "../../models/User.js";

export default async function toggleFriendRequestController(req, res) {
  try {
    const user = req.user;
    const userDoc = await User.findOne({ _id: user.id });
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const requestee = await User.findById(id);
    if (!requestee) return res.status(400).json({ message: "No such user" });
    if (userDoc._id.equals(requestee._id))
      return res.status(403).json({ message: "You can't be your own friend" });

    const friends = await Friend.findOne({
      friend: { $all: [userDoc._id, requestee._id] },
      status: "accepted",
    });
    if (friends) {
      return res.json({ message: "Already friends" });
    }

    const reln = await Friend.findOne({
      requester: userDoc._id,
      requestee: requestee._id,
    });
    if (!reln) {
      const newReln = await Friend.create({
        status: "requested",
        requester: userDoc._id,
        requestee: requestee._id,
        friend: [userDoc._id, requestee._id],
      });

      return res.json(newReln);
    } else {
      if (reln.status === "requested") {
        await Friend.deleteOne({ _id: reln._id });
        return res.json({ message: "unrequested" });
      } else if (reln.status === "rejected") {
        reln.status = "requested";
        await reln.save();
        return res.json(reln);
      } else if (reln.status === "accepted") {
        return res.json({ message: "Already friends" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
