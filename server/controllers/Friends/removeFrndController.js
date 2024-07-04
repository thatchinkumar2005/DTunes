import { Friend } from "../../models/Friend.js";
import { User } from "../../models/User.js";

export default async function removeFrndController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id given" });
    const friend = await User.findById(id);
    if (!friend) return res.status(400).json({ message: "No such User" });

    const reln = await Friend.findOne({
      friend: { $all: [user.id, friend._id] },
      status: "accepted",
    });
    console.log(reln);
    if (!reln) return res.json({ message: "Not friends" });

    if (reln.status === "accepted") {
      await Friend.deleteMany({ friend: { $all: [user.id, friend._id] } });
      return res.json({ message: "deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
