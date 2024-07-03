import { Friend } from "../../../models/Friend.js";

export default async function getAuthUserFriendRequests(req, res) {
  try {
    const user = req.user;

    const requests = await Friend.find({
      requestee: user.id,
      status: "requested",
    });

    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
