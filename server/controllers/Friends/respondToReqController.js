import { Friend } from "../../models/Friend.js";

export default async function respondToRequestController(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { response } = req.body;
    if (!id) {
      return res.status(400).json({ message: "No reln id given" });
    }
    if (!response) {
      return res.status(400).json({ message: "No response given" });
    }
    const reln = await Friend.findById(id);

    if (!reln || reln.status !== "requested") {
      return res.status(400).json({ message: "No such request" });
    }
    if (!reln.requestee.equals(user.id))
      return res.status(400).json({ message: "Not your request" });

    switch (response) {
      case "accept":
        await Friend.deleteMany({
          friend: { $all: [user.id, reln.requester] },
          _id: { $ne: reln._id },
        }); //delete user's request if already sent
        reln.status = "accepted";
        break;
      case "reject":
        reln.status = "rejected";
        break;
    }
    await reln.save();

    return res.json(reln);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
